<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { DEFAULT_NETWORK } from "../constants";
import { useWalletStore } from "../stores/wallet-store";
const wallet = useWalletStore();
let clickFunc = async () => {
    if (
        wallet.state.isConnected &&
        wallet.state.providerChainID !== DEFAULT_NETWORK
    ) {
        await wallet.checkWrongNetwork();
    } else if (wallet.state.isConnected) {
        wallet.disconnect();
    } else {
        await wallet.connect();
    }
};

const buttonText = computed(() => {
    if (
        wallet.state.isConnected &&
        wallet.state.providerChainID !== DEFAULT_NETWORK
    ) {
        return "Wrong Network";
    } else if (wallet.state.isConnected) {
        return "Disconnect";
    } else {
        return "Connect";
    }
});
</script>
<template>
    <div>
        <p v-if="wallet.state.isConnected">{{ wallet.state.address }}</p>
        <button @click.stop="clickFunc">
            {{ buttonText }}
        </button>
    </div>
</template>

<style lang="scss"></style>
