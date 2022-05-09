import { DEFAULT_NETWORK, Networks } from "../constants/blockchain";

export const getNetworkURI = (): string => {
    switch (DEFAULT_NETWORK) {
        case Networks.MAIN_NET:
            return "https://rpc.ftm.tools/";
        case Networks.TEST_NET:
            return "https://rpc.testnet.fantom.network/";
        default:
            return "https://rpc.ftm.tools/";
    }
};
