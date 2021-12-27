/** * Created by Lay Hunt on 2021-09-08 18:13:44. */
<template>
  <div v-if="!$store.state.global.isMobile" class="index container">
    <h3 class="title">Market</h3>
    <div class="search">
      <input placeholder="Please enter keywords to search work" type="text" />
      <img src="@/assets/images/market-search@2x.png" />
    </div>
    <!-- <div class="market-category">
      <router-link :class="{ title: true, select: $route.path == '/marketplace' }" to="/marketplace"
        >Arts</router-link
      >
      <div class="title" style="color: #aaa">Collectable</div>
      <router-link
        :class="{ title: true, select: $route.path == '/marketplace/souvenirs' }"
        class="title"
        to="/marketplace/souvenirs"
        >Souvenirs</router-link
      >
    </div> -->
    <router-view />
  </div>
  <div v-else class="index container">
    <h3 class="title">Market</h3>
    <div class="search">
      <input placeholder="Please enter keywords..." type="text" />
      <img src="@/assets/images/market-search@2x.png" />
    </div>
    <!-- <div class="market-category">
      <router-link :class="{ title: true, select: $route.path == '/marketplace' }" to="/marketplace"
        >Arts</router-link
      >
      <div class="title" style="color: #aaa">Collectable</div>
      <router-link
        :class="{ title: true, select: $route.path == '/marketplace/souvenirs' }"
        class="title"
        to="/marketplace/souvenirs"
        >Souvenirs</router-link
      >
    </div> -->
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "index",
  setup() {
    store.dispatch("global/SetNavText", "Market");
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
  padding: 0 15px;
  display: flex;
  justify-content: center;
  margin: 40px 0 50px 0;
  .select {
    font-weight: 900;
    text-decoration: underline;
  }
  .title {
    text-align: center;
    width: 200px;
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

    .market-category {
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      margin: 40px 0 30px 0;
      .select {
        font-weight: 900;
        text-decoration: underline;
      }
      .title {
        text-align: center;
        width: auto;
      }
    }
  }
}
</style>
