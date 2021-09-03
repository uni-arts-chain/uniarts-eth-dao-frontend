<template>
  <nav-bar />
  <main>
    <router-view />
  </main>
  <footer-bar />
</template>

<script>
import { defineComponent } from "vue";
import NavBar from "@/views/Layout/NavBar";
import FooterBar from "@/views/Layout/FooterBar";
export default defineComponent({
  components: {
    NavBar,
    FooterBar,
  },
  setup() {},
});
</script>

<style lang="scss">
@import "@/assets/styles/index.scss";

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

main {
  flex: 0 1 auto;
}
</style>
