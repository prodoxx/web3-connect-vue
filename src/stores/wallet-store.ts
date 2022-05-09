import { defineStore } from "pinia";
import { markRaw, ref, reactive } from "vue";
import type { Ref } from "vue";
import Web3Modal from "web3modal";
import { DEFAULT_NETWORK } from "../constants";
import {
    StaticJsonRpcProvider,
    JsonRpcProvider,
    Web3Provider,
} from "@ethersproject/providers";
import { getNetworkParams } from "../helpers/network-params";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { switchNetwork } from "../helpers/switch-network";

export const useWalletStore = defineStore("wallet", () => {
    const web3Modal: Web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    rpc: {
                        [DEFAULT_NETWORK]: getNetworkParams().rpcUrls[0],
                    },
                },
            },
        },
    });

    interface WalletState {
        provider: JsonRpcProvider;
        address: string;
        isConnected: boolean;
        providerChainID: number;
    }

    const state = reactive<WalletState>({
        provider: new StaticJsonRpcProvider(getNetworkParams().rpcUrls[0]),
        address: "",
        isConnected: false,
        providerChainID: DEFAULT_NETWORK,
    });

    const changeNetwork = async (otherChainID: number) => {
        const network = Number(otherChainID);
        state.providerChainID = network;
    };

    function _initListeners(rawProvider: JsonRpcProvider): void {
        if (!rawProvider.on) {
            return;
        }

        rawProvider.on("accountsChanged", () =>
            setTimeout(() => window.location.reload(), 1)
        );

        rawProvider.on("chainChanged", async (chain: number) => {
            changeNetwork(chain);
        });

        rawProvider.on("network", (_newNetwork, oldNetwork) => {
            if (!oldNetwork) return;
            window.location.reload();
        });
    }

    async function connect(): Promise<Web3Provider> {
        const rawProvider = await web3Modal.connect();

        _initListeners(rawProvider);

        const connectedProvider = new Web3Provider(rawProvider, "any");

        const chainId = await connectedProvider
            .getNetwork()
            .then((network) => Number(network.chainId));
        const connectedAddress = await connectedProvider
            .getSigner()
            .getAddress();

        state.address = connectedAddress;
        state.providerChainID = chainId;

        if (chainId === DEFAULT_NETWORK) {
            state.provider = markRaw(connectedProvider);
        }

        state.isConnected = true;
        return connectedProvider;
    }

    const checkWrongNetwork = async (): Promise<boolean> => {
        if (state.providerChainID !== DEFAULT_NETWORK) {
            const shouldSwitch = window.confirm("Switch to Ethereum network?");
            if (shouldSwitch) {
                await switchNetwork();
            }
            return true;
        }

        return false;
    };

    function disconnect(): void {
        web3Modal.clearCachedProvider();
        state.isConnected = false;
        state.address = "";
        state.providerChainID = DEFAULT_NETWORK;
        state.provider = new StaticJsonRpcProvider(
            getNetworkParams().rpcUrls[0]
        );
    }

    function hasCachedProvider(): boolean {
        if (!web3Modal) return false;
        if (!web3Modal.cachedProvider) return false;
        return true;
    }

    return {
        connect,
        disconnect,
        hasCachedProvider,
        checkWrongNetwork,
        state,
    };
});
