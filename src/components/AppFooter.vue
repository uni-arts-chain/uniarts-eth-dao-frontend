<template>
  <div class="appFooter pc">
    <div>
      <div class="logo">
        <el-image :src="require('@/assets/airdrop/img_7.png')"></el-image>
      </div>
      <div class="text2">
        Community guidelines·Trems of Service
      </div>
      <div class="text2">
        Privacy· Policy·Report content
      </div>
      <div class="text1">
        2021 The Impossible Art Fromula
      </div>
      <div class="icons">
        <div class="icon">
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
    </div>
    <div>
      <div class="rightLogo">
        <el-image :src="require('@/assets/airdrop/img_9.png')" class="height100 notinline"></el-image>
        <div class="appName">UniArts</div>
      </div>
      <div class="borderButton">
        Get project white papers
        <el-image :src="require('@/assets/airdrop/img_10.png')" class="height100 notinline"></el-image>
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
    padding-left: 20vw
    //display: flex
    flex-direction: column
    color: white

    .rightLogo
      display: flex
      height: 20px
      line-height: 20px
      margin-bottom: 20px
      flex-direction: row
      ::v-deep .el-image
        .el-image__inner
          width: 30px

      .appName
        margin-left: 10px
        font-family: B-1-04, serif
        font-weight: 400

    .borderButton
      position: relative
      width: 360px
      height: 60px
      border: 1px solid white
      line-height: 60px
      font-weight: 500
      font-size: 17px
      padding-left: 20px
      ::v-deep .el-image
        position: absolute
        right: 10px
        top: 15px
        height: 30px
        .el-image__inner
            width: 30px

    .logo
      width: 200px
      margin-bottom: 10px

    .text1
      font-size: 10px
      font-weight: 5

    .text2
      font-weight: 500
      font-size: 16px

    .icons
      margin-top: 10px
      display: flex
      flex-direction: row

      > div
        margin-right: 40px

        ::v-deep .el-image
          width: 20px
          height: 18px

.appFooter2
  width: 100%
  height: 100%
  display: flex
  flex-direction: row

  > div
    flex: 1
    margin: auto
    flex-direction: row
    text-align: center

    ::v-deep .el-image
      width: 20px
      height: 20px
</style>
