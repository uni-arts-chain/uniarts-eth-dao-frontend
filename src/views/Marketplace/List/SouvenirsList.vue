/** * Created by Lay Hunt on 2021-09-08 18:13:44. */
<template>
  <div v-if="!$store.state.global.isMobile" class="index container">
    <div class="loading" v-if="buyLoading" v-loading="buyLoading"></div>
    <!-- <div v-if="auctionList.length" class="buy-now">
      <div class="title">
        <span>Timed Auctions</span>
        <router-link
          to="/marketplace/souvenirs/auctions"
          style="font-family: Montserrat-Light; font-size: 14px"
        >
          MORE ></router-link
        >
      </div>
      <div v-if="auctionList.length > 0" class="list">
        <div v-for="item in auctionList" :key="item.id" class="item">
          <router-link
            style="position: relative"
            :to="`/marketplace/souvenir-auction/${item.id}`"
          >
            <div class="label-sold" v-if="item.aasm_state == 'sold'">SOLD</div>
            <AdaptiveImage
              :isPreview="true"
              :isResponsive="true"
              :url="item.sample"
              height="266px"
              width="364px"
            />
          </router-link>
          <div class="info">
            <div class="name">{{ item.title }}</div>
            <div class="price">
              {{ `Current Bid: ${item.price_range[0]?.highest_price} ${item.price_range[0]?.coin?.toUpperCase()}` }}</div>
          </div>
        </div>
      </div>
      <div
        class="no-data"
        v-else
        style="min-height: 200px; text-align: center; line-height: 200px; color: #999"
      >
        No Data
      </div>
    </div> -->
    <div v-if="buyList?.length" class="buy-now">
      <div class="title">
        <span>Buy Now</span>
        <router-link
          to="/marketplace/souvenirs/buynow"
          style="font-family: Montserrat-Light; font-size: 14px"
        >
          MORE ></router-link
        >
      </div>
      <div v-if="buyList.length > 0" class="list">
        <div v-for="item in buyList" :key="item.id" class="item">
          <router-link style="position: relative" :to="`/souvenirs/detail/${item.id}`">
            <!-- <div class="label-sold" v-if="item.aasm_state == 'sold'">SOLD</div> -->
            <AdaptiveImage
              :isPreview="true"
              :isResponsive="true"
              :url="item.sample"
              height="266px"
              width="364px"
            />
          </router-link>
          <div class="info">
            <div class="name">{{ item.title }}</div>
            <div class="price">
              Price: {{ item.price_range[0]?.highest_price }}
              {{ item.price_range[0]?.coin?.toUpperCase() }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="no-data"
        style="min-height: 200px; text-align: center; line-height: 200px; color: #999"
      >
        No Data
      </div>
    </div>
    <div
      class="no-data"
      v-if="buyList?.length == 0 && !buyLoading"
      style="min-height: 200px; text-align: center; line-height: 200px; color: #999"
    >
      No Data
    </div>
  </div>
  <div v-else class="index container">
    <div class="loading" v-if="buyLoading" v-loading="buyLoading"></div>
    <div class="buy-now">
      <!-- <div class="title">
        <div :class="{ active: currentTab == 1 }" class="title-tab" @click="currentTab = 1">
          Auctions
        </div>
        <div :class="{ active: currentTab == 2 }" class="title-tab" @click="currentTab = 2">
          Buy Now
        </div>
      </div> -->
      <!-- <div v-if="currentTab == 1" class="list">
        <div v-for="item in auctionList" :key="item.id" class="item">
          <router-link :to="`/marketplace/auction/${item.auction_id}/${item.id}`">
            <AdaptiveView
              :isPreview="true"
              :isResponsive="true"
              :nft="item"
              height="200px"
              width="335px"
            />
          </router-link>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="price">
              {{
                `${Number(item.auction_latest_price) ? "Current Bid" : "Bid"}: ${
                  Number(item.auction_latest_price)
                    ? item.auction_latest_price
                    : item.auction_min_bid
                } ${item.biding_coin}`
              }}
            </div>
          </div>
        </div>
        <router-link
          v-if="auctionList.length > 0"
          style="
            font-size: 14px;
            width: 100%;
            text-align: center;
            line-height: 50px;
            border: 2px solid black;
            color: black;
            margin-top: 10px;
          "
          >MORE
        </router-link>
        <div
          v-if="auctionList.length == 0"
          class="no-data"
          style="
            width: 100%;
            min-height: 200px;
            text-align: center;
            line-height: 200px;
            color: #999;
          "
        >
          No Data
        </div>
      </div> -->
      <div v-show="buyList?.length" class="list">
        <div v-for="item in buyList" :key="item.id" class="item">
          <router-link style="position: relative" :to="`/souvenirs/detail/${item.id}`">
            <AdaptiveImage
              :isPreview="true"
              :isResponsive="true"
              :url="item.sample"
              height="266px"
              width="100%"
            />
          </router-link>
          <div class="info">
            <div class="name">{{ item.title }}</div>
            <div class="price">
              Price: {{ item.price_range[0]?.highest_price }}
              {{ item.price_range[0]?.coin?.toUpperCase() }}
            </div>
          </div>
        </div>
        <router-link
          v-if="buyList.length > 0"
          to="/marketplace/souvenirs/buynow"
          style="
            font-size: 14px;
            width: 100%;
            text-align: center;
            line-height: 50px;
            border: 2px solid black;
            color: black;
            margin-top: 10px;
          "
        >
          MORE
        </router-link>
        <div
          v-if="buyList.length == 0"
          class="no-data"
          style="
            width: 100%;
            min-height: 200px;
            text-align: center;
            line-height: 200px;
            color: #999;
          "
        >
          No Data
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import store from "@/store";
import AdaptiveImage from "@/components/AdaptiveImage";
// import AdaptiveView from "@/components/AdaptiveView";
import http from "@/plugins/http";
import { DAPP_CONFIG } from "@/config";

export default defineComponent({
  name: "index",
  components: {
    AdaptiveImage,
    // AdaptiveView,
  },
  setup() {
    const marketCurrency = "WETH";
    const marketToken = DAPP_CONFIG.tokens[marketCurrency];
    store.dispatch("global/SetNavText", "Market");

    const auctionList = ref([]);
    const auctionCurrentPage = ref(1);
    const auctionPerPage = ref(6);
    // todo
    const buyList = ref([]);
    const buyListCurrentPage = ref(1);
    const buyListPerPage = ref(6);

    const currentTab = ref(1);
    const auctionLoading = ref(false);
    const buyLoading = ref(false);
    // const getSouvenirsListData = () => {
    //   auctionLoading.value = true;
    //   http
    //     .globalGetSouvenirsList({
    //       page: auctionCurrentPage.value,
    //       per_page: auctionPerPage.value,
    //     })
    //     .then((res) => {
    //       auctionList.value = res.list || [];
    //       auctionLoading.value = false;
    //       console.log(auctionList.value);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       auctionLoading.value = false;
    //     });
    // };
    const getSouvenirsListOrderData = () => {
      buyLoading.value = true;
      http
        .globalGetSouvenirsList({
          page: buyListCurrentPage.value,
          per_page: buyListPerPage.value,
        })
        .then((res) => {
          buyList.value = res.list || [];
          buyLoading.value = false;
          console.log(auctionList.value);
        })
        .catch((err) => {
          console.log(err);
          buyLoading.value = false;
        });
    };
    onMounted(() => {
      // getSouvenirsListData();
      getSouvenirsListOrderData();
    });
    return {
      auctionList,
      auctionCurrentPage,
      auctionPerPage,
      buyList,
      buyListCurrentPage,
      buyListPerPage,
      currentTab,
      auctionLoading,
      buyLoading,
      marketToken,
    };
  },
});
</script>

<style lang="scss" scoped>
.index {
  width: 1160px;
  padding-bottom: 100px;
}

h3.title {
  margin-top: 143px;
  font-size: 40px;
  font-family: Montserrat-Medium;
  font-weight: 500;
  text-align: center;
  color: #000000;
  line-height: 76px;
  margin-bottom: 50px;
}

.market-category {
  padding: 0 20% 15px 20%;
  display: flex;
  flex-direction: row;

  .select {
    font-weight: 900;
    text-decoration: underline;
  }

  .title {
    text-align: center;
    flex: 1;
  }
}

.loading {
  height: 238px;
  width: 100%;
}

.search {
  margin: 0 auto;
  margin-bottom: 86px;
  border: 2px solid black;
  padding-right: 60px;
  height: 51px;
  width: 677px;
  position: relative;

  input {
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: black;
    line-height: 47px;
    height: 47px;
    width: 100%;
    padding: 0 20px;
  }

  img {
    width: 23px;
    height: 23px;
    position: absolute;
    right: 20px;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
  }
}

.buy-now {
  .title {
    font-size: 18px;
    font-family: Montserrat-Medium;
    color: #040000;
    line-height: 23px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }

  .list .item {
    width: 364px;
    display: flex;
    flex-direction: column;
    margin-right: 34px;
    margin-bottom: 60px;
  }

  .list .item:nth-child(3n) {
    margin-right: 0px;
  }

  .list .item-img {
    width: 364px;
    height: 364px;
    background-color: black;
  }

  .list .item .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
    width: 100%;
  }

  .name {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    text-align: left;
    font-family: Montserrat-Regular;
    color: #040000;
    line-height: 23px;
  }

  .price {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: right;
    color: #595757;
    line-height: 23px;
  }
}

.label-sold {
  position: absolute;
  z-index: 100;
  font-size: 16px;
  margin: 7px;
  padding: 7px;
  color: #fff;
  border-radius: 5px;
  background-color: #00000088;
}

@media screen and (max-width: 750px) {
  .index {
    width: 100%;

    h3.title {
      margin-top: 20px;
      font-size: 27px;
      font-family: Montserrat-Medium;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .search {
      width: 100%;
      border-color: #ddd;
      border-radius: 26px;
      overflow: hidden;
      margin-bottom: 30px;

      input {
        font-size: 16px;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    .buy-now .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .buy-now .title-tab {
      padding: 17px 10px;
      width: 50%;
      text-align: center;
      border-bottom: 2px solid #ddd;
      font-family: Montserrat-Medium;
    }

    .buy-now .title-tab.active {
      border-bottom-color: black;
    }

    .buy-now .list .item {
      width: 100%;
      margin-right: 0;

      .item-img {
        width: 100%;
        height: 200px;
      }

      .info {
        margin-top: 15px;
      }

      .info .name {
        font-size: 15px;
      }

      .info .price {
        font-size: 15px;
      }
    }
    .adaptive-image {
      max-width: 100%;
    }
  }
}
</style>
