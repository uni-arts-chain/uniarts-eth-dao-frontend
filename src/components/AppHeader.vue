<template>
  <div class="app_header">
    <div class="pc logo">
      <el-image :src="require('@/assets/airdrop/img_8.png')" class="auto height40"></el-image>
      <div class="appName">UniArts</div>
    </div>
    <div class="pc menu">
      <el-menu :default-active="activeIndex" :router="true" mode="horizontal">
        <el-menu-item index="/1">
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
          <el-image :src="require('@/assets/airdrop/图层 50.png')" class="menuImage"></el-image>
          <!--          <i class="el-icon-search"></i>-->
        </el-menu-item>
        <el-menu-item index="/5">
          <!--          <i class="el-icon-user"></i>-->
          <el-image :src="require('@/assets/airdrop/图层 52.png')" class="menuImage"></el-image>
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
  height: 100%
  .auto
    ::v-deep .el-image__inner
      width: auto
  .appName
    font-size: 25px
    font-family: B-1-04, serif
    font-weight: 400
    letter-spacing: -1px
    //position: absolute
    //display: inline-block
    height: 60px
    line-height: 60px
    margin-left: 10px

.app_header
  @media (max-width: $mobile-pc-width)
    background-color: #F8F8F8
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
<style lang="sass">
.menuImage
  .el-image__inner
    position: relative
    top: 3px
    vertical-align: unset
    height: 16px
    width: 16px
</style>
