<template>
  <div class="appFooter">
    <div>
      <el-image :src="require('@/assets/airdrop/图层 64 副本 3.png')"></el-image>
      <el-image :src="require('@/assets/airdrop/Community guidelines•Terms of Service Privacy• Policy•Report co.png')">
      </el-image>
      <el-image :src="require('@/assets/airdrop/图层 68.png')"></el-image>
    </div>
    <div>
      <el-image :src="require('@/assets/airdrop/UniArts 副本 2.png')"></el-image>
      <div style="border: 1px solid white;max-width: 300px;margin-top: 30px">
        <el-button class="width100" type="primary">Get project white papers <i class="el-icon-right"></i></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style lang="sass" scoped>
.appFooter
  width: 100%
  height: 100%
  display: flex
  flex-direction: row

  > div
    flex: 1
    margin: auto
    padding-left: 100px

    ::v-deep > div
      padding-top: 5px
</style>
