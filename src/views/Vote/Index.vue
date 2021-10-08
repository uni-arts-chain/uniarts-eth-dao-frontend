/** * Created by Lay Hunt on 2021-09-09 16:27:52. */
<template>
  <div class="index">
    <Tabs />
    <div class="container">
      <Detail />
    </div>
    <div class="notice">
      <div class="container">
        <h2>Art Formula NFT Vote</h2>
        <p>
          - Vote for NFTs that you think are most in-demand<br />
          - According to the number of votes obtained by each NFT, UART rewards will be continuously
          cast into NFTs, which can be retrieved by the owner.<br />
          - Vote for NFT won't cost any token, voted token can be retrieved at UTC 00:00 next day.
          <br />
          - Vote reward will be distributed at UTC 00:00 everyday during the voting period. <br />
          - Auction reward will be distributed after the auction round. The higher the deal price,
          the more benefit will be available for the voters of the NFT.
        </p>
        <div class="more" @click="$router.push('/vote/rule')">More ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Tabs from "./Tabs";
import Detail from "./Detail";
export default defineComponent({
  name: "index",
  components: {
    Tabs,
    Detail,
  },
  setup() {
    // TODO
    const currentTab = ref(1);
    return {
      currentTab,
    };
  },
});
</script>

<style lang="scss" scoped>
.index {
  padding-top: 109px;
}

.notice {
  background-color: #f1eff0;
  margin-top: 113px;
  .container {
    height: 304px;
    padding-top: 55px;
    h2 {
      font-size: 36px;
      font-family: Montserrat-Blod;
      font-weight: 500;
      text-align: left;
      color: #000000;
      margin-bottom: 15px;
    }
    p {
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      color: #898989;
      line-height: 24px;
      margin-bottom: 10px;
    }
    .more {
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 750px) {
  .notice .container {
    height: auto;
    padding-top: 30px;
    padding-bottom: 50px;
    h2 {
      font-size: 22px;
      font-family: Montserrat-Medium;
    }
    p {
      color: black;
    }
    .more {
      font-family: Montserrat-Medium;
      font-weight: 800;
      color: black;
    }
  }
}
</style>
