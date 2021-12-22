/** * Created by Lay Hunt on 2021-09-09 22:08:39. */
<template>
  <div class="detail">
    <div class="head" v-if="!$store.state.global.isMobile">
      <span>{{ souvenir.souvenir_title }}</span>
      <button @click="$router.back()">Back</button>
    </div>
    <div class="head" v-else>
      <button style="background: transparent; width: auto" @click="$router.back()">
        &lt; Back
      </button>
      <span>{{ souvenir.souvenir_title }}</span>
    </div>
    <div class="keepsake">
      <AdaptiveView v-if="!$store.state.global.isMobile" height="540px" :nft="souvenir" />
      <AdaptiveView v-else height="300px" :nft="souvenir" />
    </div>
    <div class="info">
      <div class="info-item">
        <div class="title">
          <img class="desc-icon" src="@/assets/images/souvenir-desc.png" alt="" /><span
            >Description</span
          >
        </div>
        <div class="message">{{ souvenir.artist_info }}</div>
      </div>
      <div class="info-item">
        <div class="title">
          <img class="pro-icon" src="@/assets/images/souvenir-pro.png" alt="" /><span
            >Properties</span
          >
        </div>
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
        <div class="title">
          <img class="detail-icon" src="@/assets/images/souvenir-details.png" alt="" /><span
            >Details</span
          >
        </div>
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
      <div class="info-item list-info-item">
        <div class="title">
          <div class="title-label">
            <img class="list-icon" src="@/assets/images/souvenir-offer.png" alt="" /><span
              >Listings</span
            >
          </div>
        </div>
        <div class="details" v-if="!$store.state.global.isMobile">
          <div class="table-head">
            <span style="width: 200px">Unit Price</span>
            <span style="width: 150px">Expiration</span>
            <span style="width: calc(100% - 500px)">From</span>
            <span style="width: 150px"></span>
          </div>
          <el-scrollbar max-height="300px" @scroll="onScroll">
            <div
              class="empty"
              style="height: 299px; line-height: 299px; text-align: center; color: #aaa"
              v-if="souvenirMineOrderList.length <= 0 && souvenirOrderList.length <= 0"
            >
              Empty
            </div>
            <div class="order-item order-item-buy" v-for="(v, i) in souvenirOrderList" :key="i">
              <div class="order-info" style="width: 200px">
                <img
                  style="width: 20px"
                  :src="require(`@/assets/images/${v.coin?.toLowerCase()}.png`)"
                />
                <span style="margin-left: 5px; color: black; font-weight: 800">{{
                  v.uint_price
                }}</span>
                <span style="margin-left: 5px">{{ v.coin }}</span>
              </div>
              <div class="order-info" style="width: 150px">
                <span>in {{ formateDate(v.expired_at) }} days</span>
              </div>
              <div class="order-info" style="width: calc(100% - 500px)">
                <span>{{ v.from }}</span>
              </div>
              <div class="order-operate" style="width: 150px">
                <button
                  class="cancel-button"
                  v-if="v.is_mine"
                  :disabled="!v.is_mine"
                  @click="onCancelBuyNowClick(v)"
                >
                  Cancel
                </button>
                <button class="buy-button" v-else @click="onBuyOrder(v)">Buy</button>
              </div>
            </div>
            <div class="loading" v-if="isLoadingList">
              <icon-svg icon-class="loading" />
            </div>
          </el-scrollbar>
        </div>
        <div class="details" v-else>
          <el-scrollbar max-height="600px" @scroll="onScroll">
            <div
              class="empty"
              style="height: 600px; line-height: 600px; text-align: center; color: #aaa"
              v-if="souvenirMineOrderList.length <= 0 && souvenirOrderList.length <= 0"
            >
              Empty
            </div>
            <div class="order-item order-item-buy" v-for="(v, i) in souvenirOrderList" :key="i">
              <div class="order-info">
                <div class="label">Unit Price</div>
                <div class="value">
                  <img
                    style="width: 20px"
                    :src="require(`@/assets/images/${v.coin?.toLowerCase()}.png`)"
                  />
                  <span style="margin-left: 5px; color: black; font-weight: 800">{{
                    v.uint_price
                  }}</span>
                  <span style="margin-left: 5px">{{ v.coin }}</span>
                </div>
              </div>
              <div class="order-info">
                <div class="label">Expiration</div>
                <div class="value">in {{ formateDate(v.expired_at) }} days</div>
              </div>
              <div class="order-info">
                <div class="label">From</div>
                <div class="value">
                  {{ v.from }}
                </div>
              </div>
              <div class="order-operate">
                <button
                  class="cancel-button"
                  v-if="v.is_mine"
                  :disabled="!v.is_mine"
                  @click="onCancelBuyNowClick(v)"
                >
                  Cancel
                </button>
                <button class="buy-button" v-else @click="onBuyOrder(v)">Buy</button>
              </div>
            </div>
            <div class="loading" v-if="isLoadingList">
              <icon-svg icon-class="loading" />
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    custom-class="buy-now-dialog"
    v-if="!$store.state.global.isMobile"
    v-model="buyDialog"
    type="small"
  >
    <div class="dialog-content">
      <div class="dialog-title">Confirm Order Information</div>
      <div class="dialog-order-info">
        <div class="dialog-order-info-item">
          <span>Price: </span>
          <span style="font-weight: 600; color: black"
            >{{ selectItem.uint_price }} {{ selectItem.coin?.toUpperCase() }}</span
          >
        </div>
        <div class="dialog-order-info-item">
          <span>From:</span>
          <span>{{ selectItem.from }}</span>
        </div>
      </div>
      <button v-if="isApproving" v-loading="nftLoading" @click="buyOrder">Buy</button>
      <button v-else v-loading="nftLoading" @click="onApprove">Approve</button>
    </div>
  </Dialog>
  <MobileConfirm v-else v-model="buyDialog" type="small">
    <div class="dialog-content">
      <div class="dialog-title">Confirm Order Information</div>
      <div class="dialog-order-info">
        <div class="dialog-order-info-item">
          <span>Price: </span>
          <span style="font-weight: 600; color: black"
            >{{ selectItem.uint_price }} {{ selectItem.coin?.toUpperCase() }}</span
          >
        </div>
        <div class="dialog-order-info-item">
          <span>From:</span>
          <span style="">{{ selectItem.from }}</span>
        </div>
      </div>
      <button v-if="isApproving" v-loading="nftLoading" @click="buyOrder">Buy</button>
      <button v-else v-loading="nftLoading" @click="onApprove">Approve</button>
    </div>
  </MobileConfirm>
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
import DappConfig from "@/config/dapp";
import Erc20 from "@/contracts/Erc20";
import { BigNumber } from "@/plugins/bignumber";

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
    const souvenirOrderList = ref([]);
    const souvenirMineOrderList = ref([]);
    const souvenirOrderTotal = ref(0);
    const page = ref(1);
    const per_page = ref(6);
    const { id } = route.params;
    const initKeepsakeData = async () => {
      souvenir.value = await http.globalGetSouvenirById({}, { id });
      console.log(souvenir.value);
      // if (store.state.user.info.address) {
      //   let list = await http.userGetSouvenirsStatus({});
      //   souvenirMineOrderList.value = list?.list || [];
      // }
      requestOrderList();
    };
    const isLoadingList = ref(false);
    const requestOrderList = async () => {
      isLoadingList.value = true;
      let list = await http.globalGetSouvenirOrders(
        {
          page: page.value,
          per_page: per_page.value,
        },
        { id }
      );
      souvenirOrderList.value = souvenirOrderList.value.concat(list?.list || []);
      souvenirOrderTotal.value = list?.total_count || [];
      isLoadingList.value = false;
    };

    const isApproving = ref(false);
    let currentErc20 = {};
    const nftLoading = ref(false);
    const buyDialog = ref(false);
    const selectItem = ref({});
    const getApproveStatus = () => {
      const token = Object.values(DappConfig.config.souvenirListTokens).find(
        (v) => selectItem.value.coin.toUpperCase() == v.symbol.toUpperCase()
      );
      console.log(token);
      if (!token) return;
      const connectedAccount = store.state.user.info.address;
      currentErc20 = new Erc20(token.address, token.symbol, token.decimals);
      // 查看链上权限
      nftLoading.value = true;
      currentErc20
        .allowance(connectedAccount, DappConfig.config.contracts.MultiTokenTrustMarketplace)
        .then((data) => {
          isApproving.value = data.toNumber() !== 0;
          nftLoading.value = false;
        })
        .catch(() => {
          isApproving.value = false;
          nftLoading.value = true;
        });
    };

    const onBuyOrder = (item) => {
      buyDialog.value = true;
      selectItem.value = item;
      getApproveStatus();
    };

    const onApprove = async () => {
      let notifyId = null;
      nftLoading.value = true;
      try {
        notifyId = notification.loading("Authorizing");
        const receipt = await currentErc20
          .approveMax(
            store.state.user.info.address,
            DappConfig.config.contracts.MultiTokenTrustMarketplace,
            async (err, txHash) => {
              if (err) {
                console.log(err);
                throw err;
              }
              if (txHash) {
                console.log(txHash);
                nftLoading.value = false;
                notification.dismiss(notifyId);
                notification.success(txHash);
                notifyId = notification.loading("Waiting for confirmation on the chain");
              }
            }
          )
          .then(() => {
            nftLoading.value = false;
            isApproving.value = true;
            notification.dismiss(notifyId);
          });
        console.log("receipt: ", receipt);
      } catch (err) {
        nftLoading.value = false;
        notification.dismiss(notifyId);
        notification.error(
          (err.head && err.head.msg) || err.message || (err.data && err.data.message)
        );
        throw err;
      }
      notification.dismiss(notifyId);
    };

    const buyOrder = async () => {
      // 购买nft
      nftLoading.value = true;
      let notifyId = notification.loading("Please wait for the wallet's response");

      await MultiTokenTrustMarketplace.safePlaceBid(
        selectItem.value.order_id,
        souvenir.value.souvenir_nft_contract,
        souvenir.value.souvenir_token_id,
        selectItem.value.amount,
        new BigNumber(selectItem.value.uint_price).shiftedBy(selectItem.value.decimals).toString(),
        selectItem.value.expired_at,
        async (err, txHash) => {
          if (err) {
            console.log(err);
            throw err;
          }
          if (txHash) {
            console.log(txHash);
            nftLoading.value = false;
            notification.dismiss(notifyId);
            notification.success(txHash);
            notification.success("Purchasing");
            notifyId = notification.loading("Waiting for confirmation on the chain");
            buyDialog.value = false;
          }
        }
      )
        .then((receipt) => {
          nftLoading.value = false;
          notification.dismiss(notifyId);
          console.log("receipt: ", receipt);
          requestOrderList();
        })
        .catch((err) => {
          nftLoading.value = false;
          notification.dismiss(notifyId);
          console.log(err);
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
          console.log(err);
        });
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
    const cancelSouvenirIndex = ref({});

    // 取消BuyNow订单
    const onCancelBuyNowClick = (souvenir, index) => {
      cancelOrderDialog.value = true;
      cancelSouvenir.value = souvenir;
      cancelSouvenirIndex.value = index;
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

    const itemHeight = ref(store.state.global.isMobile ? 291 : 60);
    const itemListHeight = ref(store.state.global.isMobile ? 600 : 300);
    const onScroll = (event) => {
      if (
        event.scrollTop >=
        page.value * per_page.value * itemHeight.value +
          souvenirMineOrderList.value.length * itemHeight.value -
          itemListHeight.value
      ) {
        if (Math.ceil(souvenirOrderTotal.value / per_page.value) > page.value) {
          page.value++;
          requestOrderList();
        }
      }
    };

    const formateDate = (time) => {
      let now = new Date().getTime() / 1000;
      let date = time - now;
      return Math.ceil(date / (3600 * 24));
    };

    return {
      onCopy,
      souvenir,
      souvenirOrderList,
      souvenirMineOrderList,

      onCancelBuyNowOrder,
      onCancelAuctionOrder,
      onCancelBuyNowClick,
      onCancelAuctionClick,
      cancelOrderDialog,
      cancelAuctionDialog,
      onScroll,

      buyDialog,
      onBuyOrder,
      nftLoading,
      loading,
      isApproving,

      onApprove,
      buyOrder,

      formateDate,
      isLoadingList,
      selectItem,
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

      .title,
      .title-label {
        display: flex;
        align-items: center;
        height: 40px;
        color: black;
        font-size: 24px;
        text-align: left;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .desc-icon {
        width: 22px;
        height: 27px;
        margin-right: 18px;
      }
      .pro-icon {
        width: 26px;
        height: 23px;
        margin-right: 14px;
      }
      .detail-icon {
        width: 22px;
        height: 21px;
        margin-right: 18px;
      }
      .list-icon {
        width: 26px;
        height: 26px;
        margin-right: 14px;
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
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 0;
          border-top: 1px solid #a2a2a2;
        }
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
      }
    }

    .list-info-item {
      width: 100%;
      .title {
        justify-content: space-between;
        align-items: center;
      }
      .title-label {
        margin-bottom: 0px;
      }
      .details {
        max-height: 341px;
        border-radius: 10px;
        border: 1px solid #a2a2a2;
        font-size: 16px;
        font-weight: 600;
        padding: 0px 0px 0px 0;
      }
      .table-head {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        border-bottom: 1px solid #a2a2a2;
        > span {
          display: block;
        }
      }
      .order-item:first-child {
        border-top: 1px solid transparent;
      }
      .order-item {
        border-top: 1px solid #a2a2a2;
        padding: 16px 16px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .order-info {
        display: flex;
        span {
          color: rgb(67, 67, 67);
        }
      }
      .order-operate {
        text-align: right;
        button.cancel-button {
          margin: 0 10px;
          border-radius: 10px;
          color: white;
          background-color: black;
          padding: 10px 0;
          font-weight: 600;
          width: 100px;
          cursor: pointer;
        }
        button.buy-button {
          margin: 0 10px;
          border: 1px solid black;
          border-radius: 10px;
          color: black;
          background-color: transparent;
          padding: 10px 0;
          font-weight: 600;
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

  .dialog-order-info {
    .dialog-order-info-item {
      display: flex;
      justify-content: space-between;
      margin: 20px 0px;
      > span {
        font-size: 16px;
      }
      > span:first-child {
        width: 100px;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .detail {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 20px;
    .head {
      flex-direction: column;
      height: auto;
      align-items: flex-start;
    }
    .info {
      margin-top: 20px;
    }
    .info .info-item .title {
      font-size: 17px;

      .desc-icon {
        width: 16px;
        height: auto;
        margin-right: 18px;
      }
      .pro-icon {
        width: 19px;
        height: auto;
        margin-right: 14px;
      }
      .detail-icon {
        width: 19px;
        height: auto;
        margin-right: 13px;
      }
      .list-icon {
        width: 26px;
        height: 26px;
        margin-right: 14px;
      }
    }
    .info .info-item .properties {
      flex-direction: column;
    }
    .info .info-item .properties .properties-item {
      margin-bottom: 20px;
      width: 100%;
      height: 140px;
      justify-content: center;
    }
    .info .info-item .details .details-item {
      flex-direction: column;
      margin-bottom: 10px;
      .key {
        font-size: 16px;
        color: #393939;
      }
      .value {
        max-width: 100%;
        word-wrap: break-word;
      }
    }
    .info .list-info-item .order-info {
      flex-direction: column;
      margin-bottom: 20px;
      width: 100%;
      .label {
        font-size: 15px;
        color: #393939;
        margin-bottom: 5px;
      }
      .value {
        display: flex;
        align-items: center;
        font-size: 18px;
        width: 100%;
        flex-wrap: wrap;
        word-break: break-all;
      }
    }
    .info .list-info-item .details {
      max-height: 600px;
    }
    .info .list-info-item .order-item {
      flex-direction: column;
      height: auto;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .info .list-info-item .order-operate {
      width: 100%;
      button {
        width: 100%;
        margin: 0;
      }
    }
    .info .list-info-item .order-item-buy .order-operate {
      width: 100%;
      button {
        width: 100%;
        margin: 0;
      }
    }
  }

  .dialog-content .input-body span.unit {
    width: 100px;
  }
  .dialog-content .list-form-body .input-body > input {
    width: calc(100% - 100px);
  }

  .dialog-content .dialog-order-info .dialog-order-info-item > span:first-child {
    width: 70px;
  }
  .dialog-content .dialog-order-info .dialog-order-info-item > span:last-child {
    width: calc(100% - 70px);
    text-align: right;
    word-wrap: break-word;
  }
}
</style>
