<script setup lang="ts">
import { onMounted } from "vue";
import ConnectButton from "./components/ConnectButton.vue";
import { useWalletStore } from "./stores/wallet-store";

const wallet = useWalletStore();
onMounted(() => {
    if (wallet.hasCachedProvider()) {
        try {
            wallet.connect();
        } catch (error) {
            console.log(`Wallet connect error: ${error}`);
        }
    }
});
</script>
<template>
    <div>
        <h1>Hello World</h1>
        <ConnectButton />
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
