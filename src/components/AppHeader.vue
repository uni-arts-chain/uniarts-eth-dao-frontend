<template>
  <div class="app_header">
    <div class="pc logo">
      <el-image :src="require('@/assets/uniarts_logo.png')" class="auto"></el-image>
      <div class="appName">UniArts</div>
    </div>
    <div class="pc menu">
      <el-menu :default-active="activeIndex" :router="true" mode="horizontal">
        <el-menu-item index="/">
          <span>HOME PAGE</span>
        </el-menu-item>
        <el-menu-item index="/2">
          <span>VOTE</span>
        </el-menu-item>
        <el-menu-item index="/3">
          <span>MARKETPLACE</span>
        </el-menu-item>
        <el-menu-item index="/airdrop">
          <span>AIRDROP</span>
        </el-menu-item>
        <el-menu-item :index="null">
          <i class="el-icon-search"></i>
        </el-menu-item>
        <el-menu-item index="/5">
          <i class="el-icon-user"></i>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="mobile UniArtsAirdrop">UniArts Airdrop</div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const route = useRoute();
    const activeIndex = computed(() => `/${route.path.split('/')[1] || ''}`);
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      activeIndex,
      handleSelect,
    };
  },
});
</script>

<style lang="sass" scoped>
@import "~@/style/element-variables.scss"
.logo
  display: flex
  flex-direction: row

  .appName
    font-size: 25px
    font-family: B-1-04, serif
    font-weight: 400
    letter-spacing: -1px
    //position: absolute
    //display: inline-block
    height: 60px
    line-height: 60px
    margin-left: 3px

.app_header
  display: flex
  height: 100%
  flex-direction: row
  justify-content: space-around
  align-content: stretch
  flex-wrap: wrap

.menu
  text-align: right

.UniArtsAirdrop
  line-height: 60px
  font-family: Montserrat, Montserrat-Light, serif
  opacity: 1
  font-size: 20px
</style>
