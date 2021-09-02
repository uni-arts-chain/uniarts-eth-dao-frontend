<template>
  <div class="appFooter pc">
    <div>
      <div>
        <el-image :src="require('@/assets/airdrop/图层 64 副本 3.png')"></el-image>
      </div>
      <div>
        <el-image
            :src="require('@/assets/airdrop/Community guidelines•Terms of Service Privacy• Policy•Report co.png')">
        </el-image>
      </div>
      <div>
        <el-image :src="require('@/assets/airdrop/图层 68.png')"></el-image>
      </div>
    </div>
    <div>
      <div>
        <el-image :src="require('@/assets/airdrop/UniArts 副本 2.png')"></el-image>
      </div>
      <div style="border: 1px solid white;max-width: 300px;margin-top: 30px">
        <el-button class="width100" type="primary">Get project white papers <i class="el-icon-right"></i></el-button>
      </div>
    </div>
  </div>
  <div class="appFooter2 mobile">
    <div>
      <el-image :src="require('@/assets/airdrop/图层 20.png')"></el-image>
    </div>
    <div>
      <el-image :src="require('@/assets/airdrop/M.png')"></el-image>
    </div>
    <div>
      <el-image :src="require('@/assets/airdrop/图层 22.png')"></el-image>
    </div>
    <div>
      <el-image :src="require('@/assets/airdrop/图层 16.png')"></el-image>
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
    padding-left: 200px
    display: flex
    flex-direction: column

    ::v-deep > div
      padding-top: 5px

.appFooter2
  width: 100%
  height: 100%
  display: flex
  flex-direction: row

  > div
    flex: 1
    margin: auto
    //display: flex
    flex-direction: row
    text-align: center

    ::v-deep .el-image
      width: 20px
      height: 20px
</style>
