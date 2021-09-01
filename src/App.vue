<template>
  <div class="app">
    <div id="appTitle">
      <app-header></app-header>
    </div>
    <div id="appBody">
      <transition name="el-zoom-in-center">
        <router-view></router-view>
      </transition>
    </div>
    <div id="appFooter">
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
  },
  setup() {
    const menuList = [];
    return {
      menuList,
    };
  },
});
</script>

<style lang="sass" scoped>
$titleHeight: 60px
$footerHeight: 300px
.app
  position: relative
  width: 100%
  height: 100%
  display: flex
  flex-direction: column

  #appTitle
    height: $titleHeight
    position: relative

  #appBody
    flex: 1
    position: relative
    min-height: calc(100vh - #{$titleHeight + $footerHeight})

  #appFooter
    height: $footerHeight
    position: relative
    background-color: black
</style>
