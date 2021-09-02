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
      <el-button v-else type="primary" @click="connectWallet">
        Connect Wallet
      </el-button>
    </div>
  </div>
  <div class="mt30 center describe1">To Collect Airdrop & Vote for NFT</div>
  <div class="page_title mobile">
    <div class="logo">
      <el-image :src="require('@/assets/art_formula.png')"></el-image>
    </div>
    <div class="title_text">
      <div class="title">ART</div>
      <div class="title">FORMULA</div>
      <div class="text">THE IMPOSSIBLE</div>
    </div>
  </div>

  <div class="mt30 center describe2">Coming Sept. 20</div>
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
    height: 70px
    ::v-deep .el-image
      height: 70px

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
        font-size: 20px

    .text
      font-family: Montserrat, Montserrat-Medium, serif
      @media (min-width: $mobile-pc-width)
        opacity: 1
        font-weight: 500
        line-height: 22px
        font-size: $--font-size-base

.card
  position: relative
  margin: 30px auto
  width: 490px
  max-width: 70%
  background-color: $--color-text-placeholder
  box-shadow: $--box-shadow-base
  border-radius: $--border-radius-base

  .title
    @media (max-width: $mobile-pc-width)
      line-height: 40px
    @media (min-width: $mobile-pc-width)
      line-height: 100px
      opacity: 1
      font-size: 22px
      font-weight: 400
    font-family: Montserrat, Montserrat-Regular, serif
    text-align: center

  .button
    @media (max-width: $mobile-pc-width)
      padding: 10px 0 10px 10px
    @media (min-width: $mobile-pc-width)
      padding: 20px 20px 40px 20px

    ::v-deep .el-button
      font-family: Montserrat, Montserrat-Regular, serif
      @media (min-width: $mobile-pc-width)
        width: 80%
        font-size: 24px
        font-weight: 400
        line-height: 39px

.describe1
  @media (min-width: $mobile-pc-width)
    opacity: 1
    font-size: 26px
    font-weight: 400
    text-align: center
    line-height: 33px
  font-family: Montserrat, Montserrat-Regular, serif

.describe2
  @media (min-width: $mobile-pc-width)
    line-height: 44px
    font-weight: 300
    opacity: 1
    font-size: 35px
  font-family: Montserrat, Montserrat-Light, serif
  text-align: center
.UA-logo-C
  width: 60%
  text-align: center
  margin: auto
  padding-top: 30px
</style>
