/** * Created by Lay Hunt on 2021-09-09 22:08:39. */
<template>
  <div class="vote-detail container">
    <div class="center">
      <div class="nft" v-loading="isLoading">
        <AdaptiveView :nft="artInfo" />
      </div>
      <div class="left">
        <div class="title">{{ artInfo.name }}</div>
        <div class="desc-content" v-html="artInfo.details"></div>
        <div class="more"></div>
      </div>
      <div class="right">
        <div class="user">
          <img class="avatar" :src="artInfo.artist_avatar ? artInfo.artist_avatar : Avatar" />
          <span class="username">{{ artInfo.artist_name }}</span>
        </div>
        <div class="user-desc" v-html="artInfo.artist_info"></div>
      </div>
      <div class="progress">
        <VoteProgress :value="votePercent" />
        <div class="progress-value">
          <span>Number of votes：{{ artInfo.number }}</span>
          <span>Total：{{ artInfo.total }}</span>
        </div>
      </div>

      <div class="vote-body">
        <div class="tabs">
          <div :class="{ active: curTab == 1 }" @click="curTab = 1">From Wallet</div>
          <div :class="{ active: curTab == 2 }" @click="curTab = 2">From Bonded</div>
        </div>
        <div class="form-body" v-if="curTab == 1">
          <div class="amount-input">
            <input type="number" v-model="stakeAmount" placeholder="Amount" />
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
          <button
            class="submit"
            :disabled="!hasStarted || hasFinished"
            v-if="isApproved"
            v-loading="isVoting"
            @click="onVote"
          >
            Stake & Vote
          </button>
          <button class="submit" v-else v-loading="isApproving" @click="onApprove">Approve</button>
          <div class="balance">
            <span>Wallet Balance</span>
            <span>{{ currentTokenBalance }} {{ currentToken.symbol }}</span>
          </div>
          <div class="notice">
            <span style="font-weight: 800; font-size: 16px; font-family: Montserrat-Medium"
              >Notice：</span
            >
            <br />
            1. Vote for NFT won’t cost any token, voted token can be retrieved at UTC 00:00 the next
            day. <br />
            2. Vote reward distributes at UTC 00:00 everyday during the voting period. <br />
            3. If NOT retrieved, voted token will be count as another vote for the same NFT. <br />
            4. 1 wETH vote = 100 UART vote. <br />
          </div>
          <div class="info">
            <div class="info-title">My Account</div>
            <div class="info-list">
              <div class="item">
                <span>- Voted</span>
                <span>{{ stakeTotal }} {{ currentToken.symbol }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-body" v-else>
          <div class="amount-input">
            <input type="number" v-model="bondAmount" placeholder="Amount" />
            <div class="unit">UART</div>
          </div>
          <button
            class="submit"
            :disabled="!hasStarted || hasFinished"
            v-loading="isBonding"
            @click="onBonded"
          >
            Vote with Bonded
          </button>
          <div class="balance">
            <span>Bonded Balance</span>
            <span>{{ bondedBalance }} UART</span>
          </div>
          <div class="notice">
            <span style="font-weight: 800; font-size: 16px; font-family: Montserrat-Medium"
              >Notice：</span
            >
            <br />
            1. Vote for NFT won’t cost any token, voted token can be retrieved at UTC 00:00 the next
            day. <br />
            2. Vote reward distributes at UTC 00:00 everyday during the voting period. <br />
            3. If NOT retrieved, voted token will be count as another vote for the same NFT. <br />
            4. 1 wETH vote = 100 UART vote. <br />
          </div>
          <div class="info">
            <div class="info-title">My Account</div>
            <div class="info-list">
              <div class="item">
                <span>- Voted</span>
                <span>{{ bondedTotal }} {{ currentToken.symbol }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { BigNumber } from "@/plugins/bignumber";
import VoteProgress from "@/components/Progress";
import { notification } from "@/components/Notification";
import http from "@/plugins/http";
import Avatar from "@/assets/images/avatar@2x.png";
import AdaptiveView from "@/components/AdaptiveView";
import { DAPP_CONFIG } from "@/config";
import store from "@/store";
import Erc20 from "@/contracts/Erc20";
import VoteMining from "@/contracts/VoteMining";
export default defineComponent({
  name: "vote-detail",
  components: {
    VoteProgress,
    AdaptiveView,
  },
  setup() {
    // TODO
    const route = useRoute();
    const router = useRouter();
    const curTab = ref(1);
    const isLoading = ref(false);
    let artInfo = reactive({});

    const onBack = () => {
      history.go(-1);
    };

    const tokenList = Object.values(DAPP_CONFIG.voteTokens);
    let currentToken = reactive({});
    tokenList.length > 0
      ? Object.keys(tokenList[0]).forEach((v) => (currentToken[v] = tokenList[0][v]))
      : null;
    const onItemClick = (token) => {
      currentToken.symbol = token.symbol;
      currentToken.address = token.address;
      currentToken.decimals = token.decimals;
    };

    const isApproving = ref(false);
    const currentTokenBalance = ref(0);
    const tokenAllowance = ref(0);
    const connectedAccount = store.state.user.info.address;
    const voteMiningAddress = DAPP_CONFIG.contracts.VoteMining;
    const getTokenAllowance = async () => {
      try {
        tokenAllowance.value = (
          await currentErc20.value.allowance(connectedAccount, voteMiningAddress)
        ).toNumber();
      } catch (err) {
        console.log(err);
      }
    };
    const getTokenBalance = async () => {
      currentTokenBalance.value = (await currentErc20.value.balanceOf(connectedAccount)).toString();
    };
    const isApproved = computed(() => {
      return new BigNumber(tokenAllowance.value).gte(9999999);
    });
    const currentErc20 = computed(() => {
      return new Erc20(currentToken.address, currentToken.symbol, currentToken.decimals);
    });
    watch(currentErc20, () => {
      getTokenBalance();
      getTokenAllowance();
      getStakeVoted();
    });
    const onApprove = () => {
      if (!connectedAccount) {
        router.push("/login");
        return;
      }
      isApproving.value = true;
      console.log(connectedAccount, voteMiningAddress);
      const notifyId = notification.loading("Please wait for the wallet's response");
      currentErc20.value
        .approveMax(connectedAccount, voteMiningAddress, async (err, txHash) => {
          if (err) {
            console.log(err);
            throw err;
          }
          if (txHash) {
            console.log(txHash);
            isApproving.value = false;
            notification.dismiss(notifyId);
            notification.success(txHash);
          }
        })
        .then(async (receipt) => {
          console.log("receipt: ", receipt);
          getTokenAllowance();
        })
        .catch((err) => {
          console.log(err);
          isApproving.value = false;
          notification.dismiss(notifyId);
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };
    onMounted(() => {
      getTokenAllowance();
      getTokenBalance();
    });

    const isVoting = ref(false);
    const stakeAmount = ref(null);
    const onVote = () => {
      const amount = new BigNumber(stakeAmount.value);
      if (amount.isNaN() || amount.isZero()) {
        notification.error("Invalid value");
        return;
      }
      isVoting.value = true;
      console.log(
        connectedAccount,
        DAPP_CONFIG.nfts.UniartsNFT.address,
        artInfo.token_id,
        currentToken.address
      );
      const notifyId = notification.loading("Please wait for the wallet's response");
      VoteMining.stake(
        connectedAccount,
        DAPP_CONFIG.nfts.UniartsNFT.address,
        artInfo.token_id,
        currentToken.address,
        amount.shiftedBy(currentToken.decimals),
        async (err, txHash) => {
          isVoting.value = false;
          if (err) {
            console.log(err);
            throw err;
          }
          if (txHash) {
            console.log(txHash);
            stakeAmount.value = null;
            notification.dismiss(notifyId);
            notification.success(txHash);
          }
        }
      )
        .then(async (receipt) => {
          console.log("receipt: ", receipt);
          getTokenAllowance();
        })
        .catch((err) => {
          console.log(err);
          isVoting.value = false;
          notification.dismiss(notifyId);
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    const stakeTotal = ref(0);
    const bondedTotal = ref(0);
    const getStakeVoted = async () => {
      let votedBalance = await VoteMining.getBalances(
        connectedAccount,
        currentToken.address,
        artInfo.token_id
      );
      stakeTotal.value = new BigNumber(votedBalance.available)
        .plus(votedBalance.freezed)
        .shiftedBy(-currentToken.decimals)
        .toString();
    };
    const getBondedVoted = async () => {
      let votedBalance = await VoteMining.getVotedBalances(connectedAccount, artInfo.token_id);
      bondedTotal.value = new BigNumber(votedBalance.available)
        .plus(votedBalance.freezed)
        .shiftedBy(-currentToken.decimals)
        .toString();
    };

    const votePercent = computed(() => {
      return new BigNumber(artInfo.number || 0)
        .div(artInfo.total || 1)
        .times(100)
        .toFixed(2, 1);
    });

    const init = () => {
      getStakeVoted();
      getBondedVoted();
    };
    const hasStarted = ref(false);
    const voteHasStarted = () => {
      let now = new Date().getTime();
      hasStarted.value = now >= artInfo.start_at * 1000 && now <= artInfo.end_at * 1000;
      // voteTime.value = new BigNumber(await VoteMining.getGroupStartTime(nftId)).toNumber();
    };
    const hasFinished = ref(true);
    const voteHasFinished = () => {
      hasFinished.value = new Date().getTime() > artInfo.end_at * 1000;
      // hasFinished.value = await VoteMining.getGroupHasFinished(nftId);
    };

    const artId = route.params.id;
    const requestData = () => {
      isLoading.value = true;
      http
        .globalGetArtDetail(
          {},
          {
            id: artId,
          }
        )
        .then((res) => {
          Object.keys(res).forEach((key) => (artInfo[key] = res[key]));
          isLoading.value = false;
          init();
          voteHasFinished();
          voteHasStarted();
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          notification.error(err.head ? err.head.msg : err.message);
        });
    };

    const isBonding = ref(false);
    const bondAmount = ref(null);
    const onBonded = () => {
      const amount = new BigNumber(bondAmount.value);
      if (amount.isNaN() || amount.isZero()) {
        notification.error("Invalid value");
        return;
      }
      isBonding.value = true;
      console.log(connectedAccount, voteMiningAddress);
      const notifyId = notification.loading("Please wait for the wallet's response");
      VoteMining.voteBonded(
        connectedAccount,
        DAPP_CONFIG.nfts.UniartsNFT.address,
        artInfo.token_id,
        amount.shiftedBy(currentToken.decimals),
        async (err, txHash) => {
          isBonding.value = false;
          if (err) {
            console.log(err);
            throw err;
          }
          if (txHash) {
            console.log(txHash);
            bondAmount.value = null;
            notification.dismiss(notifyId);
            notification.success(txHash);
          }
        }
      )
        .then(async (receipt) => {
          console.log("receipt: ", receipt);
          getTokenAllowance();
        })
        .catch((err) => {
          console.log(err);
          isBonding.value = false;
          notification.dismiss(notifyId);
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    const bondedBalance = ref(0);
    const getBondedBalance = async () => {
      bondedBalance.value = (await VoteMining.getBondedBalance(connectedAccount))
        .shiftedBy(-DAPP_CONFIG.tokens.UART.decimals)
        .toFixed(8, 1);
    };

    onMounted(() => {
      requestData();
    });

    watch(curTab, (value) => {
      console.log(value);
      onItemClick(DAPP_CONFIG.tokens.UART);
      if (value == 1) {
        getTokenBalance();
      } else {
        getBondedBalance();
      }
    });

    return {
      Avatar,
      isLoading,

      artInfo,
      curTab,
      onBack,

      tokenList,

      onItemClick,
      currentToken,
      isApproving,
      onApprove,
      isApproved,
      tokenAllowance,
      currentTokenBalance,

      onVote,
      stakeAmount,
      isVoting,
      stakeTotal,
      bondedTotal,

      votePercent,

      onBonded,
      isBonding,
      bondedBalance,
      bondAmount,

      hasStarted,
      hasFinished,
    };
  },
});
</script>

<style lang="scss" scoped>
.vote-detail.container {
  padding-top: 20px;
}
.vote-detail {
  padding-top: 132px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 61px;
  .left {
    margin-top: 40px;
    .title {
      width: 100%;
      font-size: 23px;
      font-family: Montserrat-Bold;

      text-align: left;
      color: #000000;
      margin-bottom: 15px;
    }
    .desc-title {
      font-size: 15px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      margin-bottom: 14px;
    }
    .desc-content {
      font-size: 15px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      min-height: 50px;
      color: #898989;
      line-height: 18px;
      margin-bottom: 17px;
    }
    .more {
      min-height: 30px;
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
    }
  }
  .center {
    width: 100%;
    .nft {
      width: 100%;
      height: 350px;
    }
    .progress {
      padding-top: 33px;
      margin-bottom: 61px;
    }
    .progress-value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 9px;
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #595757;
    }
    .vote-body {
      width: 100%;
      background-color: #efeff0;
      border-radius: 8px;
      overflow: hidden;
      .tabs {
        display: flex;
        > div {
          cursor: pointer;
          width: 50%;
          height: 63px;
          opacity: 0.2;
          font-size: 20px;
          font-family: Montserrat-Regular;
          font-weight: 400;
          text-align: center;
          color: #000000;
          line-height: 63px;
          background: linear-gradient(to bottom, #eeeeef, #dedfdf);
        }
        > div.active {
          opacity: 1;
        }
      }
      .form-body {
        padding: 21px;
        .amount-input {
          display: flex;
          align-items: center;
          margin-bottom: 26px;
          input {
            width: 389px;
            height: 44px;
            font-size: 14px;
            font-family: Montserrat-Regular;
            font-weight: 300;
            text-align: left;
            color: black;
            padding: 0 20px;
            border: 2px solid #ccc;
          }
          .unit {
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: Montserrat-Regular;
            font-weight: 300;
            color: #595757;
            margin-left: 16px;
          }
        }
        .submit[disabled] {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .submit {
          display: block;
          margin: 0 auto;
          font-size: 18px;
          font-family: Montserrat-Regular;
          font-weight: 400;
          text-align: center;
          color: #ffffff;
          line-height: 45px;
          width: 100%;
          height: 45px;
          cursor: pointer;
          background: black;
          border-radius: 30px;
          margin-bottom: 0px;
          overflow: hidden;
        }
        .balance {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-family: Montserrat-Regular;
          font-weight: 300;
          text-align: left;
          color: #595757;
          padding: 20px 0;
        }
      }
      .notice {
        background: #dcdddd;
        border-radius: 11px;
        padding: 21px 16px;
        font-size: 14px;
        font-family: Montserrat-Regular;
        font-weight: 400;
        text-align: left;
        color: black;
        line-height: 24px;
      }
      .info {
        margin-top: 27px;
        .info-title {
          font-size: 16px;
          font-family: Montserrat-Medium;
          font-weight: 400;
          text-align: left;
          color: #000000;
          line-height: 56px;
        }
        .info-list {
          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 15px;
            font-family: Montserrat-Regular;
            font-weight: 300;
            text-align: left;
            color: black;
            line-height: 24px;
          }
          .end {
            margin-top: 35px;
            margin-bottom: 38px;
          }
        }
      }
    }
  }
  .right {
    width: 100%;
    display: flex;
    flex-direction: column;
    .user {
      display: flex;
      align-items: center;
      margin-bottom: 31px;
    }
    .avatar {
      border-radius: 50%;
      width: 60px;
      height: 60px;
      box-shadow: 3px 4px 9px 0px rgba(34, 24, 20, 0.52);
    }
    .username {
      margin-left: 14px;
      font-size: 19px;
      font-family: Montserrat-Medium;
      font-weight: 300;
      text-align: right;
      color: #231815;
    }
    .user-desc {
      min-height: 50px;
      font-size: 16px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      color: #898989;
      line-height: 18px;
    }
  }
}
</style>
