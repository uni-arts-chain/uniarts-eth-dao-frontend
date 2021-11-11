/** * Created by Lay Hunt on 2021-09-09 22:08:39. */
<template>
  <div v-if="!$store.state.global.isMobile" class="auction container">
    <div class="left">
      <div class="title">{{ auction.name }}</div>
      <div class="desc-title">Artwork description</div>
      <div class="desc-content" v-html="auction.details"></div>
      <div class="more">More ></div>
      <div class="token-info">
        <div class="token">
          <span>Token Mint: </span>
          <span
            class="value"
            style="overflow: hidden; text-overflow: ellipsis; max-width: 150px; white-space: nowrap"
            >{{ formatNumber(auction.token_mint) }}</span
          >
          <span>UART</span>
        </div>
        <div class="bid">
          <span>{{
            `${Number(auction.auction_latest_price) ? "Current High Bid: " : "Current Price: "}  `
          }}</span>
          <span class="value">{{
            Number(auction.auction_latest_price)
              ? auction.auction_latest_price
              : auction.auction_min_bid
          }}</span>
          <span>{{ marketToken.symbol }}</span>
        </div>
        <div v-if="Number(auction.auction_fixed_price)" class="bid">
          <span>Fixed Price: </span>
          <span class="value">{{ auction.auction_fixed_price }}</span>
          <span>{{ marketToken.symbol }}</span>
        </div>
      </div>
      <div class="bid-history">
        <div class="bid-title">
          <span style="font-family: Montserrat-Bold">Bid History</span>
          <span>Total {{ auctionBids.length }} Bids</span>
        </div>
        <div class="button-group">
          <button :disabled="disabledAuction" @click="openMakeOfferDialog">Bid</button>
          <button
            v-if="Number(auction.auction_fixed_price)"
            :disabled="disabledAuction"
            @click="openByeDiaLog"
          >
            Collect Now
          </button>
          <button v-if="startEnd.startDate && startEnd.endDate && myOrder" @click="withdrawBid">
            Withdraw Bid
          </button>
          <span style="font-size: 14px; color: #666"
            >Your offer needs to be 10% higher than current price</span
          >
        </div>
        <div class="bid-list">
          <div v-for="item of auctionBids" :key="item.address" class="item">
            made an offer of {{ item.bid }} {{ marketToken.symbol }}
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="nft">
        <AdaptiveView :nft="auction" height="515px" width="520px" />
      </div>
      <div class="notice">
        <img src="@/assets/images/date-clock.png" />
        {{ getAuctionDateString }}
      </div>
    </div>
    <div class="right">
      <div class="back">
        <button @click="onBack">Back</button>
      </div>
      <div class="title">ABOUT ARTIST</div>
      <div class="avatar">
        <img v-if="auction.artist_avatar" :src="auction.artist_avatar" />
      </div>
      <div class="username">{{ auction.artist_name }}</div>
      <div class="user-desc" v-html="auction.artist_info"></div>
      <router-link :to="`/artist/${auction.artist_uid}`" class="more">More ></router-link>
    </div>
    <Dialog v-model="buyDialogVisible" type="small">
      <div class="dialog-content">
        <div v-if="buyApproving" class="input-body">
          <input :value="auction.auction_fixed_price" disabled placeholder="amount" type="number" />
          <span class="unit">{{ marketToken.symbol }}</span>
        </div>
        <div v-else class="approve-text">Please Approve contract before buy</div>
        <button v-if="!buyApproving" v-loading="isLoading" @click="approveLinkBuy">APPROVE</button>
        <button v-else v-loading="isLoading" @click="buyAuction">BUY</button>
      </div>
    </Dialog>
    <Dialog v-model="offerDialogVisible" type="small">
      <div class="dialog-content">
        <div v-if="bidApproving" class="input-body">
          <input v-model="bidAmount" placeholder="amount" type="number" />
          <span class="unit">{{ marketToken.symbol }}</span>
        </div>
        <div v-else class="approve-text">Please Approve contract before place bid</div>
        <button v-if="!bidApproving" v-loading="isLoading" @click="approveLinkBid">APPROVE</button>
        <button v-else v-loading="isLoading" @click="makeAnOffer">Bid</button>
      </div>
    </Dialog>
  </div>
  <div v-else class="auction container">
    <div class="center">
      <div class="nft">
        <AdaptiveView :nft="auction" height="290px" width="335px" />
      </div>
      <div class="notice">
        <img src="@/assets/images/date-clock.png" />
        {{ getAuctionDateString }}
      </div>
    </div>
    <div class="left">
      <div class="title">{{ auction.name }}</div>
      <div class="desc-content" v-html="auction.details"></div>
      <div class="more">More ></div>
      <div class="right">
        <div class="title">ABOUT ARTIST</div>
        <div class="avatar">
          <img v-if="auction.artist_avatar" :src="auction.artist_avatar" />
        </div>
        <div class="username">{{ auction.artist_name }}</div>
        <div class="user-desc" v-html="auction.artist_info"></div>
        <router-link :to="`/artist/${auction.artist_uid}`" class="more">More ></router-link>
      </div>
      <!--      <div class="number-votes">Number of votes obtained</div>-->
      <!--      <Progress :value="52" />-->
      <!--      <div class="number-vote-value">3000 of 45000</div>-->
      <div class="token-info">
        <div class="token">
          <span>Token Mint: </span>
          <span class="value">{{ formatNumber(auction.token_mint) }}</span>
          <span>UART</span>
        </div>
        <div class="bid">
          <span>{{
            `${Number(auction.auction_latest_price) ? "Current High Bid: " : "Current Price: "}  `
          }}</span>
          <span class="value">{{
            Number(auction.auction_latest_price)
              ? auction.auction_latest_price
              : auction.auction_min_bid
          }}</span>
          <span>{{ marketToken.symbol }}</span>
        </div>
        <div v-if="Number(auction.auction_fixed_price)" class="bid">
          <span>Fixed Price: </span>
          <span class="value">{{ auction.auction_fixed_price }}</span>
          <span>{{ marketToken.symbol }}</span>
        </div>
      </div>
      <div class="bid-history">
        <div class="button-group">
          <button :disabled="disabledAuction" @click="openMakeOfferDialog">Bid</button>
          <button
            v-if="Number(auction.auction_fixed_price)"
            :disabled="disabledAuction"
            @click="openByeDiaLog"
          >
            Collect Now
          </button>
          <button v-if="startEnd.startDate && startEnd.endDate" @click="withdrawBid">
            Withdraw Bid
          </button>
          <div style="font-size: 14px; color: #595757; margin-bottom: 30px">
            Your offer needs to be 10% higher than current price
          </div>
        </div>
        <div class="bid-title">
          <span>Bid History</span>
          <span>Total {{ auctionBids.length }} Bids</span>
        </div>
        Withdraw Bid

        <div class="bid-list">
          <div v-for="item of auctionBids" :key="item.address" class="item">
            made an offer of {{ item.bid }} {{ marketToken.symbol }}
          </div>
        </div>
      </div>
    </div>
    <Mobilecomfirm v-model="buyDialogVisible" type="small">
      <div class="dialog-content">
        <div v-if="buyApproving" class="input-body">
          <input :value="auction.auction_fixed_price" disabled placeholder="amount" type="number" />
          <span class="unit">{{ marketToken.symbol }}</span>
        </div>
        <div v-else class="approve-text">Please Approve contract before buy</div>
        <button v-if="!buyApproving" v-loading="isLoading" @click="approveLinkBuy">APPROVE</button>
        <button v-else v-loading="isLoading" @click="buyAuction">BUY</button>
      </div>
    </Mobilecomfirm>
    <Mobilecomfirm v-model="offerDialogVisible" type="small">
      <div class="dialog-content">
        <div v-if="bidApproving" class="input-body">
          <input v-model="bidAmount" placeholder="amount" type="number" />
          <span class="unit">{{ marketToken.symbol }}</span>
        </div>
        <div v-else class="approve-text">Please Approve contract before place bid</div>
        <button v-if="!bidApproving" v-loading="isLoading" @click="approveLinkBid">APPROVE</button>
        <button v-else v-loading="isLoading" @click="makeAnOffer">Bid</button>
      </div>
    </Mobilecomfirm>
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
// import Progress from "@/components/Progress";
import http from "@/plugins/http";
import Auction from "@/contracts/Auction";
import Dialog from "@/components/Dialog";
import AdaptiveView from "@/components/AdaptiveView";
import { DAPP_CONFIG } from "@/config";
import VoteMining from "@/contracts/VoteMining";
import { BigNumber } from "@/plugins/bignumber";
import { notification } from "@/components/Notification";
import Erc20 from "../../contracts/Erc20";
import { toBN } from "web3-utils";
import moment from "moment";
import Mobilecomfirm from "@/components/MobileConfirm";

export default defineComponent({
  name: "auction",
  components: {
    Mobilecomfirm,
    // Progress,
    AdaptiveView,
    Dialog,
  },
  setup() {
    const marketCurrency = "WETH";
    const marketToken = ref(DAPP_CONFIG.tokens[marketCurrency]);
    // TODO
    const bidAmount = ref(null);
    const router = useRouter();
    const route = useRoute();
    const auction = ref({});
    const auctionBids = ref([]);
    const offerDialogVisible = ref(false);
    const buyDialogVisible = ref(false);
    const isLoading = ref(false);
    const startEnd = reactive({});
    store.dispatch("global/SetNavText", "Auction");
    const bidApproving = ref(false);
    const buyApproving = ref(false);
    //检查权限
    const findApproveValue = async () => {
      const connectedAccount = store.state.user.info.address;
      const AuctionMiningAddress = auction.value.auction_contract;
      const token = marketToken.value;
      if (!token) return;
      const currentErc20 = new Erc20(token.address, token.symbol, token.decimals);
      // 检查拍卖出价链上权限
      try {
        const data = await currentErc20.allowance(connectedAccount, AuctionMiningAddress);
        if (data.toNumber() !== 0) {
          bidApproving.value = true;
          console.log("Authorized", data.toNumber());
        }
      } catch (e) {
        bidApproving.value = false;
      }
      // 检查买断授权
      try {
        const data = await currentErc20.allowance(connectedAccount, DAPP_CONFIG.contracts.Auction);
        if (data.toNumber() !== 0) {
          buyApproving.value = true;
          console.log("Authorized", data.toNumber());
        }
      } catch (e) {
        buyApproving.value = false;
      }
      console.log({
        bidApproving,
        buyApproving,
      });
    };
    // 链上授权buy
    const approveLinkBuy = async () => {
      isLoading.value = true;
      const notifyId = notification.loading("Please wait for the wallet's response");
      const connectedAccount = store.state.user.info.address;
      const AuctionMiningAddress = auction.value.auction_contract; // DAPP_CONFIG.contracts.Auction;
      const token = marketToken.value;
      const currentErc20 = new Erc20(token.address, token.symbol, token.decimals);
      try {
        // 授权
        const receipt = await currentErc20.approveMax(
          connectedAccount,
          AuctionMiningAddress,
          async (err, txHash) => {
            isLoading.value = false;
            if (err) {
              console.log(err);
              throw err;
            }
            if (txHash) {
              console.log(txHash);
              buyApproving.value = true;
              buyDialogVisible.value = false;
              offerDialogVisible.value = false;
              notification.dismiss(notifyId);
              notification.success(txHash);
            }
          }
        );
        console.log("receipt: ", receipt);
      } catch (err) {
        isLoading.value = false;
        buyApproving.value = false;
        notification.dismiss(notifyId);
        notification.error(
          err.message.split("{")[0] ||
            (err.head && err.head.msg) ||
            err.message ||
            (err.data && err.data.message)
        );
        throw err;
      }
    };
    // 链上授权bid
    const approveLinkBid = async () => {
      isLoading.value = true;
      const notifyId = notification.loading("Please wait for the wallet's response");
      const connectedAccount = store.state.user.info.address;
      const AuctionMiningAddress = auction.value.auction_contract; // DAPP_CONFIG.contracts.Auction;
      const token = marketToken.value;
      const currentErc20 = new Erc20(token.address, token.symbol, token.decimals);
      try {
        // 授权
        const receipt = await currentErc20.approveMax(
          connectedAccount,
          AuctionMiningAddress,
          async (err, txHash) => {
            isLoading.value = false;
            if (err) {
              console.log(err);
              throw err;
            }
            if (txHash) {
              console.log(txHash);
              bidApproving.value = true;
              buyDialogVisible.value = false;
              offerDialogVisible.value = false;
              notification.dismiss(notifyId);
              notification.success(txHash);
            }
          }
        );
        console.log("receipt: ", receipt);
      } catch (err) {
        isLoading.value = false;
        bidApproving.value = false;
        notification.dismiss(notifyId);
        notification.error(
          err.message.split("{")[0] ||
            (err.head && err.head.msg) ||
            err.message ||
            (err.data && err.data.message)
        );
        throw err;
      }
    };

    //一口价下单
    //拍卖出价
    const openMakeOfferDialog = async () => {
      if (store.state.user.info.address) {
        offerDialogVisible.value = true;
      } else {
        router.push("/login");
      }
    };
    const openByeDiaLog = async () => {
      if (store.state.user.info.address) {
        buyDialogVisible.value = true;
      } else {
        router.push("/login");
      }
    };
    // 检查出价格规范
    const filter = () => {
      console.log(Number(bidAmount.value));
      if (Number(bidAmount.value) <= Number(auction.value.auction_min_bid)) {
        isLoading.value = false;
        const message = `amount cannot be less than${Number(auction.value.auction_min_bid)}`;
        notification.error(message);
        throw new Error(message);
      }
      if (
        Number(auction.value.auction_latest_price) &&
        Number(bidAmount.value) >= Number(auction.value.auction_latest_price) * 2
      ) {
        isLoading.value = false;
        const message = "Cannot be greater than 2 times the current bid";
        notification.error(message);
        throw new Error(message);
      }
      if (
        Number(auction.value.auction_latest_price) &&
        Number(bidAmount.value) <= Number(auction.value.auction_latest_price) * 1.05
      ) {
        isLoading.value = false;
        const message = `amount cannot be less than${(
          Number(auction.value.auction_latest_price) * 1.05
        ).toFixed(3)}`;
        notification.error(message);
        throw new Error(message);
      }
    };
    const makeAnOffer = async () => {
      filter();
      isLoading.value = true;
      let notifyId = notification.loading("Offering");
      const token = marketToken.value;
      const amount = new BigNumber(bidAmount.value).shiftedBy(token.decimals).toNumber();
      console.log(auction.value.auction_match_id, auction.value.auction_token_index, amount);
      // 出价
      // todo 切换AuctionV2合约
      const auctionAddress = auction.value.auction_contract; // ||  await http.globalGetAuctionVersion({});
      console.log(auctionAddress);
      Auction.playerBid(
        auction.value.auction_match_id,
        auction.value.auction_token_index,
        toBN(amount),
        async (err, txHash) => {
          isLoading.value = false;
          if (err) {
            console.log(err);
            throw err;
          }
          if (txHash) {
            console.log(txHash);
            offerDialogVisible.value = false;
            notification.dismiss(notifyId);
            notification.success(txHash);
          }
        },
        auctionAddress
      )
        .then((res) => {
          notification.dismiss(notifyId);
          notification.success("Confirmed on Chain");
          isLoading.value = false;
          console.log(res);
        })
        .catch((err) => {
          isLoading.value = false;
          notification.dismiss(notifyId);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
        });
    };
    const buyAuction = async () => {
      isLoading.value = true;
      let notifyId = notification.loading("Loading Auction");
      Auction.playerFixedPrice(
        auction.value.auction_match_id,
        auction.value.auction_token_index,
        async (err, txHash) => {
          isLoading.value = false;
          if (err) {
            console.log(err.message);
            throw err;
          }
          if (txHash) {
            buyDialogVisible.value = false;
            console.log(txHash);
            notification.dismiss(notifyId);
            notification.success(txHash);
          }
        }
      )
        .then((res) => {
          isLoading.value = false;
          notification.dismiss(notifyId);
          notification.success("Confirmed on Chain");
          console.log();
          console.log(res);
        })
        .catch((err) => {
          isLoading.value = false;
          notification.dismiss(notification);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
        });
    };
    const myOrder = ref(null);
    const onBack = () => {
      router.back();
    };
    const now = ref(0);
    const dataMessage = ref("");
    const disabledAuction = ref(false);
    const getAuctionDate = async () => {
      if (!startEnd.startDate) {
        dataMessage.value = "Auction not started";
        disabledAuction.value = true;
      } else if (!startEnd.endDate) {
        const blockHeight = await Auction.dater.getDate(new moment());
        now.value =
          ((new Date() - startEnd.startDate) *
            (auction.value.auction_expiry_block - blockHeight.block)) /
          (blockHeight.block - auction.value.auction_open_block);
        console.log(now.value);
      } else {
        dataMessage.value = "Auction finished";
        disabledAuction.value = true;
      }
    };
    const getAuctionDateString = computed(() => {
      if (dataMessage.value) {
        return dataMessage;
      } else {
        let second = now.value / 1000;
        const day = Math.floor(second / (60 * 60 * 24));
        second = second % (60 * 60 * 24);
        const hour = Math.floor(second / (60 * 60));
        second = second % (60 * 60);
        const minute = Math.floor(second / 60);
        second = Math.floor(second % 60);
        return `${day} Days ${hour} Hour ${minute} Minute ${second} Second`;
      }
    });
    let interval = null;

    onMounted(async () => {
      const { id, id2 } = route.params;
      http.globalGetAuctionBidsById({ aid: id2 }, { id }).then((res) => {
        auctionBids.value = res.list;
        myOrder.value = (auctionBids.value || []).find((item) => item.is_mine);
      });
      const { list } = await http.globalGetAuctionById({ aid: id2 }, { id });
      auction.value = list && list.length > 0 ? list[0] : {};
      marketToken.value = DAPP_CONFIG.tokens[auction.value.biding_coin.toUpperCase()];
      if (auction.value.token_id) {
        await VoteMining.getMintRewards(DAPP_CONFIG.nfts.UniartsNFT.address, auction.value.token_id)
          .then((tokenMint) => {
            if (!new BigNumber(tokenMint).isZero()) {
              auction.value.token_mint = new BigNumber(tokenMint)
                .shiftedBy(-DAPP_CONFIG.tokens.UART.decimals)
                .toString();
            }
          })
          .catch((e) => {
            console.error(e);
          });
      }
      await findApproveValue();
      try {
        const { timestamp: startDate } = await Auction.dater.getBlockWrapper(
          auction.value.auction_open_block
        );
        startEnd.startDate = new Date(startDate * 1000);
      } catch (e) {
        console.log(e);
      }
      try {
        const { timestamp: endDate } = await Auction.dater.getBlockWrapper(
          auction.value.auction_expiry_block
        );
        startEnd.endDate = new Date(endDate * 1000);
      } catch (e) {
        console.log(e);
      }
      await getAuctionDate();
      interval = setInterval(() => (now.value -= 1000), 1000);
    });

    const formatNumber = (string) => {
      return new BigNumber(string || 0).toFixed(1, 1);
    };
    // 撤回投标
    const withdrawBid = () => {
      isLoading.value = true;
      let notifyId;
      Auction.playerWithdrawBid(
        auction.value.auction_match_id,
        auction.value.auction_token_index,
        async (err, txHash) => {
          if (err) {
            console.log(err.message);
            throw err;
          }
          if (txHash) {
            isLoading.value = false;
            buyDialogVisible.value = false;
            console.log(txHash);
            notification.dismiss(notifyId);
            notification.success(txHash);
          }
        },
        auction.value.auction_contract
      )
        .then((res) => {
          isLoading.value = false;
          notification.dismiss(notifyId);
          notification.success("Confirmed on Chain");
          console.log();
          console.log(res);
        })
        .catch((err) => {
          isLoading.value = false;
          notification.dismiss(notification);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
        });
    };

    onBeforeUnmount(() => {
      clearInterval(interval);
    });
    return {
      marketToken,
      marketCurrency,
      getAuctionDateString,
      getAuctionDate,
      isLoading,
      bidAmount,
      offerDialogVisible,
      auctionBids,
      auction,
      onBack,
      makeAnOffer,
      openMakeOfferDialog,
      openByeDiaLog,
      buyDialogVisible,
      buyAuction,
      disabledAuction,
      formatNumber,
      startEnd,
      withdrawBid,
      bidApproving,
      buyApproving,
      approveLinkBuy,
      approveLinkBid,
      myOrder,
    };
  },
});
</script>

<style lang="scss" scoped>
.auction {
  margin-top: 132px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 131px;

  .left {
    width: 309px;

    .title {
      width: 100%;
      font-size: 32px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      margin-bottom: 85px;
    }

    .desc-title {
      font-size: 14px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      margin-bottom: 14px;
    }

    .desc-content {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      color: #898989;
      line-height: 18px;
      margin-bottom: 17px;
    }

    .more {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
      margin-bottom: 47px;
    }

    .number-votes {
      font-size: 14px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      line-height: 31px;
      margin-bottom: 40px;
    }

    .number-vote-value {
      margin-top: 12px;
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: right;
      color: #595757;
      line-height: 20px;
    }

    .token-info {
      margin-top: 52px;

      .token,
      .bid {
        display: flex;
        align-items: flex-end;
        font-size: 15px;
        font-family: Montserrat-Regular;
        font-weight: 300;
        text-align: left;
        color: #595757;
        margin-bottom: 15px;
      }

      .value {
        font-size: 24px;
        margin: 0 10px;
        line-height: 22px;
      }
    }

    .bid-history {
      .bid-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        font-family: Montserrat-Regular;
        font-weight: 400;
        text-align: left;
        color: #000000;
        margin-top: 69px;
        margin-bottom: 20px;
      }

      .button-group {
        button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        button {
          cursor: pointer;
          width: 321px;
          height: 43px;
          font-size: 14px;
          font-weight: Normal;
          text-align: center;
          background: transparent;
          color: #595757;
          line-height: 16px;
          border: 2px solid #939393;
          margin-bottom: 19px;
        }
      }

      .bid-list {
        margin-top: 10px;

        .item {
          font-size: 12px;
          font-family: Montserrat-Regular;
          font-weight: 300;
          text-align: left;
          color: #595757;
          line-height: 27px;
        }
      }
    }
  }

  .center {
    width: 521px;

    .notice {
      padding-left: 20px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;

      img {
        margin-right: 18px;
      }
    }
  }

  .right {
    width: 280px;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 12px;
      font-family: Montserrat-Bold;
      font-weight: SemiBold;
      text-align: left;
      color: #231815;
      line-height: 24px;
      margin-bottom: 54px;
    }

    .avatar {
      width: 111px;
      height: 111px;
      border-radius: 50%;
      background-color: black;
      margin-bottom: 31px;
      overflow: hidden;

      img {
        width: 100%;
      }
    }

    .username {
      font-size: 18px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
      line-height: 24px;
      margin-bottom: 12px;
    }

    .user-desc {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: justifyLeft;
      color: #898989;
      line-height: 18px;
      margin-bottom: 22px;
    }

    .more {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
      line-height: 31px;
    }

    .back {
      text-align: right;
      margin-bottom: 29px;

      button {
        width: 116px;
        height: 36px;
        font-size: 14px;
        font-family: Montserrat-Regular;
        font-weight: 300;
        text-align: center;
        color: #231815;
        background: #c9caca;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 750px) {
  .auction {
    margin-top: 10px;
    flex-direction: column;
    padding-bottom: 70px;

    .center {
      width: 100%;

      .nft {
        width: 100%;

        img {
          width: 100%;
          height: 290px;
        }
      }

      .notice {
        margin-top: 10px;
        padding-left: 0;
        font-size: 14px;
      }
    }

    .left {
      width: 100%;

      > .title {
        width: 100%;
        margin-top: 40px;
        font-size: 22px;
        font-family: Montserrat-Medium;
        margin-bottom: 20px;
      }

      .desc-content {
        font-size: 15px;
        color: black;
      }

      .more {
        color: #aaa;
        font-size: 14px;
        margin-bottom: 60px;
      }

      .number-votes {
        font-size: 16px;
      }

      .number-vote-value {
        font-size: 15px;
      }

      .token {
        color: black;
      }

      .bid-history .button-group {
        margin-top: 69px;

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        button {
          width: 100%;
          height: 60px;
          font-size: 16px;
        }
      }

      .bid-history .bid-title {
        margin-top: 0;
        margin-bottom: 30px;
        font-size: 14px;
        font-family: Montserrat-Medium;
        font-weight: 600;
      }

      .bid-history .bid-list .item {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }

    .right {
      width: 100%;

      .title {
        font-size: 15px;
        font-family: Montserrat-Regular;
        text-align: center;
        margin-bottom: 40px;
      }

      .avatar {
        margin: 0 auto;
      }

      .username {
        text-align: center;
        font-size: 18px;
        margin-top: 20px;
      }

      .user-desc {
        font-size: 16px;
        line-height: 1.5;
        color: black;
      }

      .more {
        text-align: center;
        color: black;
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
      width: 80px;
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

  .approve-text {
    margin-bottom: 40px;
    font-size: 16px;
    text-align: center;
  }
}
</style>
