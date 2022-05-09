import { Networks, DEFAULT_NETWORK } from "../constants/blockchain";

const switchRequest = () => {
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${DEFAULT_NETWORK.toString(16)}` }],
    });
};

const currentNetworkParams = () => {
    switch (DEFAULT_NETWORK) {
        case Networks.MAIN_NET:
            return {
                chainId: `0x${Networks.MAIN_NET.toString(16)}`,
                chainName: "Fantom Opera",
                rpcUrls: ["https://rpc.ftm.tools/"],
                blockExplorerUrls: ["https://ftmscan.com/"],
                nativeCurrency: {
                    name: "Fantom",
                    symbol: "FTM",
                    decimals: 18,
                },
            };
        case Networks.TEST_NET:
            return {
                chainId: `0x${Networks.TEST_NET.toString(16)}`,
                chainName: "Fantom Testnet",
                rpcUrls: ["https://rpc.testnet.fantom.network"],
                blockExplorerUrls: ["https://testnet.ftmscan.com"],
                nativeCurrency: {
                    name: "Fantom",
                    symbol: "FTM",
                    decimals: 18,
                },
            };
        default:
            return {
                chainId: `0x${Networks.MAIN_NET.toString(16)}`,
                chainName: "Fantom Mainnet",
                rpcUrls: ["https://rpc.ftm.tools"],
                blockExplorerUrls: ["https://ftmscan.com"],
                nativeCurrency: {
                    name: "Fantom",
                    symbol: "FTM",
                    decimals: 18,
                },
            };
    }
};

const addChainRequest = () => {
    const networkParams = currentNetworkParams();
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networkParams],
    });
};

export const switchNetwork = async () => {
    if (window.ethereum) {
        try {
            await switchRequest();
        } catch (error: any) {
            if (error.code === 4902) {
                try {
                    await addChainRequest();
                    await switchRequest();
                } catch (addError) {
                    console.log(error);
                }
            }
            console.log(error);
        }
    }
};
