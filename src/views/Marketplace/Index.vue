/** * Created by Lay Hunt on 2021-09-08 18:13:44. */
<template>
  <div v-if="!$store.state.global.isMobile" class="index container">
    <h3 class="title">Market</h3>
    <div class="search">
      <input placeholder="Please enter keywords to search work" type="text" />
      <img src="@/assets/images/market-search@2x.png" />
    </div>
    <div class="buy-now" v-if="auctionList.length">
      <div class="title">
        <span>Timed Auctions</span>
        <router-link
          style="font-family: Montserrat-Light; font-size: 14px"
          to="/marketplace/auctions"
          >MORE ></router-link
        >
      </div>
      <div v-if="auctionList.length > 0" class="list">
        <div v-for="item in auctionList" :key="item.id" class="item">
          <router-link :to="`/marketplace/auction/${item.auction_id}/${item.id}`">
            <AdaptiveView
              :nft="item"
              width="364px"
              height="364px"
              :isResponsive="true"
              :isPreview="true"
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
                } ${item.currency_code?.toUpperCase()}`
              }}
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
    <div v-if="buyList?.length" class="buy-now">
      <div class="title">
        <span>Buy Now</span>
        <router-link style="font-family: Montserrat-Light; font-size: 14px" to="/marketplace/buynow"
          >MORE ></router-link
        >
      </div>
      <div v-if="buyList.length > 0" class="list">
        <div v-for="item in buyList" :key="item.id" class="item">
          <router-link :to="`/marketplace/buy/${item.id}`">
            <AdaptiveView
              :nft="item.art"
              width="364px"
              height="364px"
              :isResponsive="true"
              :isPreview="true"
            />
          </router-link>
          <div class="info">
            <div class="name">{{ item.art.name }}</div>
            <div class="price">
              Price: {{ item.price }} {{ item.art.currency_code.toUpperCase() }}
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
  </div>
  <div v-else class="index container">
    <h3 class="title">Market</h3>
    <div class="search">
      <input placeholder="Please enter keywords..." type="text" />
      <img src="@/assets/images/market-search@2x.png" />
    </div>
    <div class="buy-now">
      <div class="title">
        <div :class="{ active: currentTab == 1 }" class="title-tab" @click="currentTab = 1">
          Auctions
        </div>
        <div :class="{ active: currentTab == 2 }" class="title-tab" @click="currentTab = 2">
          Buy Now
        </div>
      </div>
      <div v-if="currentTab == 1" class="list">
        <div v-for="item in auctionList" :key="item.id" class="item">
          <router-link :to="`/marketplace/auction/${item.auction_id}/${item.id}`">
            <AdaptiveView
              :nft="item"
              width="335px"
              height="200px"
              :isResponsive="true"
              :isPreview="true"
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
                } ${item.currency_code?.toUpperCase()}`
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
          to="/marketplace/auctions"
          >MORE</router-link
        >
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
      </div>
      <div v-else v-show="buyList?.length" class="list">
        <div v-for="item in buyList" :key="item.id" class="item">
          <router-link :to="`/marketplace/buy/${item.id}`">
            <AdaptiveView
              :nft="item.art"
              width="335px"
              height="200px"
              :isResponsive="true"
              :isPreview="true"
            />
          </router-link>
          <div class="info">
            <div class="name">{{ item.art.name }}</div>
            <div class="price">
              Price: {{ item.price }} {{ item.art.currency_code.toUpperCase() }}
            </div>
          </div>
        </div>
        <router-link
          v-if="buyList.length > 0"
          style="
            font-size: 14px;
            width: 100%;
            text-align: center;
            line-height: 50px;
            border: 2px solid black;
            color: black;
            margin-top: 10px;
          "
          to="/marketplace/buynow"
          >MORE</router-link
        >
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
import AdaptiveView from "@/components/AdaptiveView";
import http from "@/plugins/http";

export default defineComponent({
  name: "index",
  components: {
    AdaptiveView,
  },
  setup() {
    store.dispatch("global/SetNavText", "Market");

    const auctionList = ref([]);
    const auctionCurrentPage = ref(1);
    const auctionPerPage = ref(6);
    // todo
    const buyList = ref([]);
    const buyListCurrentPage = ref(1);
    const buyListPerPage = ref(6);

    const currentTab = ref(1);
    const getAuctionListData = () => {
      http
        .globalGetAuctions({
          page: auctionCurrentPage.value,
          per_page: auctionPerPage.value,
        })
        .then((res) => {
          auctionList.value = res.list;
        });
      // http.globalGetAuctionsGroup({}).then((res) => {
      //   console.log(res);
      // });
      http
        .globalGetArtOrder({
          page: buyListCurrentPage.value,
          per_page: buyListPerPage.value,
        })
        .then((res) => {
          buyList.value = res.list || [];
        })
        .catch((err) => {
          console.log(err);
        });
    };
    onMounted(() => getAuctionListData());
    return {
      auctionList,
      auctionCurrentPage,
      auctionPerPage,
      buyList,
      buyListCurrentPage,
      buyListPerPage,
      currentTab,
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
  }

  .name {
    font-size: 15px;
    text-align: left;
    font-family: Montserrat-Regular;
    color: #040000;
    line-height: 23px;
  }

  .price {
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #595757;
    line-height: 23px;
  }
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
  }
}
</style>
