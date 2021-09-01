<template>
  <div class="page_title">
    <div class="logo">
      <el-image :src="require('@/assets/art_formula.png')"></el-image>
    </div>
    <div class="title_text">
      <div class="title">ART</div>
      <div class="title">FORMULA</div>
      <div class="text">THE IMPOSSIBLE</div>
    </div>
  </div>
  <div class="card center mt15">
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
  <div class="mt15 center describe1">To Collect Airdrop & Vote for NFT</div>
  <div class="mt15 center describe2">Coming Sept. 20</div>
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

  .title_text
    .title
      opacity: 1
      font-size: 38px
      font-family: Megaton, Megaton-Regular
      font-weight: 400
      text-align: left
      color: #040000
      line-height: 30px
      letter-spacing: -1px

    .text
      opacity: 1
      font-family: Montserrat, Montserrat-Medium
      font-weight: 500
      color: #040000
      line-height: 22px
      font-size: $--font-size-base

.card
  position: relative
  margin: 15px auto
  width: 400px
  background-color: $--color-text-placeholder
  box-shadow: $--box-shadow-base
  border-radius: $--border-radius-base

  .title
    line-height: 60px
    opacity: 1
    font-size: 22px
    font-family: Montserrat, Montserrat-Regular
    font-weight: 400
    text-align: center
    color: #000000

  .button
    padding: 20px

    ::v-deep .el-button
      width: 80%

.describe1
  opacity: 1
  font-size: 26px
  font-family: Montserrat, Montserrat-Regular
  font-weight: 400
  text-align: center
  color: #000000
  line-height: 33px
.describe2
  opacity: 1
  font-size: 35px
  font-family: Montserrat, Montserrat-Light
  font-weight: 300
  text-align: center
  color: #000000
  line-height: 44px
</style>
