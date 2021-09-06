/** * Created by Lay Hunt on 2021-09-06 16:29:38. */
<template>
  <div class="info">
    <img class="bg" src="@/assets/images/home-info-bg@2x.png" />
    <ul class="info-list">
      <li class="info-item">
        <h5>Staking & Voting Staking</h5>
        <span>Vote and gain for the NFTs that you think are most in-demand</span>
      </li>
      <li class="info-item">
        <h5>Mint & Retrieve</h5>
        <span
          >According to the number of votes obtained by the NFT, token rewards will be continuously
          cast into this NFT, which can be retrieved by the owner.</span
        >
      </li>
      <li class="info-item">
        <h5>Extra Benefit</h5>
        <span
          >Receive extra rewards from prize pool with the actual deal price of NFTs after the voting
          period</span
        >
      </li>
      <button class="learn-more">LEARN MORE</button>
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
</style>
