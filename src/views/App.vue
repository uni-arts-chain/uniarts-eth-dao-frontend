<template>
  <nav-bar />
  <main v-if="!isLoading && isConnected && isOnline">
    <router-view />
  </main>
  <main class="offline" v-else-if="!isLoading && (!isConnected || !isOnline)">
    <icon-svg icon-class="offline" />
    <div class="offline-text">
      Not connected to the blockchain network or the current blockchain network is not supported
    </div>
  </main>
  <footer-bar v-if="!isMobile" />
</template>

<script>
import { defineComponent, computed, watch, onMounted } from "vue";
import NavBar from "@/views/Layout/NavBar";
import FooterBar from "@/views/Layout/FooterBar";
import store from "@/store";
import Wallet from "@/plugins/wallet";
import DappConfig from "@/config/dapp";
// import Config from "@/config";
// import { ElLoading } from "element-plus";
export default defineComponent({
  components: {
    NavBar,
    FooterBar,
  },
  setup() {
    const isConnected = computed(() => Wallet.isConnected);
    const isOnline = computed(() => DappConfig.isOnline);

    const isLoading = computed(() => store.state.global.isPageLoading);

    const connectAccount = computed(() => store.state.user.info.address);
    if (connectAccount.value && !isLoading.value) {
      store.dispatch("user/GetInfo");
    }

    const isMobile = computed(() => {
      return store.state.global.isMobile;
    });

    window.onresize = () => {
      store.dispatch("global/WindowResize");
    };

    watch(connectAccount, () => {
      if (connectAccount.value && !isLoading.value) {
        store.dispatch("user/GetInfo");
      }
    });

    onMounted(async () => {
      store.dispatch("global/DetectNetwork");
      // const loadingInstance = ElLoading.service({
      //   text: "Detecting network...",
      //   customClass: "service-loading",
      // });
      // setTimeout(async () => {
      //   try {
      //     await store.dispatch("user/ConnectWallet");
      //     await Config.init();
      //     isLoading.value = false;
      //     loadingInstance.close();
      //   } catch (e) {
      //     isLoading.value = false;
      //     loadingInstance.close();
      //   }
      // }, 2000);
    });

    return {
      isMobile,
      connectAccount,
      isConnected,
      isOnline,
      isLoading,
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

main.offline {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  > .svg-icon {
    font-size: 80px;
    color: #8e8e8e;
  }
  > .offline-text {
    max-width: 490px;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    margin-top: 20px;
    color: #545454;
  }
}
</style>
