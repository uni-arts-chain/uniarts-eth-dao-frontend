/** * Created by Lay Hunt on 2021-09-06 16:29:38. */
<template>
  <div class="info">
    <img
      class="bg"
      v-if="!$store.state.global.isMobile"
      src="@/assets/images/home-info-bg@2x.png"
    />
    <ul class="info-list">
      <li class="info-item">
        <h5>Staking & Voting</h5>
        <span>Stake, vote for and gain the NFTs that you think are most in-demand.</span>
      </li>
      <li class="info-item">
        <h5>Mint & Retrieve</h5>
        <span
          >According to the number of votes obtained by the NFT, token rewards will be continuously
          cast into this NFT, which can be retrieved by the owner.</span
        >
      </li>
      <li class="info-item">
        <h5>Auction Rewards</h5>
        <span
          >Auction rewards from prize pool with the actual auction deal price of NFTs after the
          voting period.</span
        >
      </li>
      <button class="learn-more" v-if="!$store.state.global.isMobile">LEARN MORE</button>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "info",
  setup() {
    // TODO

    return {};
  },
});
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  background-color: black;
  padding-top: 56px;
  padding-bottom: 59px;
  position: relative;
  overflow: hidden;
  .bg {
    height: 83px;
    position: absolute;
    bottom: 0;
    left: 50%;
    max-width: 1441px;
    transform: translateX(-50%);
  }
}
.info-list {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .learn-more {
    display: block;
    padding: 10px 37px;
    font-size: 12px;
    font-family: Montserrat, Montserrat-Medium;
    font-weight: 500;
    text-align: left;
    color: #ffffff;
    background-color: transparent;
    line-height: 18px;
    border: 1px solid white;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 60px;
    transform: translateY(-50%);
  }
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 15px;
    border-left: 1px solid white;
    max-width: 250px;
    margin-right: 88px;
  }
  h5 {
    margin-bottom: 15px;
    font-size: 19px;
    font-weight: 700;
    text-align: left;
    color: #ffffff;
    line-height: 24px;
  }
  span {
    font-size: 13px;
    font-weight: 500;
    color: #ffffff;
    line-height: 16px;
  }
}

@media screen and (max-width: 750px) {
  .info {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .info-list {
    display: flex;
    flex-direction: column;
  }
  li.info-item {
    margin-bottom: 82px;
    max-width: 100%;
    width: 100%;
    border-left: none;
    margin: 0;
    padding: 25px;
    h5 {
      font-size: 23px;
      max-width: 100%;
    }
    span {
      font-size: 18px;
      max-width: 100%;
      line-height: 27px;
      font-family: Montserrat-Light;
    }
  }
}
</style>
