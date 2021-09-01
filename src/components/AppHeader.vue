<template>
  <el-row class="app_header">
    <el-col :offset="1" :span="4" class="logo">
      <el-image :src="require('@/assets/uniarts_logo.png')" class="mt15"></el-image>
      <span class="appName">UniArts</span>
    </el-col>
    <el-col :offset="5" :span="10" class="hidden-xs-only menu">
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
    </el-col>
  </el-row>
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
  .appName
    font-family: "Broadway", serif
    font-size: 30px
    position: absolute
    display: inline-block
    height: 60px
    line-height: 60px
    margin-left: 3px

.app_header
  border-bottom: solid 1px $--border-color-base
.menu
  text-align: right
</style>
