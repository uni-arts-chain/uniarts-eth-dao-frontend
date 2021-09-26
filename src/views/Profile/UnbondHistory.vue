/** * Created by Lay Hunt on 2021-09-07 17:12:51. */
<template>
  <div class="history">
    <el-row class="head">
      <el-col :span="4" class="item">Token</el-col>
      <el-col :span="6" class="item">State</el-col>
      <el-col :span="6" class="item">Amount</el-col>
      <el-col :span="8" class="item">Date</el-col>
    </el-row>
    <el-row class="body">
      <el-row class="row">
        <el-col :span="4" class="item"> <span>UART</span></el-col>
        <el-col :span="6" class="item"><span>Unbonding</span></el-col>
        <el-col :span="6" class="item">
          <span style="text-align: right">30</span
          ><button class="operate" @click="onShowDialog">Withdraw</button>
        </el-col>
        <el-col :span="8" class="item"><span>2021-03-21</span></el-col>
      </el-row>
    </el-row>
    <Dialog v-model="dialogTableVisible" v-if="!$store.state.global.isMobile" type="small">
      <div class="dialog-content">
        <div class="balance">{{ bondedBalance }} UART</div>
        <button @click="onWithdraw" v-loading="isUnbonding">Withdraw</button>
      </div>
    </Dialog>
    <MobileConfirm v-else v-model="dialogTableVisible">
      <div class="confirm-content">
        <div class="balance">{{ bondedBalance }} UART</div>
        <button @click="onWithdraw" v-loading="isUnbonding">Withdraw</button>
      </div>
    </MobileConfirm>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Dialog from "@/components/Dialog";
import MobileConfirm from "@/components/MobileConfirm";
export default defineComponent({
  name: "history",
  components: {
    Dialog,
    MobileConfirm,
  },
  setup() {
    // TODO
    const dialogTableVisible = ref(false);
    const isUnbonding = ref(false);
    const bondedBalance = ref(0);

    const onShowDialog = () => {
      dialogTableVisible.value = true;
    };

    const onWithdraw = () => {
      // dialogTableVisible.value = true;
    };
    return {
      dialogTableVisible,
      isUnbonding,
      bondedBalance,
      onWithdraw,
      onShowDialog,
    };
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
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        width: 100%;
      }
      button.operate {
        color: #a43129;
        cursor: pointer;
        margin-left: 10px;
        background-color: transparent;
      }
    }
  }
}

.dialog-content {
  .input-body {
    margin-top: 20px;
    display: flex;
    align-items: center;
    height: 50px;
    border: 1px solid #e3e4e5;
    input {
      height: 100%;
      width: calc(100% - 50px);
      outline: none;
      background-color: white;
      font-size: 17px;
      border: none;
      padding: 0 15px;
    }
    .unit {
      width: 70px;
      font-size: 16px;
      background-color: white;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #000000;
      line-height: 48px;
      padding: 0 10px;
      border-left: 1px solid #e3e4e5;
    }
  }
  .balance {
    font-size: 18px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: center;
    color: #000000;
    line-height: 50px;
    padding-left: 20px;
  }
  button {
    width: 343px;
    height: 48px;
    background-color: black;
    border-radius: 6px;
    color: white;
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 32px;
    margin: 0 auto;
    margin-top: 33px;
    display: block;
    cursor: pointer;
  }
  .notice {
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #898989;
    line-height: 18px;
    width: 343px;
    margin: 0 auto;
    margin-top: 21px;
  }
}

.confirm-content {
  padding: 30px 15px 60px 15px;
  .input-body {
    margin-top: 20px;
    display: flex;
    align-items: center;
    height: 50px;
    border: 1px solid #e3e4e5;
    input {
      height: 100%;
      width: calc(100% - 50px);
      outline: none;
      background-color: white;
      font-size: 17px;
      border: none;
      padding: 0 15px;
    }
    .unit {
      width: 70px;
      font-size: 16px;
      background-color: white;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #000000;
      line-height: 48px;
      padding: 0 10px;
      border-left: 1px solid #e3e4e5;
    }
  }
  .balance {
    font-size: 18px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: center;
    color: #000000;
    line-height: 50px;
    padding-left: 20px;
  }
  button {
    width: 100%;
    height: 48px;
    background-color: black;
    border-radius: 6px;
    color: white;
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 32px;
    margin: 0 auto;
    margin-top: 33px;
    display: block;
    cursor: pointer;
  }
  .notice {
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #898989;
    line-height: 18px;
    width: 343px;
    margin: 0 auto;
    margin-top: 21px;
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
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    button.operate {
      color: #a43129;
      cursor: pointer;
    }
  }
}
</style>
