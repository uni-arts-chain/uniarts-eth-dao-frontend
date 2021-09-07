/** * Created by Lay Hunt on 2021-09-07 15:37:25. */
<template>
  <div class="index container">
    <div class="content">
      <img class="logo" src="@/assets/images/banner-logo@2x.png" />
      <div class="airdrop-body">
        <div class="airdrop-content" v-if="!isConnected">
          <span class="title">To View Your UART Airdrop Result</span>
          <button class="connect-wallet">Connect Wallet</button>
        </div>
        <div class="airdrop-content connected" v-else>
          <span class="title">Your Airdrop Result is:</span>
          <button class="connect-wallet">8888 UART</button>
        </div>
      </div>
      <div class="action-notice">To Collect Airdrop & Vote for NFT</div>
      <div class="label">Coming Sept. 20</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "index",
  setup() {
    // TODO
    const isConnected = false;
    return {
      isConnected,
    };
  },
});
</script>

<style lang="scss" scoped>
.index {
  margin-top: 125px;
  margin-bottom: 114px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 361px;
  height: 83px;
  margin-bottom: 46px;
}
.airdrop-body {
  background-color: #f0f0f0;
  border-radius: 10px;
  width: 498px;
  height: 230px;
  padding: 54px 63px;

  .airdrop-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .airdrop-content.connected {
    .connect-wallet {
      background-color: white;
      color: black;
      font-family: Montserrat-Medium;
      font-weight: 400;
      text-align: center;
      color: #000000;
      line-height: 39px;
      letter-spacing: -1px;
    }
  }
  .title {
    font-size: 22px;
    font-family: Montserrat-Regular;
    font-weight: 400;
    text-align: center;
    color: #000000;
    line-height: 27px;
    margin-bottom: 40px;
  }
  .connect-wallet {
    background: #000000;
    border-radius: 11px;
    padding: 8px 0;
    color: white;
    font-size: 21px;
    width: 353px;
    font-family: Montserrat-Regular;
    font-weight: 400;
    text-align: center;
    line-height: 39px;
    letter-spacing: -1px;
    cursor: pointer;
  }
}
.action-notice {
  margin-top: 31px;
  font-size: 22px;
  font-family: Montserrat-Medium;
  font-weight: 400;
  text-align: center;
  color: #000000;
  line-height: 33px;
}
.label {
  margin-top: 106px;
  font-size: 26px;
  font-family: Montserrat-Regular;
  font-weight: 300;
  text-align: center;
  color: #000000;
  line-height: 44px;
}
</style>
