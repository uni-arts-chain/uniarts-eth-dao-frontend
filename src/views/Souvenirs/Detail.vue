/** * Created by Lay Hunt on 2021-09-09 22:08:39. */
<template>
  <div class="detail">
    <div class="head">
      <span>{{ souvenir.souvenir_title }}</span>
      <button @click="$router.back()">Back</button>
    </div>
    <div class="keepsake">
      <AdaptiveView height="400px" :nft="souvenir" />
    </div>
    <div class="info">
      <div class="info-item">
        <div class="title"><span>Description</span></div>
        <div class="message">{{ souvenir.artist_info }}</div>
      </div>
      <div class="info-item">
        <div class="title"><span>Properties</span></div>
        <div class="properties">
          <div class="properties-item">
            <div class="artist">ARTIST</div>
            <div class="describe">{{ souvenir.artist_name }}</div>
            <div class="trait"><span class="number">33%</span> have this trait</div>
          </div>
          <div class="properties-item">
            <div class="artist">ARTWORK</div>
            <div class="describe">{{ souvenir.souvenir_artist_name }}</div>
            <div class="trait"><span class="number">33%</span> have this trait</div>
          </div>
        </div>
      </div>
      <div class="info-item">
        <div class="title"><span>Details</span></div>
        <div class="details">
          <div class="details-item">
            <div class="key">Contract Address</div>
            <div class="value">{{ souvenir.nft_contract?.toUpperCase() }}</div>
          </div>
          <div class="details-item">
            <div class="key">Token ID</div>
            <div class="value">{{ souvenir.token_id }}</div>
          </div>
          <div class="details-item">
            <div class="key">Token Standard</div>
            <div class="value">{{ souvenir.token_standard }}</div>
          </div>
          <div class="details-item">
            <div class="key">Blockchain</div>
            <div class="value">{{ souvenir.souvenir_blockchain }}</div>
          </div>
        </div>
      </div>
      <div class="info-item" v-if="souvenirOrderList.length > 0">
        <div class="title"><span>Order Status</span></div>
        <div class="details">
          <div class="order-item" v-for="(v, i) in souvenirOrderList" :key="i">
            <div class="order-info" v-if="v.order_type == 'auction_order'">
              <span style="width: 130px">Timed Auction</span>
              <span>Price: {{ v.latest_price }} {{ v.order_coin }}</span>
            </div>
            <div class="order-info" v-if="v.order_type == 'buy_now_order'">
              <span style="width: 130px">BuyNow</span>
              <span>Price: {{ v.latest_price }} {{ v.order_coin }}</span>
            </div>
            <div class="order-operate">
              <button
                :disabled="!v.can_cancel_order"
                v-if="v.can_cancel_order && v.order_type == 'auction_order'"
                @click="onCancelAuctionClick(v)"
              >
                Cancel
              </button>
              <button
                :disabled="!v.can_cancel_order"
                v-if="v.can_cancel_order && v.order_type == 'buy_now_order'"
                @click="onCancelBuyNowClick(v)"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-if="!$store.state.global.isMobile" v-model="cancelOrderDialog" type="small">
    <div class="dialog-content">
      <div class="dialog-title">Are you sure to cancel the order?</div>
      <button v-loading="loading" @click="onCancelBuyNowOrder">Confirm</button>
    </div>
  </Dialog>
  <MobileConfirm v-else v-model="cancelOrderDialog" type="small">
    <div class="dialog-content">
      <div class="dialog-title" style="margin-top: 40px">Are you sure to cancel the order?</div>
      <button v-loading="loading" @click="onCancelBuyNowOrder">Confirm</button>
    </div>
  </MobileConfirm>
  <Dialog v-if="!$store.state.global.isMobile" v-model="cancelAuctionDialog" type="small">
    <div class="dialog-content">
      <div class="dialog-title">Are you sure to cancel the auction?</div>
      <button v-loading="loading" @click="onCancelAuctionOrder">Confirm</button>
    </div>
  </Dialog>
  <MobileConfirm v-else v-model="cancelAuctionDialog" type="small">
    <div class="dialog-content">
      <div class="dialog-title" style="margin-top: 40px">Are you sure to cancel the auction?</div>
      <button v-loading="loading" @click="onCancelAuctionOrder">Confirm</button>
    </div>
  </MobileConfirm>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AdaptiveView from "@/components/AdaptiveView";
import Dialog from "@/components/Dialog";
import MobileConfirm from "@/components/MobileConfirm";
import { notification } from "@/components/Notification";
import MultiTokenTrustMarketplace from "@/contracts/MultiTokenTrustMarketplace";
import MultiTokenAuction from "@/contracts/MultiTokenAuction";
import http from "@/plugins/http";
import store from "@/store";
import copy from "clipboard-copy";

export default defineComponent({
  name: "Detail",
  components: {
    AdaptiveView,
    MobileConfirm,
    Dialog,
  },
  setup() {
    const onCopy = (v) => copy(v);
    const route = useRoute();
    const souvenir = ref({});
    const souvenirOrderList = ref({});
    const initKeepsakeData = async () => {
      const { id } = route.params;
      souvenir.value = await http.globalGetSouvenirById({}, { id });
      console.log(souvenir.value);
      if (store.state.user.info.address) {
        souvenirOrderList.value = (await http.userGetSouvenirsStatus({}))?.list || [];
      }
    };
    onMounted(() => {
      initKeepsakeData();
    });

    const loading = ref(false);

    const myNotificationErr = (err) =>
      notification.error(
        err.message.split("{")[0] ||
          (err.head && err.head.msg) ||
          err.message ||
          (err.data && err.data.message)
      );

    const cancelOrderDialog = ref(false);
    const cancelAuctionDialog = ref(false);
    const cancelSouvenir = ref({});

    // 取消BuyNow订单
    const onCancelBuyNowClick = (souvenir) => {
      cancelOrderDialog.value = true;
      cancelSouvenir.value = souvenir;
    };

    // 取消BuyNow订单合约交互
    const onCancelBuyNowOrder = async () => {
      loading.value = true;
      let notifyId = notification.loading("Waiting for wallet response");
      console.log(souvenir.value.souvenir_nft_contract, cancelSouvenir.value.order_id);
      try {
        await MultiTokenTrustMarketplace.cancelOrder(
          souvenir.value.souvenir_nft_contract,
          cancelSouvenir.value.order_id,
          (err, txHash) => {
            notification.dismiss(notifyId);
            if (err) {
              console.log(err);
              loading.value = false;
              myNotificationErr(err);
              throw err;
            } else if (txHash) {
              console.log(txHash);
              loading.value = false;
              notification.success(txHash);
              notifyId = notification.loading("Waiting for confirmation on the chain");
              cancelOrderDialog.value = false;
              initKeepsakeData();
            }
          }
        );
        notification.success("Success");
      } catch (err) {
        loading.value = false;
        myNotificationErr(err);
      } finally {
        notification.dismiss(notifyId);
      }
    };

    // 取消BuyNow订单
    const onCancelAuctionClick = (souvenir) => {
      cancelAuctionDialog.value = true;
      cancelSouvenir.value = souvenir;
    };

    // 取消Auction订单合约交互
    const onCancelAuctionOrder = async () => {
      loading.value = true;
      let notifyId = notification.loading("Waiting for wallet response");
      try {
        await MultiTokenAuction.creatorWithdrawNftBatch(
          cancelSouvenir.value.contract,
          cancelSouvenir.value.order_id,
          (err, txHash) => {
            notification.dismiss(notifyId);
            if (err) {
              console.log(err);
              loading.value = false;
              myNotificationErr(err);
              throw err;
            } else if (txHash) {
              console.log(txHash);
              loading.value = false;
              notification.success(txHash);
              notifyId = notification.loading("Waiting for confirmation on the chain");
              cancelAuctionDialog.value = false;
              initKeepsakeData();
            }
          }
        );
        notification.success("Success");
      } catch (err) {
        loading.value = false;
        myNotificationErr(err);
      } finally {
        notification.dismiss(notifyId);
      }
    };

    return {
      onCopy,
      souvenir,
      souvenirOrderList,

      onCancelBuyNowOrder,
      onCancelAuctionOrder,
      onCancelBuyNowClick,
      onCancelAuctionClick,
      cancelOrderDialog,
      cancelAuctionDialog,
    };
  },
});
</script>
<style lang="scss" scoped>
.detail {
  width: 972px;
  margin: 0 auto;
  padding-top: 130px;
  padding-bottom: 184px;

  .head {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 32px;
      font-weight: 500;
      text-align: left;
      color: #000000;
      line-height: 56px;
    }

    button {
      width: 116px;
      height: 36px;
      background: #c9caca;
      border-radius: 6px;
      cursor: pointer;
    }
  }

  .keepsake {
    margin-top: 31px;
    width: 100%;
  }

  .info {
    margin-top: 83px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .info-item {
      margin-bottom: 33px;

      .title {
        height: 40px;
        color: black;
        font-size: 28px;
        text-align: left;
        font-weight: 600;
        margin-bottom: 33px;
      }

      .message {
        height: 30px;
        color: black;
        font-size: 20px;
        text-align: left;
        font-weight: 400;
      }

      .properties {
        display: flex;
        flex-direction: row;

        .properties-item {
          margin-right: 33px;
          width: 243px;
          height: 112px;
          line-height: 35px;
          border-radius: 5px;
          background-color: white;
          text-align: center;
          border: 3px solid black;
          display: flex;
          flex-direction: column;

          .artist {
            color: #1a13caff;
            font-size: 18px;
          }

          .describe {
            color: black;
            font-weight: 500;
            font-size: 18px;
          }

          .trait {
            color: #909399;
            font-size: 18px;

            .number {
              color: #037dd6ff;
            }
          }
        }
      }

      .details {
        display: flex;
        flex-direction: column;

        .details-item {
          display: flex;
          flex-direction: row;
          line-height: 40px;
          color: black;
          font-size: 20px;
          text-align: left;

          .key {
            flex: 1;
          }

          .value {
            flex: 2;
          }
        }

        .order-item {
          border: 2px solid black;
          padding: 10px;
          height: 60px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .order-info {
          display: flex;
          span {
            margin: 0 10px;
            display: block;
          }
        }
        .order-operate {
          button {
            margin: 0 10px;
            background-color: black;
            border-radius: 6px;
            color: white;
            padding: 10px 0;
            width: 100px;
            cursor: pointer;
          }
          button:disabled {
            cursor: not-allowed;
            opacity: 0.4;
          }
        }
      }
    }
  }
}

.dialog-content {
  .list-select {
    //font-size: 18px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
    cursor: pointer;

    :first-child {
      border-top-left-radius: 10px;
    }

    :last-child {
      border-top-right-radius: 10px;
    }

    .list-item {
      padding-top: 10px;
      padding-bottom: 10px;
      flex: 1;
      text-align: center;
      background-color: #fff;
      cursor: pointer;
    }

    .select-item {
      background-color: #d0d0d0;
      color: #000;
    }
  }

  .block-height {
    text-align: right;
    margin-top: 20px;
  }

  .dialog-title {
    font-size: 19px;
    text-align: center;
    margin-bottom: 50px;
  }

  .form-body {
    margin-top: 40px;
  }

  .input-body {
    margin-top: 20px;
    display: flex;
    align-items: center;
    height: 50px;
    border: 1px solid #e3e4e5;

    > input {
      height: 100%;
      width: calc(100% - 180px);
      outline: none;
      background-color: white;
      font-size: 17px;
      border: none;
      padding: 0 15px;
    }

    .unit-input {
      height: 100%;
      width: calc(100% - 280px);
      outline: none;
      background-color: white;
      font-size: 17px;
      border: none;
      padding: 0 15px;
    }

    .unit {
      width: 180px;
      font-size: 14px;
      background-color: white;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: center;
      color: #000000;
      line-height: 48px;
      padding: 0 10px;
      border-right: 1px solid #e3e4e5;
      border-left: 1px solid #e3e4e5;
    }

    .unit2 {
      height: 100%;
      width: 100px;
    }

    :deep .el-dropdown {
      height: 100%;
    }

    .token-unit {
      display: block;
      width: 100px;
      font-size: 14px;
      background-color: white;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: center;
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

@media screen and (max-width: 750px) {
  .dialog-content .input-body span.unit {
    width: 100px;
  }
  .dialog-content .list-form-body .input-body > input {
    width: calc(100% - 100px);
  }
}
</style>
