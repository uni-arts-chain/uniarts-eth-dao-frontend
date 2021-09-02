<template>
  <div class="mobile UA-logo-C">
    <el-image :src="require('@/assets/airdrop/UA-logo-C.png')"></el-image>
  </div>
  <div class="page_title pc">
    <div class="logo">
      <el-image :src="require('@/assets/art_formula.png')"></el-image>
    </div>
    <div class="title_text">
      <div class="title">ART</div>
      <div class="title">FORMULA</div>
      <div class="text">THE IMPOSSIBLE</div>
    </div>
  </div>
  <div class="card center">
    <div class="title">
      {{ $store.state.wallet.walletAddress ? 'Your Airdrop Result is:' : 'To View Your UART Airdrop Result' }}
    </div>
    <div class="button">
      <div v-if="$store.state.wallet.walletAddress" class="el-button">
        {{ $store.state.wallet.lockPositionAmount }} UART
      </div>
      <el-button v-else type="primary" @click="connectWallet">Connect Wallet</el-button>
    </div>
  </div>
  <div class="mt30 center describe1">To Collect Airdrop & Vote for NFT</div>
  <div class="page_title mobile">
    <div class="logo">
      <el-image :src="require('@/assets/art_formula.png')" class="auto"></el-image>
    </div>
    <div class="title_text">
      <div class="title">ART</div>
      <div class="title">FORMULA</div>
      <div class="text">THE IMPOSSIBLE</div>
    </div>
  </div>
  <div class="center describe3 mobile">By UniArts Network</div>
  <div class="center describe2">Coming Sept. 20</div>
</template>

<script lang="js">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Airdrop',
  setup() {
    const vuex = useStore();
    onMounted(() => {
      vuex.dispatch('wallet/login');
    });
    const connectWallet = async () => {
      await vuex.dispatch('wallet/login');
      console.log(vuex.state.wallet);
    };
    return { connectWallet };
  },
});
</script>

<style lang="sass" scoped>
@import "~@/style/element-variables.scss"
.page_title
  position: relative
  display: flex
  flex-direction: row
  justify-content: center
  width: 100%

  @media (min-width: $mobile-pc-width)
    padding-top: 100px
  @media (max-width: $mobile-pc-width)
    padding-top: 50px
    height: 50px
    ::v-deep .el-image
      height: 100%

  .title_text
    margin-top: auto
    margin-bottom: auto
    margin-left: 10px
    @media (min-width: $mobile-pc-width)

    .title
      font-family: B-1-04, serif
      @media (min-width: $mobile-pc-width)
        opacity: 1
        font-size: 38px
        font-weight: 400
        text-align: left
        line-height: 30px
        letter-spacing: -1px
      @media (max-width: $mobile-pc-width)
        font-size: 15px

    .text
      font-family: Montserrat, Montserrat-Medium, serif
      @media (min-width: $mobile-pc-width)
        opacity: 1
        font-weight: 500
        line-height: 22px
        font-size: $--font-size-base
      @media (max-width: $mobile-pc-width)
        line-height: 13px
        font-size: 14px

.card
  @media (max-width: $mobile-pc-width)
    border-radius: 6px
  position: relative
  margin: 30px auto
  width: 490px
  max-width: 70%
  background-color: #F0F0F0
  border-radius: 18px

  .title
    @media (max-width: $mobile-pc-width)
      line-height: 55px
    @media (min-width: $mobile-pc-width)
      line-height: 100px
      opacity: 1
      font-size: 22px
      font-weight: 400
    font-family: Montserrat, Montserrat-Regular, serif
    text-align: center

  .button
    @media (max-width: $mobile-pc-width)
      padding: 0px 10px 20px 10px
    @media (min-width: $mobile-pc-width)
      padding: 0px 20px 40px 20px

    ::v-deep .el-button
      font-family: Montserrat, Montserrat-Regular, serif
      width: 80%
      @media (min-width: $mobile-pc-width)
        font-size: 24px
        font-weight: 400
        line-height: 39px
        border-radius: 18px
      @media (max-width: $mobile-pc-width)
        border-radius: 6px
.describe1
  @media (max-width: $mobile-pc-width)
    font-size: 15px
  @media (min-width: $mobile-pc-width)
    opacity: 1
    font-size: 26px
    font-weight: 400
    text-align: center
    line-height: 33px
  font-family: Montserrat, Montserrat-Regular, serif

.describe2
  @media (max-width: $mobile-pc-width)
    margin-top: 50px
    font-size: 16px
  @media (min-width: $mobile-pc-width)
    line-height: 44px
    font-weight: 300
    opacity: 1
    font-size: 35px
    margin-top: 60px
  font-family: Montserrat, Montserrat-Light, serif
  text-align: center
.describe3
  font-family: Montserrat, Montserrat-Regular, serif
  margin-top: 10px
  font-size: 14px
.UA-logo-C
  width: 60%
  text-align: center
  margin: auto
  padding-top: 30px
</style>
