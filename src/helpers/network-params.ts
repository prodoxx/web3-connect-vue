import { DEFAULT_NETWORK, Networks } from "../constants/blockchain";

export const getNetworkParams = (network: Networks = DEFAULT_NETWORK) => {
    const infuraApiKey = import.meta.env.VITE_INFURA_API_KEY;

    /* Edit these depending on your network */
    const mainNetParams = {
        chainId: `0x${Networks.MAIN_NET.toString(16)}`,
        chainName: "Ethereum Mainnet",
        rpcUrls: ["https://rpc.ankr.com/eth"],
        blockExplorerUrls: ["https://etherscan.io/"],
        nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
        },
    };

    const testNetParams = {
        chainId: `0x${Networks.TEST_NET.toString(16)}`,
        chainName: "Rinkeby Test Network",
        rpcUrls: [`https://rinkeby.infura.io/v3${infuraApiKey}`],
        blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
        nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
        },
    };

    /* End of Edit */

    switch (network) {
        case Networks.MAIN_NET:
            return mainNetParams;
        case Networks.TEST_NET:
            return testNetParams;
        default:
            return mainNetParams;
    }
};
