/** * Created by Lay Hunt on 2021-09-07 17:12:51. */
<template>
  <div class="assets">
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
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "assets",
  setup() {
    // TODO

    return {};
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
</style>
