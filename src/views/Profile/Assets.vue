/** * Created by Lay Hunt on 2021-09-07 17:12:51. */
<template>
  <div class="assets" v-if="!$store.state.global.isMobile">
    <el-row class="head">
      <el-col :span="3" class="item">Token</el-col>
      <el-col :span="7" class="item">Voted</el-col>
      <el-col :span="7" class="item">Bonded</el-col>
      <el-col :span="7" class="item">Available</el-col>
    </el-row>
    <el-row class="body">
      <div class="no-data" v-if="assetsList.length == 0">No data</div>
      <el-row class="row" v-for="(v, i) in assetsList" :key="i">
        <el-col :span="3" class="item">{{ v.token }}</el-col>
        <el-col :span="7" class="item"
          ><span style="text-align: center">{{ v.voted }}</span></el-col
        >
        <el-col :span="7" class="item"
          ><span style="text-align: center">{{ v.bound }}</span>
        </el-col>
        <el-col :span="7" class="item"
          ><span style="text-align: center">{{ v.available }}</span>
        </el-col>
      </el-row>
    </el-row>
    <div class="notices">
      Notice:<br />
      Rewarded and airdrop UARTs unbond will start from 15th Nov.
    </div>
  </div>
  <div class="assets" v-else>
    <div class="no-data" v-if="assetsList.length == 0">No data</div>
    <div class="item" v-for="(v, i) in assetsList" :key="i">
      <div class="item-col" style="margin-bottom: 20px">
        <span class="label">Token</span>
        <span class="value">{{ v.token }}</span>
      </div>
      <div class="item-col" style="margin-bottom: 20px">
        <span class="label">Voted</span>
        <span class="value">{{ v.voted }}</span>
      </div>
      <div class="item-col">
        <span class="label">Bonded</span>
        <span class="value">{{ v.bound }}</span>
      </div>
      <div class="item-col">
        <span class="label">Available</span>
        <span class="value">{{ v.available }}</span>
      </div>
    </div>
    <div class="notices">
      Notice:<br />
      Rewarded and airdrop UARTs unbond will start from 15th Nov.
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { BigNumber } from "@/plugins/bignumber";
import { DAPP_CONFIG } from "@/config";
import http from "@/plugins/http";
import store from "@/store";
import { notification } from "@/components/Notification";
import VoteMining from "@/contracts/VoteMining";
export default defineComponent({
  name: "assets",
  setup() {
    // TODO
    const isLoading = ref(false);
    const assetsList = ref([]);

    onMounted(() => {
      if (connectedAccount.value) {
        getAssets();
      }
    });

    const getAssets = async () => {
      isLoading.value = true;
      http
        .userGetAssets({})
        .then(async (res) => {
          assetsList.value = res.list;
          assetsList.value.forEach((v) => {
            let token = DAPP_CONFIG.tokens[v.token.toUpperCase()];
            token
              ? VoteMining.getRedeemableBalance(connectedAccount.value, token.address).then(
                  (res) => {
                    res = new BigNumber(res);
                    if (!res.isZero()) {
                      v.available = res.shiftedBy(-token.decimals).toString();
                    }
                  }
                )
              : "";
          });
          const bonedTotal = await VoteMining.getBondedBalance(connectedAccount.value);
          const uartToken = assetsList.value.find(
            (v) => v.token.toLowerCase() === DAPP_CONFIG.tokens.UART.symbol.toLowerCase()
          );
          if (uartToken && !bonedTotal.isZero()) {
            uartToken.bound = bonedTotal.shiftedBy(-DAPP_CONFIG.tokens.UART.decimals).toString();
          }
          isLoading.value = false;
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    const connectedAccount = computed(() => {
      return store.state.user.info.address;
    });

    return {
      assetsList,
      connectedAccount,
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
        width: calc(100% - 120px);
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

.no-data {
  color: #aaa;
  font-size: 13px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.notices {
  font-size: 14px;
  font-family: Montserrat-Regular;
  font-weight: 300;
  text-align: left;
  color: black;
  line-height: 18px;
  width: 100%;
  margin: 0 auto;
  margin-top: 41px;
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
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
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
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
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
</style>
