/** * Created by Lay Hunt on 2021-09-07 17:12:51. */
<template>
  <div class="assets" v-if="!$store.state.global.isMobile">
    <el-row class="head">
      <el-col :span="4" class="item">Token</el-col>
      <el-col :span="4" class="item">Staking</el-col>
      <el-col :span="4" class="item">Pending</el-col>
      <el-col :span="4" class="item">Voted</el-col>
      <el-col :span="8" class="item">Avaliable</el-col>
    </el-row>
    <el-row class="body">
      <el-row class="row">
        <el-col :span="4" class="item">Uink</el-col>
        <el-col :span="4" class="item">1000</el-col>
        <el-col :span="4" class="item">200</el-col>
        <el-col :span="4" class="item">800</el-col>
        <el-col :span="8" class="item"
          >30 <router-link to="/withdraw">Withdraw</router-link></el-col
        >
      </el-row>
      <el-row class="row">
        <el-col :span="4" class="item">Uink</el-col>
        <el-col :span="4" class="item">1000</el-col>
        <el-col :span="4" class="item">200</el-col>
        <el-col :span="4" class="item">800</el-col>
        <el-col :span="8" class="item"
          >30 <router-link to="/withdraw">Withdraw</router-link></el-col
        >
      </el-row>
    </el-row>
  </div>
  <div class="assets" v-else>
    <div class="item" v-for="(v, i) in assetsList" :key="i">
      <div class="item-col" style="margin-bottom: 20px">
        <span class="label">Token</span>
        <span class="value">UART</span>
      </div>
      <div class="item-col" style="margin-bottom: 20px">
        <span class="label">Staking</span>
        <span class="value">100</span>
      </div>
      <div class="item-col" style="margin-bottom: 20px">
        <span class="label">Pending</span>
        <span class="value">30</span>
      </div>
      <div class="item-col">
        <span class="label">Voted</span>
        <span class="value">800</span>
      </div>
      <div class="item-col">
        <span class="label">Avaliable</span>
        <span class="value">12000</span>
      </div>
      <div class="item-col">
        <button>Withdraw</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "assets",
  setup() {
    // TODO

    const assetsList = ref([1, 2, 3]);

    return {
      assetsList,
    };
  },
});
</script>

<style lang="scss" scoped>
.assets {
  width: 720px;
}
.head {
  width: 100%;
  display: flex;
  .item {
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: center;
    color: #000000;
    margin-bottom: 30px;
  }
}
.body {
  .row {
    width: 100%;
    border-radius: 23px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    .item {
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: center;
      color: #000000;
      padding: 15px;
      a {
        color: #a43129;
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .assets {
    width: 100%;
    .item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 20px 10px;
      margin-bottom: 20px;
      .item-col {
        width: 33%;
        display: flex;
        flex-direction: column;
        span {
          text-align: center;
        }
        .label {
          color: black;
          font-size: 17px;
          font-weight: 400;
          margin-bottom: 7px;
        }
        .value {
          color: black;
          font-family: Montserrat-Light;
          font-size: 16px;
        }
        button {
          background-color: transparent;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
