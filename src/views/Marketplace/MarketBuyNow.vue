/** * Created by Lay Hunt on 2021-09-08 18:13:44. */
<template>
  <div v-if="!$store.state.global.isMobile" class="index container">
    <h3 class="title">Buy Now</h3>
    <div v-loading="isLoading" class="buy-now">
      <div class="list" v-if="buyList?.length">
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
            <div class="price">Price: {{ item.price }} {{ marketToken.symbol }}</div>
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
    <div class="button-group" v-if="totalPage > 1">
      <button style="margin-right: 40px" @click="onPrev" :disabled="currentPage < 2">
        Previous
      </button>
      <button style="margin-left: 40px" @click="onNext" :disabled="currentPage >= totalPage">
        Next
      </button>
    </div>
  </div>
  <div v-else class="index container">
    <h3 class="title">Buy Now</h3>
    <div class="buy-now" v-loading="isLoading">
      <div v-if="buyList?.length" class="list">
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
            <div class="price">Price: {{ item.price }} {{ marketToken.symbol }}</div>
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
    <div class="button-group" v-if="totalPage > 1">
      <button style="margin-right: 40px" @click="onPrev" :disabled="currentPage < 2">
        Previous
      </button>
      <button style="margin-left: 40px" @click="onNext" :disabled="currentPage >= totalPage">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import store from "@/store";
import AdaptiveView from "@/components/AdaptiveView";
import http from "@/plugins/http";
import { DAPP_CONFIG } from "@/config";

export default defineComponent({
  name: "index",
  components: {
    AdaptiveView,
  },
  setup() {
    const marketCurrency = "WETH";
    const marketToken = ref(DAPP_CONFIG.tokens[marketCurrency]);
    store.dispatch("global/SetNavText", "Market");
    // todo
    const buyList = ref([]);
    const currentPage = ref(1);
    const perPage = ref(9);
    const totalPage = ref(1);

    const isLoading = ref(false);

    const getAuctionListData = () => {
      isLoading.value = true;
      http
        .globalGetArtOrder({
          page: currentPage.value,
          per_page: perPage.value,
        })
        .then((res) => {
          isLoading.value = false;
          buyList.value = res.list || [];
          let totalCount = res.total_count || 0;
          totalPage.value = Math.ceil(totalCount / perPage.value);
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
        });
    };
    onMounted(() => getAuctionListData());

    const onPrev = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        getAuctionListData();
      }
    };
    const onNext = () => {
      if (currentPage.value < totalPage.value) {
        currentPage.value++;
        getAuctionListData();
      }
    };
    return {
      buyList,
      currentPage,
      totalPage,
      perPage,
      isLoading,
      onPrev,
      onNext,
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
  margin-bottom: 100px;
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

.button-group {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  button {
    border: 3px solid #ddd;
    background: transparent;
    width: 160px;
    height: 49px;
    font-size: 14px;
    font-family: Montserrat-Medium;
    font-weight: 600;
    text-align: center;
    color: #595757;
    cursor: pointer;
  }
  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
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
