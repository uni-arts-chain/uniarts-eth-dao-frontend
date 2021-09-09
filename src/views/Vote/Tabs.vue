/** * Created by Lay Hunt on 2021-09-09 16:43:48. */
<template>
  <div class="tabs">
    <div class="tab-head">
      <div class="vote" :class="{ active: currentTab == 1 }" @click="currentTab = 1">Vote</div>
      <div
        class="auction"
        :class="{ active: currentTab == 2 }"
        @click="currentTab = 2"
        style="margin-left: 87px"
      >
        Auction
      </div>
    </div>
    <div class="banner" v-if="currentTab == 1">
      <el-carousel
        @change="onCarouselChange"
        trigger="click"
        height="600px"
        indicator-position="outside"
        :autoplay="false"
      >
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="container">
            <VoteItem />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="banner" v-if="currentTab == 2">
      <el-carousel
        @change="onCarouselChange"
        trigger="click"
        height="600px"
        indicator-position="outside"
        :autoplay="false"
      >
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="container">
            <AuctionItem />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import VoteItem from "./Vote";
import AuctionItem from "./Auction";
export default defineComponent({
  name: "tabs",
  components: {
    VoteItem,
    AuctionItem,
  },
  setup() {
    // TODO
    const currentTab = ref(1);

    const onCarouselChange = (curItem, prevItem) => {
      console.log(curItem);
      console.log(prevItem);
      return;
    };
    return {
      currentTab,
      onCarouselChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.tabs {
  .tab-head {
    display: flex;
    justify-content: center;
    margin-bottom: 34px;
    .vote,
    .auction {
      font-size: 24px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: center;
      color: #000000;
      line-height: 31px;
      padding-bottom: 15px;
      position: relative;
      cursor: pointer;
    }
    .vote.active::after,
    .auction.active::after {
      content: "";
      width: 55px;
      height: 3px;
      background-color: black;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
.banner {
}
</style>
