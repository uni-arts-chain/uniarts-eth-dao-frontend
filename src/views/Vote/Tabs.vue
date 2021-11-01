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
    <div class="banner" v-if="currentTab == 1" v-loading="isLoading">
      <div class="banner no-data" v-if="voteList.length == 0">No vote</div>
      <el-carousel
        v-else
        @change="onCarouselChange"
        trigger="click"
        :height="isMobile ? `700px` : `600px`"
        :arrow="isShowVoteArrow"
        indicator-position="outside"
        :autoplay="false"
      >
        <el-carousel-item v-for="(item, i) in voteList" :key="i">
          <div class="container">
            <VoteItem v-if="!isMobile" :item="item" />
            <VoteItemMobile v-else :item="item" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="banner" v-if="currentTab == 2" v-loading="isLoading">
      <div class="banner no-data" v-if="auctionList.length == 0">No auction</div>
      <el-carousel
        v-else
        @change="onCarouselChange"
        trigger="click"
        :arrow="isShowAuctionArrow"
        :height="isMobile ? `800px` : `600px`"
        indicator-position="outside"
        :autoplay="false"
      >
        <el-carousel-item v-for="(item, v) in auctionList" :key="v">
          <div class="container">
            <AuctionItem v-if="!isMobile" :item="item" />
            <AuctionItemMobile v-else :item="item" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import VoteItem from "./VoteItem";
import VoteItemMobile from "./VoteItemMobile";
import AuctionItem from "./Auction";
import AuctionItemMobile from "./AuctionMobile";
import notification from "@/components/Notification";
import http from "@/plugins/http";
import store from "@/store";

export default defineComponent({
  name: "tabs",
  components: {
    VoteItem,
    AuctionItem,
    VoteItemMobile,
    AuctionItemMobile,
  },
  setup() {
    // TODO
    const currentTab = ref(2);

    const isLoading = ref(false);

    const onCarouselChange = (curItem, prevItem) => {
      console.log(curItem);
      console.log(prevItem);
      return;
    };

    const voteList = ref([]);
    const auctionList = ref([]);

    watch(currentTab, (value) => {
      if (value == 2) {
        onRequestAuctionData();
      } else {
        onRequestData();
      }
    });

    const onRequestData = () => {
      isLoading.value = true;
      http
        .globalGetVoteList({
          type: "voting",
        })
        .then((res) => {
          isLoading.value = false;
          voteList.value = res.list;
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          notification.error(err.head ? err.head.msg : err.message);
        });
    };

    const onRequestAuctionData = () => {
      isLoading.value = true;
      http
        .globalGetAuctionsGroupVotes({})
        .then((res) => {
          isLoading.value = false;
          if (res.list.length > 0 && res.list[0].arts.length > 0) {
            auctionList.value = res.list[0].arts;
          }
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          notification.error(err.head ? err.head.msg : err.message);
        });
    };

    onMounted(() => {
      onRequestData();
      onRequestAuctionData();
    });

    const isMobile = computed(() => {
      return store.state.global.isMobile;
    });

    const isShowVoteArrow = computed(() => {
      return store.state.global.isMobile ? "always" : voteList.value.length > 0 ? "hover" : "never";
    });
    const isShowAuctionArrow = computed(() => {
      return store.state.global.isMobile
        ? "always"
        : auctionList.value.length > 0
        ? "hover"
        : "never";
    });

    return {
      voteList,
      auctionList,

      isLoading,
      currentTab,
      onCarouselChange,

      isMobile,
      isShowVoteArrow,
      isShowAuctionArrow,

      onRequestAuctionData,
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
.banner.no-data {
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
