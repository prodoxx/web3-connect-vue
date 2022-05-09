import { DEFAULT_NETWORK } from "../constants/blockchain";
import { getNetworkParams } from "../helpers/network-params";

const switchRequest = () => {
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${DEFAULT_NETWORK.toString(16)}` }],
    });
};

const addChainRequest = () => {
    const networkParams = getNetworkParams();
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
