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
  <div class="mt15 center describe">To Collect Airdrop & Vote for NFT</div>
  <div class="mt15 center describe">Coming Sept. 20</div>
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
      font-family: "Broadway", serif
      font-size: 28px

    .text
      font-size: $--font-size-extra-small

.card
  position: relative
  margin: 15px auto
  width: 400px
  background-color: $--color-text-placeholder
  box-shadow: $--box-shadow-base
  border-radius: $--border-radius-base

  .title
    font-size: $--font-size-extra-large
    line-height: 60px

  .button
    padding: 20px

    ::v-deep .el-button
      width: 80%

.describe
  font-size: $--font-size-large
  font-weight: 600
</style>
