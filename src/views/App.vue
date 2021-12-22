<template>
  <nav-bar />
  <main v-if="isConnected">
    <router-view />
  </main>
  <footer-bar v-if="!isMobile" />
</template>

<script>
import { defineComponent, computed, watch, onMounted } from "vue";
import NavBar from "@/views/Layout/NavBar";
import FooterBar from "@/views/Layout/FooterBar";
import store from "@/store";
import Wallet from "@/plugins/wallet";
import { ElLoading } from "element-plus";
export default defineComponent({
  components: {
    NavBar,
    FooterBar,
  },
  setup() {
    const isConnected = computed(() => Wallet.isConnected);

    const connectAccount = computed(() => store.state.user.info.address);
    if (connectAccount.value) {
      store.dispatch("user/GetInfo");
    }

    const isMobile = computed(() => {
      return store.state.global.isMobile;
    });

    window.onresize = () => {
      store.dispatch("global/WindowResize");
    };

    watch(connectAccount, () => {
      if (connectAccount.value) {
        store.dispatch("user/GetInfo");
      }
    });

    onMounted(() => {
      store.dispatch("global/WindowResize");
      const loadingInstance = ElLoading.service({
        text: "Detecting network...",
        customClass: "service-loading",
      });
      setTimeout(async () => {
        await store.dispatch("user/ConnectWallet");
        loadingInstance.close();
      }, 2000);
    });

    return {
      isMobile,
      connectAccount,
      isConnected,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/index.scss";
@import "@/assets/styles/reset.scss";

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
.nav-bar {
  flex: 0 0 auto;
}
main {
  flex: 1 0 auto;
}
.footer-bar {
  flex: 0 0 auto;
}
</style>
