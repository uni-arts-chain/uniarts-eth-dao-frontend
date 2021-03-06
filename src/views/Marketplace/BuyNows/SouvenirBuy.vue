/** * Created by Lay Hunt on 2021-09-09 22:08:39. */
<template>
  <div v-if="!$store.state.global.isMobile" class="auction container">
    <div class="left">
      <div class="title">{{ auction.souvenir_title }}</div>
      <div class="desc-title">Artwork description</div>
      <div class="desc-content" v-html="auction.souvenir_details"></div>
      <div class="more">More ></div>
      <div class="token-info">
        <div class="bid">
          <span> Price: </span>
          <span class="value">{{ auction.price }}</span>
          <span>{{ marketToken.symbol }}</span>
        </div>
      </div>
      <div class="bid-history">
        <div class="button-group">
          <button v-loading="isLoading" @click="buyNow">
            {{ isApproving ? "Collect Now" : "Approve" }}
          </button>
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
    </div>
    <div class="right">
      <div class="back">
        <button @click="onBack">Back</button>
      </div>
      <div class="title">ABOUT ARTIST</div>
      <div class="avatar">
        <img v-if="auction?.souvenir_artist_avatar" :src="auction?.souvenir_artist_avatar" />
      </div>
      <div class="username">{{ auction?.souvenir_artist_name }}</div>
      <div class="user-desc" v-html="auction?.souvenir_artist_info"></div>
      <router-link :to="`/artist/${auction?.souvenir_artist_uid}`" class="more">More ></router-link>
    </div>
  </div>
  <div v-else class="auction container">
    <div class="center">
      <div class="nft">
        <AdaptiveView :nft="auction.art ? auction.art : {}" height="340px" />
      </div>
    </div>
    <div class="left">
      <div class="title">{{ auction?.art?.name }}</div>
      <div class="desc-content" v-html="auction?.art?.details"></div>
      <div class="more">More ></div>
      <div class="right">
        <div class="title">ABOUT ARTIST</div>
        <div class="avatar">
          <img v-if="auction?.art?.artist_avatar" :src="auction?.art?.artist_avatar" />
        </div>
        <div class="username">{{ auction?.art?.artist_name }}</div>
        <div class="user-desc" v-html="auction?.art?.artist_info"></div>
        <router-link :to="`/artist/${auction?.art?.artist_uid}`" class="more">More ></router-link>
      </div>
      <div class="token-info">
        <div class="bid">
          <span>Price: &nbsp;&nbsp;</span>
          <span class="value">{{ auction.price }}</span>
          <span>{{ marketToken.symbol }}</span>
        </div>
      </div>
      <div class="bid-history">
        <div class="button-group">
          <button v-loading="isLoading" @click="buyNow">
            {{ isApproving ? "Collect Now" : "Approve" }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="order-item" v-for="(v, i) in orderList" :key="i">
      Price: {{ v.uint_price }} {{ v.coin }}
      <button>Cancel</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import http from "@/plugins/http";
import DappConfig from "@/config/dapp";
import Erc20 from "../../../contracts/Erc20";
import AdaptiveView from "@/components/AdaptiveView";
import { notification } from "@/components/Notification";
import TrustMarketplace from "@/contracts/TrustMarketplace";
import { BigNumber } from "@/plugins/bignumber";
import { toBN } from "web3-utils";
import { FormatRpcError } from "@/utils";
// import Dialog from "@/components/Dialog";
// import Mobilecomfirm from "@/components/MobileConfirm";

export default defineComponent({
  name: "auction",
  components: {
    AdaptiveView,
  },
  setup() {
    const marketCurrency = "WETH";
    const marketToken = ref(DappConfig.config.tokens[marketCurrency]);
    const isLoading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const auction = ref({});
    let isApproving = ref(false);
    let currentErc20 = null;
    const TrustMarketplaceMiningAddress = DappConfig.config.contracts.TrustMarketplace;
    store.dispatch("global/SetNavText", "Auction");
    const onBack = () => {
      router.back();
    };
    const { id } = route.params;
    onMounted(async () => {
      http.globalGetSouvenirById({}, { id }).then((res) => {
        console.log(res);
        auction.value = res;
        // marketToken.value = DappConfig.config.tokens[auction.value.biding_coin.toUpperCase()];
        const token = marketToken.value;
        const connectedAccount = store.state.user.info.address;
        currentErc20 = new Erc20(token.address, token.symbol, token.decimals);
        // 查看链上权限
        currentErc20
          .allowance(connectedAccount, TrustMarketplaceMiningAddress)
          .then((data) => {
            isApproving.value = data.toNumber() !== 0;
          })
          .catch(() => {
            isApproving.value = false;
          });
      });
      getSouvenirOrders();
    });
    const buyNow = async () => {
      if (!store.state.user.info.address) {
        return router.push("/login");
      }
      let bool;
      try {
        const res = await TrustMarketplace.orderByAssetId(
          auction.value.art.nft_contract,
          auction.value.art.token_id
        );
        bool = new BigNumber(res[0]).toNumber();
      } catch (e) {
        bool = false;
      }
      if (!bool) return notification.info("NFT Has Been Sold");
      let notifyId = null;
      isLoading.value = true;
      const connectedAccount = store.state.user.info.address;
      // 检查链上合约权限
      if (!isApproving.value) {
        // 给合约授权
        try {
          notifyId = notification.loading("Authorizing");
          const receipt = await currentErc20.approveMax(
            connectedAccount,
            TrustMarketplaceMiningAddress,
            async (err, txHash) => {
              if (err) {
                console.log(err);
                throw err;
              }
              if (txHash) {
                isLoading.value = true;
                console.log(txHash);
                notification.dismiss(notifyId);
                notification.success(txHash);
              }
            }
          );
          console.log("receipt: ", receipt);
        } catch (err) {
          isLoading.value = false;
          notification.dismiss(notifyId);
          let formatError = FormatRpcError(err);
          let result = formatError
            ? {
                data:
                  (formatError.message && formatError) ||
                  formatError?.data ||
                  formatError?.originalError,
              }
            : err;
          notification.error(
            (result.head && err.head.msg) || result.message || (result.data && result.data.message)
          );
          throw err;
        }
        notification.dismiss(notifyId);
      } else {
        // 购买nft
        isLoading.value = true;
        notifyId = notification.loading("Please wait for the wallet's response");
        const amount = toBN(
          new BigNumber(auction.value.price).shiftedBy(marketToken.value.decimals).toNumber()
        );
        await TrustMarketplace.safePlaceBid(
          auction.value.art.nft_contract,
          auction.value.art.token_id,
          amount,
          Number((new Date().getTime() / 1000 + 60 * 60 * 24 * 7).toFixed(0)),
          async (err, txHash) => {
            if (err) {
              console.log(err);
              throw err;
            }
            if (txHash) {
              console.log(txHash);
              notification.dismiss(notifyId);
              notification.success(txHash);
              notification.success("Purchasing");
            }
          }
        )
          .then((receipt) => {
            isLoading.value = false;
            notification.dismiss(notifyId);
            console.log("receipt: ", receipt);
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
            console.log(err);
          });
      }
    };

    const orderList = ref([]);
    const getSouvenirOrders = () => {
      http.globalGetSouvenirOrders({}, { id: id }).then((res) => {
        orderList.value = res.list;
      });
    };

    return {
      marketCurrency,
      marketToken,
      auction,
      onBack,
      buyNow,
      isApproving,
      isLoading,
      orderList,
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
