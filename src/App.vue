<template>
  <div class="app">
    <div id="appTitle">
      <app-header></app-header>
    </div>
    <div id="appBody">
      <router-view v-slot="{ Component }">
        <transition name="el-zoom-in-center">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </transition>
      </router-view>
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
@import "~@/style/element-variables.scss"
$titleHeight: 60px
$footerHeightPc: 200px
$footerHeightMobile: 100px
$footerTopPc: 50px
$footerTopMobile: 20px

.app
  position: relative
  width: 100%
  height: 100%

  #appTitle
    height: $titleHeight
    position: relative
  //border-bottom: solid 1px $--border-color-base

  #appBody
    position: relative
    @media (min-width: $mobile-pc-width)
      min-height: calc(100vh - #{$titleHeight + $footerHeightPc + $footerTopPc})
    @media (max-width: $mobile-pc-width)
      min-height: calc(100vh - #{$titleHeight + $footerHeightMobile + $footerTopMobile})

  #appFooter
    @media (min-width: $mobile-pc-width)
      height: $footerHeightPc
      margin-top: $footerTopPc
    @media (max-width: $mobile-pc-width)
      height: $footerHeightMobile
      margin-top: $footerTopMobile
    position: relative
    background-color: black
</style>
