/** * Created by Lay Hunt on 2021-09-26 14:46:04. */
<template>
  <div class="votes">
    <div class="list" v-loading="isLoading">
      <div class="item-list">
        <div class="no-data" v-if="list.length == 0">No data</div>
        <div class="item" v-for="(v, i) in list" :key="i">
          <div class="nft">
            <AdaptiveView :isResponsive="true" :isPreview="true" :nft="v" />
          </div>
          <div class="nft-info">
            <div class="my-votes">
              <span class="value">My Votes : {{ v.mine }}</span>
              <div class="bar">
                <div
                  class="progress"
                  :style="`width: ${parseInt((v.mine / (v.group_mine || 1)) * 100)}%;`"
                ></div>
              </div>
              <span class="version" v-if="getContractVersion(v.vote_contract)">{{
                getContractVersion(v.vote_contract)
              }}</span>
            </div>
            <div class="vote-progress">
              <div class="bar"></div>
              <div
                class="vote-bar"
                :style="`width: ${parseInt((v.number / (v.total || 1)) * 100)}%`"
              ></div>
              <div class="total-per">Total: {{ v.total }}</div>
            </div>
            <div class="number-vote">Number of votes: {{ v.number }}</div>
          </div>
          <button class="vote-button" @click="onRetrieve(v)">Retrieve</button>
        </div>
      </div>
    </div>
    <div class="button-group" v-if="totalPage > 1">
      <button style="margin-right: 40px" @click="onPrev" :disabled="currentPage < 2">
        Previous
      </button>
      <button style="margin-left: 40px" @click="onNext" :disabled="currentPage >= totalPage">
        Next
      </button>
    </div>
    <Dialog
      v-model="dialogTableVisible"
      customClass="retrieve-dialog"
      v-if="!$store.state.global.isMobile"
      @close="onClose"
      type="small"
    >
      <div class="dialog-content">
        <div class="tab">
          <div class="tab-head" v-if="!getContractVersion(curNft.vote_contract)">
            <div class="tab-head-item" :class="{ active: dialogTab == 1 }" @click="dialogTab = 1">
              Retrieve to Wallet
            </div>
            <div class="tab-head-item" :class="{ active: dialogTab == 2 }" @click="dialogTab = 2">
              Retrieve to Bonded
            </div>
          </div>
          <div class="tab-head" v-else>
            <div
              class="tab-head-item"
              style="width: 100%; background-color: transparent; cursor: initial"
              :class="{ active: dialogTab == 1 }"
              @click="dialogTab = 1"
            >
              Retrieve to Wallet
            </div>
          </div>
          <div class="tab-content" v-if="dialogTab == 1">
            <div class="input-body">
              <input type="number" placeholder="amount" v-model="inputRetrieveAmount" />
              <el-dropdown trigger="click" @command="onItemClick">
                <span class="unit">
                  {{ currentToken.symbol }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item v-for="(v, i) in tokenList" :key="i" :command="v">{{
                      v.symbol
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="balance">
              available for retrieve: {{ availableVotedBalance || 0 }} {{ currentToken.symbol }}
            </div>
            <button @click="unStake" v-loading="isUnstaking">Retrieve</button>
          </div>
          <div class="tab-content" v-if="dialogTab == 2">
            <div class="input-body">
              <input type="number" placeholder="amount" v-model="inputUnbondAmount" /><span
                class="unit"
                >UART</span
              >
            </div>
            <div class="balance">
              available for retrieve: {{ availableBondedVotedBalance || 0 }} UART
            </div>
            <button @click="unVoteBonded" v-loading="isUnBonding">Retrieve</button>
          </div>
        </div>
      </div>
    </Dialog>
    <MobileConfirm v-else v-model="dialogTableVisible" customClass="retrieve-confirm">
      <div class="confirm-content">
        <div class="tab">
          <div class="tab-head" v-if="!getContractVersion(curNft.vote_contract)">
            <div class="tab-head-item" :class="{ active: dialogTab == 1 }" @click="dialogTab = 1">
              Retrieve to Wallet
            </div>
            <div class="tab-head-item" :class="{ active: dialogTab == 2 }" @click="dialogTab = 2">
              Retrieve to Bonded
            </div>
          </div>
          <div class="tab-head" v-else>
            <div
              class="tab-head-item"
              style="width: 100%; background-color: transparent; cursor: initial"
              :class="{ active: dialogTab == 1 }"
              @click="dialogTab = 1"
            >
              Retrieve to Wallet
            </div>
          </div>
          <div class="tab-content" v-if="dialogTab == 1">
            <div class="input-body">
              <input type="number" placeholder="amount" v-model="inputRetrieveAmount" />
              <el-dropdown trigger="click" @command="onItemClick">
                <span class="unit">
                  {{ currentToken.symbol }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item v-for="(v, i) in tokenList" :key="i" :command="v">{{
                      v.symbol
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="balance">
              available for retrieve: {{ availableVotedBalance || 0 }} {{ currentToken.symbol }}
            </div>
            <button @click="unStake" v-loading="isUnstaking">Retrieve</button>
          </div>
          <div class="tab-content" v-if="dialogTab == 2">
            <div class="input-body">
              <input type="number" placeholder="amount" v-model="inputUnbondAmount" /><span
                class="unit"
                >UART</span
              >
            </div>
            <div class="balance">
              available for retrieve: {{ availableBondedVotedBalance || 0 }} UART
            </div>
            <button @click="unVoteBonded" v-loading="isUnBonding">Retrieve</button>
          </div>
        </div>
      </div>
    </MobileConfirm>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, watch, computed } from "vue";
import http from "@/plugins/http";
import Dialog from "@/components/Dialog";
import AdaptiveView from "@/components/AdaptiveView";
import MobileConfirm from "@/components/MobileConfirm";
import { notification } from "@/components/Notification";
import { DAPP_CONTRACTS } from "@/config";
import DappConfig from "@/config/dapp";
import { Erc20 } from "@/contracts";
import { BigNumber } from "bignumber.js";
import store from "@/store";
export default defineComponent({
  name: "votes",
  components: {
    MobileConfirm,
    Dialog,
    AdaptiveView,
  },
  setup() {
    // TODO

    const list = ref([]);
    const currentPage = ref(1);
    const totalPage = ref(1);
    const perPage = ref(10);
    const totalCount = ref(0);
    const isLoading = ref(false);
    const onRequestData = () => {
      isLoading.value = true;
      http
        .userGetMyVotes({
          page: currentPage.value,
          per_page: perPage.value,
        })
        .then((res) => {
          isLoading.value = false;
          totalCount.value = res.total_count;
          totalPage.value = Math.ceil(totalCount.value / perPage.value);
          list.value = res.list;
        })
        .catch((err) => {
          isLoading.value = false;
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    onMounted(() => {
      onRequestData();
    });

    const connectedAccount = store.state.user.info.address;
    const tokenList = Object.values(DappConfig.config.voteTokens);
    let currentToken = reactive({});
    const availableVotedBalance = ref(0);
    tokenList.length > 0
      ? Object.keys(tokenList[0]).forEach((v) => (currentToken[v] = tokenList[0][v]))
      : null;
    const onItemClick = (token) => {
      currentToken.symbol = token.symbol;
      currentToken.address = token.address;
      currentToken.decimals = token.decimals;
    };

    const curNft = ref({});
    const getStakeVoted = async () => {
      const voteMiningContract =
        DAPP_CONTRACTS[curNft.value?.vote_contract?.toLowerCase()].contract;
      console.log(voteMiningContract);
      let votedBalance = await voteMiningContract.getAvailableBalance(
        connectedAccount,
        currentToken.address,
        DappConfig.config.nfts.UniartsNFT.address,
        curNft.value.token_id
      );
      availableVotedBalance.value = new BigNumber(votedBalance)
        .shiftedBy(-currentToken.decimals)
        .toString();
    };
    const availableBondedVotedBalance = ref(0);
    const getBondedVoted = async () => {
      const voteMiningContract =
        DAPP_CONTRACTS[curNft.value?.vote_contract?.toLowerCase()].contract;
      let votedBalance = await voteMiningContract.getUnvotableBalance(
        connectedAccount,
        DappConfig.config.nfts.UniartsNFT.address,
        curNft.value.token_id
      );
      availableBondedVotedBalance.value = new BigNumber(votedBalance)
        .shiftedBy(-DappConfig.config.tokens.UART.decimals)
        .toString();
    };

    const currentErc20 = computed(() => {
      return new Erc20(currentToken.address, currentToken.symbol, currentToken.decimals);
    });

    watch(currentErc20, () => {
      getStakeVoted();
    });

    const onRetrieve = (nft) => {
      curNft.value = nft;
      availableBondedVotedBalance.value = "0";
      availableVotedBalance.value = "0";
      getBondedVoted();
      getStakeVoted();
      dialogTableVisible.value = true;
    };
    const dialogTab = ref(1);
    const dialogTableVisible = ref(false);

    const inputRetrieveAmount = ref(null);
    const inputUnbondAmount = ref(null);

    const isUnstaking = ref(false);
    const unStake = async () => {
      const voteMiningContract =
        DAPP_CONTRACTS[curNft.value?.vote_contract?.toLowerCase()].contract;
      const amount = new BigNumber(inputRetrieveAmount.value);
      if (amount.isNaN() || amount.isZero()) {
        notification.error("Invalid value");
        return;
      }
      isUnstaking.value = true;
      const notifyId = notification.loading("Please wait for the wallet's response");
      console.log(
        connectedAccount,
        DappConfig.config.nfts.UniartsNFT.address,
        curNft.value.token_id,
        currentToken.address,
        amount.shiftedBy(currentToken.decimals)
      );
      voteMiningContract
        .unstake(
          connectedAccount,
          DappConfig.config.nfts.UniartsNFT.address,
          curNft.value.token_id,
          currentToken.address,
          amount.shiftedBy(currentToken.decimals),
          async (err, txHash) => {
            isUnstaking.value = false;
            if (err) {
              console.log(err);
              throw err;
            }
            if (txHash) {
              console.log(txHash);
              dialogTableVisible.value = false;
              inputRetrieveAmount.value = null;
              notification.dismiss(notifyId);
              notification.success(txHash);
            }
          }
        )
        .then(async (receipt) => {
          console.log("receipt: ", receipt);
        })
        .catch((err) => {
          console.log(err);
          isUnstaking.value = false;
          notification.dismiss(notifyId);
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    const isUnBonding = ref(false);
    const unVoteBonded = async () => {
      const voteMiningContract =
        DAPP_CONTRACTS[curNft.value?.vote_contract?.toLowerCase()].contract;
      const amount = new BigNumber(inputUnbondAmount.value);
      if (amount.isNaN() || amount.isZero()) {
        notification.error("Invalid value");
        return;
      }
      isUnBonding.value = true;
      const notifyId = notification.loading("Please wait for the wallet's response");
      console.log(
        connectedAccount,
        DappConfig.config.nfts.UniartsNFT.address,
        curNft.value.token_id,
        amount.shiftedBy(currentToken.decimals)
      );
      voteMiningContract
        .unvoteBonded(
          connectedAccount,
          DappConfig.config.nfts.UniartsNFT.address,
          curNft.value.token_id,
          amount.shiftedBy(currentToken.decimals),
          async (err, txHash) => {
            isUnBonding.value = false;
            if (err) {
              console.log(err);
              throw err;
            }
            if (txHash) {
              console.log(txHash);
              dialogTableVisible.value = false;
              inputUnbondAmount.value = null;
              notification.dismiss(notifyId);
              notification.success(txHash);
            }
          }
        )
        .then(async (receipt) => {
          console.log("receipt: ", receipt);
        })
        .catch((err) => {
          console.log(err);
          isUnBonding.value = false;
          notification.dismiss(notifyId);
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    const onClose = () => {
      inputRetrieveAmount.value = null;
      inputUnbondAmount.value = null;
    };

    const onPrev = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        onRequestData();
      }
    };
    const onNext = () => {
      if (currentPage.value < totalPage.value) {
        currentPage.value++;
        onRequestData();
      }
    };

    const getContractVersion = (address) => {
      let version = DAPP_CONTRACTS[address?.toLowerCase()]?.name || "";
      let index = version.search(/V\d$/);
      version = index ? version.substr(index) : version;
      return DappConfig.config.contracts.VoteMining !== address ? version : "";
    };

    return {
      list,
      onRetrieve,
      dialogTableVisible,
      dialogTab,

      currentToken,
      tokenList,

      onItemClick,

      inputRetrieveAmount,
      inputUnbondAmount,
      availableBondedVotedBalance,
      availableVotedBalance,

      curNft,
      unStake,
      unVoteBonded,
      isUnstaking,
      isUnBonding,

      onClose,
      totalCount,
      onPrev,
      onNext,
      totalPage,
      currentPage,
      isLoading,
      getContractVersion,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  min-height: 100px;
  .item {
    margin-bottom: 27px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nft-info {
    margin-left: 36px;
    width: 390px;
  }
  .nft {
    width: 130px;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .my-votes {
    display: flex;
    align-items: center;
    .value {
      font-size: 14px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      line-height: 31px;
      margin-right: 17px;
    }
    .bar {
      width: 98px;
      padding: 3px 5px;
      height: 26px;
      background: url(~@/assets/images/votes-bar@2x.png) no-repeat;
      background-size: 100% 100%;
    }
    .progress {
      background: #52c3dd;
      height: 18px;
      border-radius: 10px;
    }
    span.version {
      font-size: 12px;
      background-color: #ffe500;
      border-radius: 16px;
      color: black;
      padding: 3px 12px;
      margin-left: 15px;
      margin-bottom: 2px;
    }
  }
  .vote-progress {
    margin-top: 12px;
    position: relative;
    .bar {
      width: 100%;
      height: 26px;
      border-radius: 20px;
      background: #e6e6e6;
    }
    .vote-bar {
      position: absolute;
      top: 2px;
      height: 100%;
      width: 40%;
      background: url(~@/assets/images/vote-progress@2x.png) no-repeat;
      background-size: 390px 22px;
    }
    .current-per {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #ffffff;
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translateX(-120%);
    }
    .total-per {
      font-size: 12px;
      font-family: Montserrat-Regular;
      text-align: left;
      color: #595757;
      position: absolute;
      top: 5px;
      right: 1%;
    }
  }
  .number-vote {
    margin-top: 13px;
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #595757;
  }
  .vote-button {
    margin-left: 20px;
    width: 160px;
    height: 49px;
    font-size: 14px;
    font-family: Montserrat-Medium;
    font-weight: 600;
    text-align: center;
    color: #595757;
    line-height: 31px;
    cursor: pointer;
    border: 3px solid #ddd;
    background: transparent;
  }
}

.tab-head {
  display: flex;
  align-items: center;
  width: 100%;
  .tab-head-item {
    cursor: pointer;
    width: 50%;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    font-family: Montserrat-Medium;
    font-weight: 500;
    text-align: center;
    color: #898989;
    background-color: #e4e4e4;
    padding: 5px 20px;
  }
  .tab-head-item.active {
    color: #000000;
    background-color: #dad9d9;
  }
}

.button-group {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  button {
    border: 3px solid #ddd;
    background: transparent;
    width: 160px;
    height: 49px;
    font-size: 14px;
    font-family: Montserrat-Medium;
    font-weight: 600;
    text-align: center;
    color: #595757;
    cursor: pointer;
  }
  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.dialog-content {
  .tab-content {
    padding: 40px 100px 80px 100px;
  }
  .input-body {
    margin-top: 20px;
    display: flex;
    align-items: center;
    height: 50px;
    border: 1px solid #e3e4e5;
    input {
      height: 100%;
      width: calc(100% - 80px);
      outline: none;
      background-color: white;
      font-size: 17px;
      border: none;
      padding: 0 15px;
    }
    .unit {
      display: flex;
      align-items: center;
      font-size: 16px;
      background-color: transparent;
      font-family: Montserrat-Regular;
      font-weight: 300;
      color: #595757;
      width: 80px;
      cursor: pointer;
      margin-left: 16px;
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
}

.confirm-content {
  padding: 0;
  .tab-head .tab-head-item {
    font-size: 14px;
    padding-left: 0;
    padding-right: 0;
  }
  .tab-content {
    padding: 40px;
  }
  .input-body {
    margin-top: 20px;
    display: flex;
    align-items: center;
    height: 50px;
    border: 1px solid #e3e4e5;
    input {
      height: 100%;
      width: calc(100% - 80px);
      outline: none;
      background-color: white;
      font-size: 17px;
      border: none;
      padding: 0 15px;
    }
    .unit {
      display: flex;
      align-items: center;
      font-size: 16px;
      background-color: transparent;
      font-family: Montserrat-Regular;
      font-weight: 300;
      color: #595757;
      width: 80px;
      cursor: pointer;
      margin-left: 16px;
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

@media screen and (max-width: 750px) {
  .list .item-list {
    padding-top: 20px;
    padding-bottom: 50px;
    .item {
      flex-direction: column;
      margin-bottom: 50px;
      .nft {
        width: 100%;
        max-width: 320px;
        height: 320px;
      }
      .nft-info {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
        .number-vote {
          font-size: 15px;
        }
      }
      .vote-button {
        margin-top: 20px;
        width: 80%;
        margin-left: 0;
      }
    }
  }
  .list .vote-progress .vote-bar {
    background-size: 335px 22px;
  }
}
</style>
