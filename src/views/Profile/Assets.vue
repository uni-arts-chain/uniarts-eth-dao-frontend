/** * Created by Lay Hunt on 2021-09-07 17:12:51. */
<template>
  <div class="assets" v-if="!$store.state.global.isMobile">
    <el-row class="head">
      <el-col :span="3" class="item">Token</el-col>
      <el-col :span="7" class="item">Voted</el-col>
      <el-col :span="7" class="item">Bonded</el-col>
      <el-col :span="7" class="item">Avaliable</el-col>
    </el-row>
    <el-row class="body">
      <el-row class="row">
        <el-col :span="3" class="item">Uink</el-col>
        <el-col :span="7" class="item"><span style="text-align: center">2232323200</span></el-col>
        <el-col :span="7" class="item"><span>60231231230</span> <button>unBond</button></el-col>
        <el-col :span="7" class="item"
          ><span>45231231232323130</span> <button>Withdraw</button></el-col
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
        <span class="label">Voted</span>
        <span class="value">100</span>
      </div>
      <div class="item-col">
        <span class="label">Bonded</span>
        <span class="value">800</span>
        <button>unBond</button>
      </div>
      <div class="item-col">
        <span class="label">Avaliable</span>
        <span class="value">12000</span>
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
  width: 100%;
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
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: block;
        width: calc(100% - 70px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
      }
      button {
        color: #a43129;
        cursor: pointer;
        margin-left: 5px;
        background-color: transparent;
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
        width: 50%;
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
          margin-top: 5px;
          background-color: transparent;
          font-size: 14px;
          color: #a43129;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
