/** * Created by Lay Hunt on 2021-09-08 18:13:44. */
<template>
  <div class="index container" v-if="!$store.state.global.isMobile">
    <h3 class="title">Market</h3>
    <div class="search">
      <input type="text" placeholder="Please enter keywords to search work" />
      <img src="@/assets/images/market-search@2x.png" />
    </div>
    <div class="buy-now">
      <div class="title">Timed Auctions</div>
      <div class="list">
        <div class="item" v-for="v in auctionList" :key="v">
          <router-link to="/marketplace/1"><div class="item-img"></div></router-link>
          <div class="info">
            <div class="name">《 Earth Wisp 》</div>
            <div class="price">Price: 999 USDT</div>
          </div>
        </div>
      </div>
    </div>
    <div class="buy-now">
      <div class="title">Buy Now</div>
      <div class="list">
        <div class="item" v-for="v in buyList" :key="v">
          <router-link to="/marketplace/1"><div class="item-img"></div></router-link>
          <div class="info">
            <div class="name">《 Earth Wisp 》</div>
            <div class="price">Price: 999 USDT</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="index container" v-else>
    <h3 class="title">Market</h3>
    <div class="search">
      <input type="text" placeholder="Please enter keywords..." />
      <img src="@/assets/images/market-search@2x.png" />
    </div>
    <div class="buy-now">
      <div class="title">
        <di class="title-tab" @click="currentTab = 1" :class="{ active: currentTab == 1 }">
          Timed Auctions
        </di>
        <di class="title-tab" @click="currentTab = 2" :class="{ active: currentTab == 2 }">
          Buy Now
        </di>
      </div>
      <div class="list" v-if="currentTab == 1">
        <div class="item" v-for="v in auctionList" :key="v">
          <router-link to="/marketplace/1"><div class="item-img"></div></router-link>
          <div class="info">
            <div class="name">《 Earth Wisp 》</div>
            <div class="price">Highest Bid: 999 USDT</div>
          </div>
        </div>
      </div>
      <div class="list" v-else>
        <div class="item" v-for="v in buyList" :key="v">
          <router-link to="/marketplace/1"><div class="item-img"></div></router-link>
          <div class="info">
            <div class="name">《 Earth Wisp 》</div>
            <div class="price">Price: 999 USDT</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import store from "@/store";
export default defineComponent({
  name: "index",
  setup() {
    // TODO

    store.dispatch("global/SetNavText", "Market");

    const auctionList = [1, 2, 3];
    const buyList = [1, 2, 3];

    const currentTab = ref(1);

    return {
      auctionList,
      buyList,
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
    text-align: left;
    color: #040000;
    line-height: 23px;
    margin-bottom: 15px;
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
