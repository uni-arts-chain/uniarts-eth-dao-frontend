/** * Created by Lay Hunt on 2021-09-07 17:12:51. */
<template>
  <div class="assets" v-if="!$store.state.global.isMobile">
    <el-row class="head">
      <el-col :span="4" class="item" style="text-align: left; padding-left: 15px">Token</el-col>
      <el-col :span="7" class="item">Voted</el-col>
      <el-col :span="6" class="item">Bonded</el-col>
      <el-col :span="7" class="item">Available</el-col>
    </el-row>
    <el-row class="body">
      <div class="no-data" v-if="assetsList.length == 0">No data</div>
      <el-row class="row" v-for="(v, i) in assetsList" :key="i">
        <el-col :span="4" class="item" style="justify-content: flex-start">
          <img style="width: 30px" :src="getIcon(v.token?.toLowerCase())" />
          {{ v.token }}
          <span class="version" v-if="getContractVersion(v.contract)">{{
            getContractVersion(v.contract)
          }}</span>
        </el-col>
        <el-col :span="7" class="item"
          ><span style="text-align: center">{{ v.voted }}</span></el-col
        >
        <el-col :span="6" class="item">
          <span style="text-align: center">{{ v.bound }}</span>
          <button v-if="v.token?.toUpperCase() === 'UART'" @click="onShowDialog(v)">unBond</button>
        </el-col>
        <el-col :span="7" class="item">
          <span style="text-align: right; width: initial">{{ v.available }}</span>
          <!-- <button @click="onShowWithdrawDialog(v)">Withdraw</button> -->
        </el-col>
      </el-row>
    </el-row>
  </div>
  <div class="assets" v-else>
    <div class="no-data" v-if="assetsList.length == 0">No data</div>
    <div class="item" v-for="(v, i) in assetsList" :key="i">
      <div class="item-col" style="margin-bottom: 20px">
        <span class="label">Token</span>
        <span class="value" style="display: flex; align-center: center; justify-content: center">
          <img style="width: 30px" :src="getIcon(v.token?.toLowerCase())" />
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{
            v.token
          }}</span>
          <span class="version" v-if="getContractVersion(v.contract)">{{
            getContractVersion(v.contract)
          }}</span></span
        >
      </div>
      <div class="item-col" style="margin-bottom: 20px">
        <span class="label">Voted</span>
        <span class="value">{{ v.voted }}</span>
      </div>
      <div class="item-col">
        <span class="label">Bonded</span>
        <span class="value">{{ v.bound }}</span>
        <button @click="onShowDialog(v)">unBond</button>
      </div>
      <div class="item-col">
        <span class="label">Available</span>
        <span class="value">{{ v.available }}</span>
        <!-- <button @click="onShowWithdrawDialog(v)">Withdraw</button> -->
      </div>
    </div>
  </div>
  <Dialog
    @close="onCloseDialog"
    v-model="dialogTableVisible"
    v-if="!$store.state.global.isMobile"
    type="small"
  >
    <div class="dialog-content">
      <div class="input-body">
        <input type="number" placeholder="amount" v-model="inputUnbondAmount" /><span class="unit"
          >UART</span
        >
      </div>
      <div class="balance">{{ selectToken.bound }} UART</div>
      <button @click="unBond" v-loading="isUnbonding">UnBond</button>
      <div class="notice">
        Notice: <br />
        Unbonding uarts can not be used for NFT vote.
      </div>
    </div>
  </Dialog>
  <MobileConfirm @close="onCloseDialog" v-else v-model="dialogTableVisible">
    <div class="confirm-content">
      <div class="input-body">
        <input type="number" placeholder="amount" v-model="inputUnbondAmount" /><span class="unit"
          >UART</span
        >
      </div>
      <div class="balance">{{ selectToken.bound }} UART</div>
      <button @click="unBond" v-loading="isUnbonding">UnBond</button>
      <div class="notice">
        Notice: <br />
        Unbonding uarts can not be used for NFT vote.
      </div>
    </div>
  </MobileConfirm>

  <!-- <Dialog
    @close="onCloseWithdrawDialog"
    v-model="dialogWithdrawVisible"
    v-if="!$store.state.global.isMobile"
    type="small"
  >
    <div class="dialog-content">
      <div class="input-body">
        <input type="number" placeholder="amount" v-model="inputUnbondAmount" /><span class="unit"
          >UART</span
        >
      </div>
      <div class="balance">{{ selectToken.available || 0 }} UART</div>
      <button @click="unBond" v-loading="isUnbonding">Withdraw</button>
      <div class="notice">
        Notice: <br />
        Unbonded UARTs need to be withdraw from unbond history.
      </div>
    </div>
  </Dialog>
  <MobileConfirm @close="onCloseWithdrawDialog" v-else v-model="dialogWithdrawVisible">
    <div class="confirm-content">
      <div class="input-body">
        <input type="number" placeholder="amount" v-model="inputUnbondAmount" /><span class="unit"
          >UART</span
        >
      </div>
      <div class="balance">{{ selectToken.available || 0 }} UART</div>
      <button @click="unBond" v-loading="isUnbonding">Withdraw</button>
      <div class="notice">
        Notice: <br />
        Unbonded UARTs need to be withdraw from unbond history.
      </div>
    </div>
  </MobileConfirm> -->
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { BigNumber } from "@/plugins/bignumber";
import Config from "@/config";
import DappConfig from "@/config/dapp";
import http from "@/plugins/http";
import store from "@/store";
import VoteMining from "@/contracts/VoteMining";
import { notification } from "@/components/Notification";
import MobileConfirm from "@/components/MobileConfirm";
import Dialog from "@/components/Dialog";
export default defineComponent({
  name: "assets",
  components: {
    Dialog,
    MobileConfirm,
  },
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
            let token = DappConfig.config.tokens[v.token.toUpperCase()];
            token
              ? Config.DAPP_CONTRACTS[v.contract.toLowerCase()]?.contract
                  .getRedeemableBalance(connectedAccount.value, token.address)
                  .then((res) => {
                    res = new BigNumber(res);
                    if (!res.isZero()) {
                      v.available = res.shiftedBy(-token.decimals).toString();
                    }
                  })
              : "";
          });
          const uartToken = assetsList.value.find(
            (v) => v.token.toLowerCase() === DappConfig.config.tokens.UART.symbol.toLowerCase()
          );
          if (uartToken) {
            const bonedTotal = await Config.DAPP_CONTRACTS[
              uartToken.contract.toLowerCase()
            ]?.contract.getBondedBalance(connectedAccount.value);
            if (bonedTotal && !bonedTotal.isZero()) {
              uartToken.bound = bonedTotal
                .shiftedBy(-DappConfig.config.tokens.UART.decimals)
                .toString();
            }
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

    const getContractVersion = (address) => {
      let version = Config.DAPP_CONTRACTS[address.toLowerCase()]?.name || "";
      let index = version.search(/V\d$/);
      version = index >= 0 ? version.substr(index) : version;
      console.log(version);
      return DappConfig.config.contracts.VoteMining?.toLowerCase() !== address?.toLowerCase()
        ? version
        : "";
    };

    const getIcon = (tokenName) => {
      try {
        if (!tokenName) return;
        let token = store.state.global.setting?.tokens[tokenName.toUpperCase()];
        let icon = token && token.icon ? token.icon : "";
        return icon;
      } catch (err) {
        console.log(err);
      }
    };

    const isUnbonding = ref(false);
    const inputUnbondAmount = ref(null);
    const selectToken = ref({});
    const unBond = async () => {
      const amount = new BigNumber(inputUnbondAmount.value);
      if (amount.isNaN() || amount.isZero()) {
        notification.error("Invalid value");
        return;
      }
      if (amount.isNaN() || amount.lt(0)) {
        notification.error("Invalid amount");
        return;
      }
      isUnbonding.value = true;
      const notifyId = notification.loading("Please wait for the wallet's response");
      console.log(
        connectedAccount.value,
        new BigNumber(inputUnbondAmount.value)
          .shiftedBy(DappConfig.config?.tokens.UART.decimals)
          .toNumber()
      );
      VoteMining.unbond(
        connectedAccount.value,
        new BigNumber(inputUnbondAmount.value)
          .shiftedBy(DappConfig.config?.tokens.UART.decimals)
          .toNumber(),
        async (err, txHash) => {
          if (err) {
            console.log(err);
            throw err;
          }
          if (txHash) {
            console.log(txHash);
            isUnbonding.value = false;
            notification.dismiss(notifyId);
            notification.success(txHash);
            onCloseDialog();
          }
        }
      )
        .then(async (receipt) => {
          console.log("receipt: ", receipt);
        })
        .catch((err) => {
          console.log(err);
          isUnbonding.value = false;
          notification.dismiss(notifyId);
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };
    const onShowDialog = (item) => {
      dialogTableVisible.value = true;
      selectToken.value = item;
    };
    const onCloseDialog = () => {
      dialogTableVisible.value = false;
      inputUnbondAmount.value = null;
      selectToken.value = {};
    };
    // const onShowWithdrawDialog = (item) => {
    //   dialogWithdrawVisible.value = true;
    //   selectToken.value = item;
    // };
    // const onCloseWithdrawDialog = () => {
    //   dialogWithdrawVisible.value = false;
    //   inputUnbondAmount.value = null;
    //   selectToken.value = {};
    // };
    const dialogTableVisible = ref(false);
    // const bondedBalance = ref(0);
    // const getBondedBalance = async () => {
    //   bondedBalance.value = (await VoteMining.getBondedBalance(connectedAccount.value))
    //     .shiftedBy(-DappConfig.config?.tokens.UART.decimals)
    //     .toString();
    // };
    // const dialogWithdrawVisible = ref(false);
    // const availableBalance = ref(0);
    // const getAvailableBalance = async () => {
    //   availableBalance.value = (await VoteMining.getUnbondedBalance(connectedAccount.value))
    //     .shiftedBy(-DappConfig.config?.tokens.UART.decimals)
    //     .toString();
    // };

    onMounted(() => {
      // getBondedBalance();
      // getAvailableBalance();
    });

    return {
      assetsList,
      connectedAccount,

      getContractVersion,
      getIcon,

      unBond,
      dialogTableVisible,
      onShowDialog,
      onCloseDialog,
      isUnbonding,
      // dialogWithdrawVisible,
      // getBondedBalance,
      // bondedBalance,
      inputUnbondAmount,
      // availableBalance,
      // onShowWithdrawDialog,
      // onCloseWithdrawDialog,
      selectToken,
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
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
      }
      span.version {
        width: auto;
        font-size: 12px;
        background-color: #ffe500;
        border-radius: 16px;
        color: black;
        padding: 0px 12px;
        margin-left: 10px;
        margin-bottom: 1px;
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
      /* align-items: center; */
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
        .value span.version {
          width: auto;
          font-size: 12px;
          background-color: #ffe500;
          border-radius: 16px;
          color: black;
          padding: 1px 12px;
          margin-left: 10px;
          height: 14px;
          line-height: 12px;
        }
        .value {
          color: black;
          font-family: Montserrat-Light;
          font-size: 16px;
          display: block;
          width: 100%;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
    width: 373px;
    max-width: 100%;
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
    max-width: 100%;
    margin: 0 auto;
    margin-top: 21px;
  }
}
</style>
