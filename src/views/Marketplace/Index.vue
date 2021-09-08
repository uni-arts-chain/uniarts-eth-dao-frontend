/** * Created by Lay Hunt on 2021-09-08 18:13:44. */
<template>
  <div class="index container">
    <h3 class="title">Market</h3>
    <div class="search">
      <input type="text" placeholder="Please enter keywords to search work" />
      <img src="@/assets/images/market-search@2x.png" />
    </div>
    <div class="buy-now">
      <div class="title">Buy Now</div>
      <div class="list">
        <div class="item" v-for="v in list" :key="v">
          <router-link to="/marketplace/1"><div class="item-img"></div></router-link>
          <div class="info">
            <div class="name">《 Earth Wisp 》</div>
            <div class="price">Price: 999 Tether</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "index",
  setup() {
    // TODO
    const list = [1, 2, 3, 4];
    return {
      list,
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
    font-size: 14px;
    text-align: left;
    font-family: Montserrat-Regular;
    color: #040000;
    line-height: 23px;
  }
  .price {
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #595757;
    line-height: 23px;
  }
}
</style>
