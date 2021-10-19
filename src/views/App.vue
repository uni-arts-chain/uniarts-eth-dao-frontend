<template>
  <nav-bar />
  <main>
    <router-view />
  </main>
  <footer-bar v-if="!isMobile" />
</template>

<script>
import { defineComponent, computed, onMounted } from "vue";
import NavBar from "@/views/Layout/NavBar";
import FooterBar from "@/views/Layout/FooterBar";
import store from "@/store";
export default defineComponent({
  components: {
    NavBar,
    FooterBar,
  },
  setup() {
    if (store.state.user.info.address) {
      store.dispatch("user/GetInfo");
    }

    const isMobile = computed(() => {
      return store.state.global.isMobile;
    });

    window.onresize = () => {
      store.dispatch("global/WindowResize");
    };

    onMounted(() => {
      store.dispatch("global/WindowResize");
      setTimeout(() => store.dispatch("user/ConnectWallet"), 2000);
    });

    return {
      isMobile,
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
  height: 100vh;
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
