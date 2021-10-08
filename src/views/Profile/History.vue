/** * Created by Lay Hunt on 2021-09-07 17:12:51. */
<template>
  <div class="history">
    <el-row class="head">
      <el-col :span="4" class="item">Token</el-col>
      <el-col :span="6" class="item">Staking</el-col>
      <el-col :span="6" class="item">Amount</el-col>
      <el-col :span="8" class="item">Date</el-col>
    </el-row>
    <el-row class="body">
      <el-row class="row">
        <el-col :span="4" class="item">USDT</el-col>
        <el-col :span="6" class="item">Vote</el-col>
        <el-col :span="6" class="item">30</el-col>
        <el-col :span="8" class="item">2021-03-21</el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="4" class="item">USDT</el-col>
        <el-col :span="6" class="item">Vote</el-col>
        <el-col :span="6" class="item">30</el-col>
        <el-col :span="8" class="item">2021-03-21</el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "history",
  setup() {
    // TODO

    return {};
  },
});
</script>

<style lang="scss" scoped>
.history {
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
      span {
        color: #a43129;
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .history {
    width: 100%;
  }
  .head {
    margin-top: 20px;
  }
  .head .item {
    margin-bottom: 13px;
    font-size: 15px;
    font-family: Montserrat-Medium;
  }
  .body .row {
    border-radius: 6px;
  }

  .body .row .item {
    padding: 15px 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
