/** * Created by Lay Hunt on 2021-09-09 22:08:39. */
<template>
  <div v-if="!$store.state.global.isMobile" class="auction container">
    <div class="left">
      <div class="title">{{ auction.name }}</div>
      <div class="desc-title">Artwork description</div>
      <div class="desc-content">{{ auction.details || auction.artist_info }}</div>
      <div class="more">More ></div>
      <div class="number-votes">Number of votes obtained</div>
      <Progress
        :value="
          (
            new Number(auction.auction_latest_price) / new Number(auction.auction_fixed_price)
          ).toFixed(2)
        "
      />
      <div class="number-vote-value">
        {{ auction.auction_latest_price }} of {{ auction.auction_fixed_price }}
      </div>
      <div class="token-info">
        <div class="token">
          <span>Token mint:&nbsp;&nbsp;</span>
          <span class="value">{{ auction.auction_min_bid }}</span>
        </div>
        <div class="bid">
          <span>Current High Bid: &nbsp;&nbsp;</span>
          <span class="value">{{ auction.auction_latest_price }}</span
          >Tether
        </div>
      </div>
      <div class="bid-history">
        <div class="bid-title">
          <span style="font-family: Montserrat-Bold">Bid History</span>
          <span>Total {{ auctionBids.length }} Bids</span>
        </div>
        <div class="button-group">
          <button @click="dialogTableVisible = true">Make an Offer</button>
          <button>Collect Now</button>
        </div>
        <div class="bid-list">
          <div v-for="item of auctionBids" :key="item" class="item">
            @Bighead made an offer of 1500 USDC
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="nft">
        <img
          v-if="auction.property_url"
          :src="auction.property_url"
          style="width: 520px; height: 515px"
        />
      </div>
      <div class="notice">
        <img src="@/assets/images/date-clock.png" />
        6 Days 23 Hour 59 Minute 59 Second
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
      <div class="user-desc">{{ auction.artist_info }}</div>
      <router-link class="more" to="/artist/1">More ></router-link>
    </div>
    <Dialog v-model="dialogTableVisible" type="small">
      <div class="dialog-content">
        <div class="input-body">
          <input v-model="bidAmount" placeholder="amount" type="number" />
          <span class="unit">{{ auction.currency_code?.toUpperCase() }}</span>
        </div>
        <!--        <div class="balance">{{ auction.bondedBalance }} {{ auction.currency_code }}</div>-->
        <button v-loading="isLoading" @click="makeAnOffer">offer</button>
        <!--        <div class="notice">-->
        <!--          Notice: <br />-->
        <!--          Unbonding uarts can not be used for NFT vote.-->
        <!--        </div>-->
      </div>
    </Dialog>
  </div>
  <div v-else class="auction container">
    <div class="center">
      <div class="nft">
        <img
          src="https://ipfs.pixura.io/ipfs/QmbBmVPHkXQFcUHUw1ETKsq3m51iUjCNkJwop9L44uiAmV/FinalWithGradient.jpg"
        />
      </div>
      <div class="notice">
        <img src="@/assets/images/date-clock.png" />
        6 Days 23 Hour 59 Minute 59 Second
      </div>
    </div>
    <div class="left">
      <div class="title">NFT Name</div>
      <div class="desc-content">
        "Planet spirit" is an oil painting created by in 2010. After successful creation, it has
        aroused great repercussions and won great recognition in the circle, which also led to the
        introduction of the work, introduction...
      </div>
      <div class="more">More ></div>
      <div class="right">
        <div class="title">ABOUT ARTIST</div>
        <div class="avatar">
          <img src="https://avatars.githubusercontent.com/u/87279659?v=4" />
        </div>
        <div class="username">Kyle Bighead</div>
        <div class="user-desc">
          "Planet spirit" is an oil painting created by in 2010. After successful creation, it has
          aroused great repercussions and won great recognition in the circle, which also led to the
          introduction of the work, introduction...
        </div>
        <router-link class="more" to="/artist/1">More ></router-link>
      </div>
      <div class="number-votes">Number of votes obtained</div>
      <Progress :value="52" />
      <div class="number-vote-value">3000 of 45000</div>
      <div class="token-info">
        <div class="token">
          <span>Token mint:&nbsp;&nbsp;</span>
          <span class="value">251</span>Uink
        </div>
        <div class="bid">
          <span>Current High Bid: &nbsp;&nbsp;</span>
          <span class="value">1500</span>Tether
        </div>
      </div>
      <div class="bid-history">
        <div class="button-group">
          <button>Make an Offer</button>
          <button>Collect Now</button>
        </div>
        <div class="bid-title">
          <span>Bid History</span>
          <span>Total 4 Bids</span>
        </div>
        <div class="bid-list">
          <div class="item">@Bighead made an offer of 1500 USDC</div>
          <div class="item">@Smallhead made an offer of 1200 USDC</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import Progress from "@/components/Progress";
import http from "@/plugins/http";
import Auction from "@/contracts/Auction";
import Dialog from "@/components/Dialog";
import { DAPP_CONFIG } from "@/config";
import { BigNumber } from "@/plugins/bignumber";
import { notification } from "@/components/Notification";
import Erc20 from "../../contracts/Erc20";
import { toBN } from "web3-utils";

export default defineComponent({
  name: "auction",
  components: {
    Progress,
    Dialog,
  },
  setup() {
    // TODO
    const bidAmount = ref(null);
    const router = useRouter();
    const route = useRoute();
    const auction = ref({});
    const auctionBids = ref([]);
    const dialogTableVisible = ref(false);
    const isLoading = ref(false);
    const startEnd = reactive({});
    const isApproving = ref(false);
    store.dispatch("global/SetNavText", "Auction");
    const filter = () => {
      if (
        Number(bidAmount.value) <=
        Number(auction.value.auction_latest_price) + Number(auction.value.auction_min_bid)
      ) {
        isLoading.value = false;
        const message = `amount cannot be less than${
          Number(auction.value.auction_latest_price) + Number(auction.value.auction_min_bid)
        }`;
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
    };
    const makeAnOffer = async () => {
      filter();
      isLoading.value = true;
      const token = DAPP_CONFIG.tokens[auction.value.currency_code?.toUpperCase()];
      const amount = new BigNumber(bidAmount.value).shiftedBy(token.decimals);
      const connectedAccount = store.state.user.info.address;
      const AuctionMiningAddress = DAPP_CONFIG.contracts.Auction;
      console.log(connectedAccount, AuctionMiningAddress);
      const notifyId = notification.loading("Please wait for the wallet's response");
      console.log("初始化erc20", token);
      const currentErc20 = new Erc20(token.address, token.symbol, token.decimals);
      // 查看链上权限
      try {
        const data = await currentErc20.allowance(connectedAccount, AuctionMiningAddress);
        if (data.toNumber() !== 0) {
          isApproving.value = true;
          console.log("Authorized", data.toNumber());
        }
      } catch (e) {
        isApproving.value = false;
      }
      if (isApproving.value) {
        console.log(
          auction.value.auction_match_id,
          auction.value.auction_token_index,
          amount.toNumber()
        );
        // 出价
        Auction.playerBid(
          auction.value.auction_match_id,
          auction.value.auction_token_index,
          toBN(amount),
          async (err, txHash) => {
            if (err) {
              console.log(err);
              throw err;
            }
            if (txHash) {
              isLoading.value = true;
              console.log(txHash);
              dialogTableVisible.value = false;
              isApproving.value = false;
              notification.dismiss(notifyId);
              notification.success(txHash);
              router.go(0);
            }
          }
        )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            notification.error(error);
          });
      } else {
        try {
          // 授权
          const receipt = await currentErc20.approveMax(
            connectedAccount,
            AuctionMiningAddress,
            async (err, txHash) => {
              if (err) {
                console.log(err);
                throw err;
              }
              if (txHash) {
                isLoading.value = true;
                console.log(txHash);
                isApproving.value = false;
                notification.dismiss(notifyId);
                notification.success(txHash);
              }
            }
          );
          console.log("receipt: ", receipt);
          console.log(auction.value.auction_match_id, auction.value.auction_token_index, amount);
          this.makeAnOffer();
        } catch (err) {
          console.log(err);
          isApproving.value = false;
          notification.dismiss(notifyId);
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        }
      }
      isLoading.value = false;
      notification.dismiss(notifyId);
    };
    // const makeAnOffer = () => {
    //   isLoading.value = true;
    //   console.log(bidAmount);
    //   const nftId = auction;
    //   const token = DAPP_CONFIG.tokens[auction.value.currency_code?.toUpperCase()];
    //   const amount = new BigNumber(bidAmount.value).shiftedBy(token.decimals);
    //   Auction.playerBid(nftId, token.address, amount, (a, b) => {
    //     console.log(a, b);
    //   });
    // };
    const onBack = () => {
      router.back();
    };
    onMounted(() => {
      const { id } = route.params;
      http.globalGetAuctionById({}, { id }).then((res) => {
        console.log(res);
        auction.value = res.list[0] || {};
        Auction.dater.getBlockWrapper(auction.value.auction_open_block).then((res) => {
          console.log(res);
          startEnd.startDate = new Date(res.timestamp * 1000);
          console.log(startEnd);
        });
        Auction.dater.getBlockWrapper(auction.value.auction_expiry_block).then((res) => {
          startEnd.endDate = new Date(res.timestamp * 1000);
          console.log(startEnd);
        });
      });
      http.globalGetAuctionBidsById({}, { id }).then((res) => {
        console.log(res);
        auctionBids.value = res.list;
      });
    });
    return {
      isLoading,
      bidAmount,
      dialogTableVisible,
      auctionBids,
      auction,
      onBack,
      makeAnOffer,
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
</style>
