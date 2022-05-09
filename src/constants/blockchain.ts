export const TOKEN_DECIMALS = 18;

export enum Networks {
    TEST_NET = 4,
    MAIN_NET = 1,
}

export const currentNetwork = () => {
    const network = import.meta.env.VITE_BLOCKCHAIN_NETWORK;

    switch (network) {
        case "mainnet":
            return Networks.MAIN_NET;
        case "testnet":
            return Networks.TEST_NET;
        default:
            return Networks.MAIN_NET;
    }
};

export const DEFAULT_NETWORK = currentNetwork();
