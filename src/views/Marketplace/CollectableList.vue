/** * Created by Lay Hunt on 2021-09-08 18:13:44. */
<template>
  <div v-if="!$store.state.global.isMobile" class="index container">
    <h3 class="title">Market</h3>
    <div class="search">
      <input placeholder="Please enter keywords to search work" type="text" />
      <img src="@/assets/images/market-search@2x.png" />
    </div>
    <div class="market-category">
      <router-link class="title" to="/marketplace">Arts</router-link>
      <div class="title select">Collectable</div>
      <router-link class="title" to="/marketplace-souvenirs">Souvenirs</router-link>
    </div>
  </div>
  <div v-else class="index container">
    <h3 class="title">Market</h3>
    <div class="search">
      <input placeholder="Please enter keywords..." type="text" />
      <img src="@/assets/images/market-search@2x.png" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import store from "@/store";
import http from "@/plugins/http";
import { DAPP_CONFIG } from "@/config";

export default defineComponent({
  name: "CollectableList",
  components: {},
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
    const getAuctionListData = () => {
      auctionLoading.value = true;
      http
        .globalGetAuctions({
          page: auctionCurrentPage.value,
          per_page: auctionPerPage.value,
        })
        .then((res) => {
          auctionList.value = res.list || [];
          auctionLoading.value = false;
        })
        .catch((err) => {
          console.log(err);
          auctionLoading.value = false;
        });
      // http.globalGetAuctionsGroup({}).then((res) => {
      //   console.log(res);
      // });
      buyLoading.value = true;
      http
        .globalGetArtOrder({
          page: buyListCurrentPage.value,
          per_page: buyListPerPage.value,
        })
        .then((res) => {
          buyList.value = res.list || [];
          buyLoading.value = false;
        })
        .catch((err) => {
          console.log(err);
          buyLoading.value = false;
        });
    };
    onMounted(() => getAuctionListData());
    return {
      // marketCurrency,
      // marketToken,
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
