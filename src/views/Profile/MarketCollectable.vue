/** * Created by Lay Hunt on 2021-09-08 14:14:13. */
<template>
  <div class="collection">
    <div v-if="list.length <= 0" class="no-data">No data</div>
    <div v-for="v in list" :key="v" class="list">
      <div class="item">
        <img :src="v.img_main_file1" alt="" @click="goDetail(v.id)" />
        <div class="info">
          <div class="progress">
            <Progress :value="v.number / v.total" />
            <div class="value-group">
              <span>Number of votes: {{ v.number }}</span>
              <span>Total: {{ v.total }}</span>
            </div>
          </div>
          <div class="operate">
            <button
              v-if="v.auction_order || v.buy_now_order"
              @click="() => removeOrder(v)"
              :disabled="!v.can_cancel_auction_order && !v.can_cancel_buy_now_order"
            >
              Cancel Listing
            </button>
            <button v-else @click="() => openListDialog(v)">List</button>
            <button :disabled="v.auction_order || v.buy_now_order" @click="() => openSendDialog(v)">
              Send
            </button>
            <!-- <button @click="() => pin(v)">Pin</button> -->
            <button disabled>Pin</button>
          </div>
        </div>
      </div>
    </div>
    <Dialog v-if="!$store.state.global.isMobile" v-model="sendDialog" type="small">
      <div class="dialog-content">
        <div class="input-body">
          <span class="unit">address</span>
          <input v-model="sender" />
        </div>
        <button v-loading="isLoading" @click="send">Send</button>
      </div>
    </Dialog>
    <Mobilecomfirm v-else v-model="sendDialog" type="small">
      <div class="dialog-content">
        <div class="input-body">
          <span class="unit">address</span>
          <input v-model="sender" />
        </div>
        <button v-loading="isLoading" @click="send">Send</button>
      </div>
    </Mobilecomfirm>
    <Dialog v-if="!$store.state.global.isMobile" v-model="listDialog" type="small">
      <div class="dialog-content">
        <div v-show="!approving" class="list-select">
          <span
            :class="{ 'select-item': listSelect === 0 }"
            class="list-item"
            @click="listSelect = 0"
          >
            Listing to Auction
          </span>
          <span
            :class="{ 'select-item': listSelect === 1 }"
            class="list-item"
            @click="listSelect = 1"
          >
            Listing to BuyNow Market
          </span>
        </div>
        <div v-show="listSelect === 0">
          <div class="input-body">
            <span class="unit">Start Block</span>
            <input v-model="creatAuctionData.startBlock" />
          </div>
          <div class="block-height">Current block height : {{ blockHeight }}</div>
          <div class="input-body">
            <span class="unit">End Block</span>
            <input v-model="creatAuctionData.endBlock" />
          </div>
          <div class="input-body">
            <span class="unit">Starting Price</span>
            <input v-model="creatAuctionData.startPrice" />
            <span class="unit unit2">{{ marketToken.symbol }}</span>
          </div>
          <div class="input-body">
            <span class="unit">Fixed Price</span>
            <input v-model="creatAuctionData.fixedPrice" />
            <span class="unit unit2">{{ marketToken.symbol }}</span>
          </div>
          <div class="input-body">
            <span class="unit">Min Increment</span>
            <input v-model="creatAuctionData.minIncrement" />
            <span class="unit unit2">%</span>
          </div>
          <button v-loading="isLoading" @click="creatToAuctionMarket">
            {{ auctionApproving ? "Creat on Auction Market" : "Approve" }}
          </button>
        </div>
        <div v-show="listSelect === 1">
          <div class="input-body">
            <input v-model="listPrice" />
            <span class="unit unit2">{{ marketToken.symbol }}</span>
          </div>
          <button v-loading="isLoading" @click="creatToBuyNowMarket">
            {{ approving ? "Creat on Buynow Market" : "Approve" }}
          </button>
        </div>
      </div>
    </Dialog>
    <Mobilecomfirm v-else v-model="listDialog" type="small">
      <div class="dialog-content">
        <div v-show="!approving" class="list-select">
          <span
            :class="{ 'select-item': listSelect === 0 }"
            class="list-item"
            @click="listSelect = 0"
          >
            Listing to Auction
          </span>
          <span
            :class="{ 'select-item': listSelect === 1 }"
            class="list-item"
            @click="listSelect = 1"
          >
            Listing to BuyNow Market
          </span>
        </div>
        <div v-show="listSelect === 0">
          <div class="input-body">
            <span class="unit">Start Block</span>
            <input v-model="creatAuctionData.startBlock" />
          </div>
          <div class="block-height">Current block height : {{ blockHeight }}</div>
          <div class="input-body">
            <span class="unit">End Block</span>
            <input v-model="creatAuctionData.endBlock" />
          </div>
          <div class="input-body">
            <span class="unit">Starting Price</span>
            <input v-model="creatAuctionData.startPrice" />
            <span class="unit unit2">{{ marketToken.symbol }}</span>
          </div>
          <div class="input-body">
            <span class="unit">Fixed Price</span>
            <input v-model="creatAuctionData.fixedPrice" />
            <span class="unit unit2">{{ marketToken.symbol }}</span>
          </div>
          <div class="input-body">
            <span class="unit">Min Increment</span>
            <input v-model="creatAuctionData.minIncrement" />
            <span class="unit unit2">%</span>
          </div>
          <button v-loading="isLoading" @click="creatToAuctionMarket">
            {{ auctionApproving ? "Creat on Auction Market" : "Approve" }}
          </button>
        </div>
        <div v-show="listSelect === 1">
          <div class="input-body">
            <input v-model="listPrice" />
            <span class="unit unit2">{{ marketToken.symbol }}</span>
          </div>
          <button v-loading="isLoading" @click="creatToBuyNowMarket">
            {{ approving ? "Creat on Buynow Market" : "Approve" }}
          </button>
        </div>
      </div>
    </Mobilecomfirm>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import Progress from "@/components/Progress";
import { useRouter } from "vue-router";
import http from "@/plugins/http";
import { notification } from "@/components/Notification";
import Dialog from "@/components/Dialog";
import config from "@/config/network";
import Erc721 from "@/contracts/Erc721";
import Mobilecomfirm from "@/components/MobileConfirm";
import Pin from "@/contracts/Collection";
import { DAPP_CONFIG } from "@/config";
import store from "@/store";
import Web3 from "web3";
import TrustMarketplace from "@/contracts/TrustMarketplace";
import { BigNumber } from "@/plugins/bignumber";
import Auction from "@/contracts/Auction";

export default defineComponent({
  name: "MarketCollection",
  components: {
    Mobilecomfirm,
    Dialog,
    Progress,
  },
  setup() {
    const creatAuctionData = ref({
      startBlock: null,
      endBlock: null,
      startPrice: 0,
      fixedPrice: 0,
      minIncrement: 10,
    });
    const blockHeight = ref(0);
    const listPrice = ref("");
    const marketCurrency = "WETH";
    const marketToken = DAPP_CONFIG.tokens[marketCurrency];
    const width = 70;
    const sendDialog = ref(false);
    const listDialog = ref(false);
    const listSelect = ref(1);
    const sender = ref("");
    const isLoading = ref(false);
    const list = ref([]);
    const approving = ref(false);
    const auctionApproving = ref(false);
    const requestData = () => {
      // isLoading.value = true;
      http
        .userGetMineNFT({})
        .then((res) => {
          // isLoading.value = false;
          list.value.splice(0, 0, ...res.list);
        })
        .catch((err) => {
          console.log(err);
          // isLoading.value = false;
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
        });
    };
    let sto = 0;
    onMounted(async () => {
      requestData();
      const height = await Auction.dater.getDate();
      blockHeight.value = height.block;
    });
    onBeforeUnmount(() => {
      clearInterval(sto);
    });
    let selectItem = ref(null);
    const openSendDialog = (v) => {
      selectItem.value = v;
      sendDialog.value = true;
      listSelect.value = 0;
    };
    const closeSendDiaLog = () => {
      sendDialog.value = false;
      selectItem.value = null;
    };
    const send = () => {
      const bool = Web3.utils.isAddress(sender.value);
      if (!bool) {
        return notification.info("Invalid address");
      }
      const nft = config.nfts.UniartsNFT;
      const erc721 = new Erc721(nft.address, nft.symbol);
      console.log({
        sender: sender.value,
        token_id: selectItem.value.token_id,
      });
      let notifyId = notification.loading("In transferred assets");
      erc721
        .sendNft(sender.value, selectItem.value.token_id, (err, txHash) => {
          if (err) {
            console.log(err);
            notification.dismiss(notifyId);
            notification.error(
              err.message.split("{")[0] ||
                (err.head && err.head.msg) ||
                err.message ||
                (err.data && err.data.message)
            );
            throw err;
          }
          if (txHash) {
            closeSendDiaLog();
            console.log(txHash);
            notification.dismiss(notifyId);
            notification.success(txHash);
            notifyId = notification.loading("Confirming");
          }
        })
        .then((res) => {
          closeSendDiaLog();
          console.log(res);
          notification.dismiss(notifyId);
          notification.success("Asset transfer succeeded");
        })
        .catch((err) => {
          notification.dismiss(notifyId);
          console.log(err);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
        });
    };
    const pin = async (item) => {
      let notifyId = notification.loading("Authorization in progress");
      const sender = store.state.user.info.address;
      const nft = DAPP_CONFIG.nfts.UniartsNFT;
      const erc721 = new Erc721(nft.address, nft.symbol);
      let bool = false;
      try {
        const res = await erc721.getApproved(item.token_id);
        bool = res.toString() === Pin.address.toString();
      } catch (err) {
        console.log(err);
        bool = false;
      }
      if (!bool) {
        try {
          console.log({
            sender,
            address: Pin.address,
            token_id: item.token_id,
          });
          await erc721.approve(sender, Pin.address, item.token_id, (err, txHash) => {
            if (err) {
              console.log(err);
              notification.dismiss(notifyId);
              throw err;
            }
            if (txHash) {
              // isLoading.value = true;
              console.log(txHash);
              notification.dismiss(notifyId);
              notification.success(txHash);
              notifyId = notification.loading("Pinning");
            }
          });
          notification.dismiss(notifyId);
          notification.success("Pin Success");
        } catch (err) {
          notification.dismiss(notifyId);
          // notification.error(err);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
          return;
        }
      }

      Pin.pin(nft.address, item.token_id, (err, txHash) => {
        if (err) {
          console.log(err);
          notification.dismiss(notifyId);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
          throw err;
        }
        if (txHash) {
          // isLoading.value = true;
          console.log(txHash);
          notification.dismiss(notifyId);
          notification.success(txHash);
          notifyId = notification.success("Confirming");
        }
      })
        .then((res) => {
          console.log(res);
          notification.dismiss(notifyId);
          notifyId = notification.success("Pin Success");
        })
        .catch((err) => {
          console.log(err);
          notification.dismiss(notifyId);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
        });
    };
    const openListDialog = (item) => {
      console.log(item);
      creatAuctionData.value = {
        startBlock: blockHeight.value + 300,
        endBlock: "",
        startPrice: 0,
        fixedPrice: 0,
        minIncrement: 10,
      };
      selectItem.value = item;
      console.log(selectItem.value);
      listDialog.value = true;
      auctionApproving.value = false;
      approving.value = false;
      listPrice.value = "";
    };
    const closeListDialog = () => {
      listDialog.value = false;
      selectItem.value = null;
      listPrice.value = "";
    };
    const creatToAuctionMarket = async () => {
      isLoading.value = true;
      const sender = store.state.user.info.address;
      const nft = DAPP_CONFIG.nfts.UniartsNFT;
      const erc721 = new Erc721(nft.address, nft.symbol);
      // const contract = Auction;
      const contractAddress = selectItem.value.auction_contract_address;
      console.log(contractAddress);
      if (auctionApproving.value) {
        let notifyId = notification.loading("Confirmed on Chain");
        isLoading.value = false;
        try {
          await Auction.creatAuction(
            creatAuctionData.value.startBlock,
            creatAuctionData.value.endBlock,
            creatAuctionData.value.minIncrement,
            nft.address,
            selectItem.value.token_id,
            creatAuctionData.value.startPrice,
            creatAuctionData.value.fixedPrice,
            contractAddress,
            (err, txHash) => {
              if (err) {
                console.log(err);
                notification.dismiss(notifyId);
                notification.error(
                  err.message.split("{")[0] ||
                    (err.head && err.head.msg) ||
                    err.message ||
                    (err.data && err.data.message)
                );
                throw err;
              }
              if (txHash) {
                // isLoading.value = true;
                console.log({
                  txHash,
                  sender,
                  address: contractAddress,
                  token_id: selectItem.value.token_id,
                });
                notification.dismiss(notifyId);
                notification.success(txHash);
                isLoading.value = false;
                closeListDialog();
              }
            }
          );
          isLoading.value = false;
          notification.dismiss(notifyId);
          notification.success("Confirmed on Chain");
        } catch (err) {
          isLoading.value = false;
          notification.dismiss(notifyId);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
        }
      } else {
        let bool;
        try {
          const res = await erc721.getApproved(selectItem.value.token_id);
          bool = res.toString() === contractAddress.toString();
          isLoading.value = false;
        } catch (err) {
          console.log(err);
          bool = false;
        }
        if (bool) {
          auctionApproving.value = true;
          notification.success("Your Approved");
        } else {
          let notifyId = notification.loading("Wait For the Wallet");
          try {
            await erc721.approve(
              sender,
              contractAddress,
              selectItem.value.token_id,
              (err, txHash) => {
                if (err) {
                  console.log(err);
                  notification.dismiss(notifyId);
                  throw err;
                }
                if (txHash) {
                  // isLoading.value = true;
                  console.log({
                    txHash,
                    sender,
                    address: contractAddress,
                    token_id: selectItem.value.token_id,
                  });
                  notification.dismiss(notifyId);
                  notification.success(txHash);
                  isLoading.value = false;
                  auctionApproving.value = true;
                }
              }
            );
            isLoading.value = false;
            notification.dismiss(notifyId);
            notification.success("Approve Success");
          } catch (err) {
            isLoading.value = false;
            notification.dismiss(notifyId);
            notification.error(
              err.message.split("{")[0] ||
                (err.head && err.head.msg) ||
                err.message ||
                (err.data && err.data.message)
            );
          }
        }
      }
    };
    const creatToBuyNowMarket = async () => {
      isLoading.value = true;
      const sender = store.state.user.info.address;
      const nft = DAPP_CONFIG.nfts.UniartsNFT;
      const erc721 = new Erc721(nft.address, nft.symbol);
      const contract = TrustMarketplace;
      if (approving.value) {
        let notifyId = notification.loading("Wait For the Wallet");
        isLoading.value = false;
        notification.dismiss(notifyId);
        notification.success("Confirmed on Chain");
        try {
          await contract.createOrder(
            DAPP_CONFIG.nfts.UniartsNFT.address,
            selectItem.value.token_id,
            BigNumber(listPrice.value).shiftedBy(DAPP_CONFIG.tokens.WETH.decimals).toString(),
            Number((new Date().getTime() / 1000 + 60 * 60 * 24 * 7).toFixed(0)),
            (err, txHash) => {
              if (err) {
                console.log(err);
                notification.dismiss(notifyId);
                notification.error(
                  err.message.split("{")[0] ||
                    (err.head && err.head.msg) ||
                    err.message ||
                    (err.data && err.data.message)
                );
                throw err;
              }
              if (txHash) {
                // isLoading.value = true;
                console.log({
                  txHash,
                  sender,
                  address: contract.address,
                  token_id: selectItem.value.token_id,
                });
                notification.dismiss(notifyId);
                notification.success(txHash);
                isLoading.value = false;
                closeListDialog();
              }
            }
          );
          isLoading.value = false;
          notification.dismiss(notifyId);
          notification.success("Confirmed on Chain");
        } catch (err) {
          isLoading.value = false;
          notification.dismiss(notifyId);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
        }
      } else {
        let bool;
        try {
          const res = await erc721.getApproved(selectItem.value.token_id);
          bool = res.toString() === contract.address.toString();
          isLoading.value = false;
        } catch (err) {
          console.log(err);
          bool = false;
        }
        if (bool) {
          approving.value = true;
          notification.success("Your Approved");
        } else {
          let notifyId = notification.loading("Wait For the Wallet");
          try {
            await erc721.approve(
              sender,
              contract.address,
              selectItem.value.token_id,
              (err, txHash) => {
                if (err) {
                  console.log(err);
                  notification.dismiss(notifyId);
                  throw err;
                }
                if (txHash) {
                  // isLoading.value = true;
                  console.log({
                    txHash,
                    sender,
                    address: contract.address,
                    token_id: selectItem.value.token_id,
                  });
                  notification.dismiss(notifyId);
                  notification.success(txHash);
                  isLoading.value = false;
                  approving.value = true;
                }
              }
            );
            isLoading.value = false;
            notification.dismiss(notifyId);
            notification.success("Approve Success");
          } catch (err) {
            isLoading.value = false;
            notification.dismiss(notifyId);
            notification.error(
              err.message.split("{")[0] ||
                (err.head && err.head.msg) ||
                err.message ||
                (err.data && err.data.message)
            );
          }
        }
      }
    };
    const removeOrder = async (auction) => {
      isLoading.value = true;
      let loadingMessage = notification.loading("Please wait for the wallet's response");
      if (auction.auction_order) {
        try {
          console.log({
            matchId: auction.latest_auction_uid,
            token_id: auction.token_id,
            addressV2: auction.auction_contract_address,
          });
          await Auction.cancelOrder(
            auction.latest_auction_uid,
            auction.token_id,
            auction.auction_contract_address,
            (err, txHash) => {
              if (err) {
                notification.clear(loadingMessage);
                isLoading.value = false;
                console.log(err);
                notification.error(
                  err.message.split("{")[0] ||
                    (err.head && err.head.msg) ||
                    err.message ||
                    (err.data && err.data.message)
                );
                throw err;
              }
              if (txHash) {
                notification.success(txHash);
                notification.dismiss(loadingMessage);
                loadingMessage = notification.loading("Waiting for confirmation on the Chain");
              }
            }
          );
          notification.success("Confirmed on Chain");
        } catch (err) {
          console.log(err);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
        } finally {
          notification.dismiss(loadingMessage);
          isLoading.value = false;
        }
      } else if (auction.buy_now_order) {
        try {
          await TrustMarketplace.cancelOrder(
            DAPP_CONFIG.nfts.UniartsNFT.address,
            auction.token_id,
            (err, txHash) => {
              if (err) {
                notification.clear(loadingMessage);
                isLoading.value = false;
                console.log(err);
                notification.error(
                  err.message.split("{")[0] ||
                    (err.head && err.head.msg) ||
                    err.message ||
                    (err.data && err.data.message)
                );
                throw err;
              }
              if (txHash) {
                notification.success(txHash);
                notification.dismiss(loadingMessage);
                loadingMessage = notification.loading("Waiting for confirmation on the Chain");
              }
            }
          );
          notification.success("Confirmed on Chain");
        } catch (err) {
          console.log(err);
          notification.error(
            err.message.split("{")[0] ||
              (err.head && err.head.msg) ||
              err.message ||
              (err.data && err.data.message)
          );
        } finally {
          notification.dismiss(loadingMessage);
          isLoading.value = false;
        }
      }
    };
    const router = useRouter();
    const goDetail = (id) => {
      router.push("/marketplace/detail/" + id);
    };
    return {
      pin,
      selectItem,
      sendDialog,
      list,
      width,
      send,
      sender,
      isLoading,
      openSendDialog,
      goDetail,
      openListDialog,
      closeListDialog,
      listDialog,
      listSelect,
      creatToBuyNowMarket,
      creatToAuctionMarket,
      marketToken,
      approving,
      auctionApproving,
      listPrice,
      blockHeight,
      creatAuctionData,
      removeOrder,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  .item {
    display: flex;
    margin-bottom: 72px;

    img {
      min-width: 400px;
      max-width: 400px;
    }
  }

  .info {
    width: 434px;
    margin-left: 37px;

    .operate {
      display: flex;
      justify-content: space-between;
      margin-top: 69px;

      button {
        font-size: 14px;
        font-family: Montserrat-Medium;
        text-align: center;
        color: #ffffff;
        width: 119px;
        height: 43px;
        background-color: black;
      }

      button:disabled {
        background-color: #8e8e8e;
      }
    }

    .value-group {
      margin: 0 auto;
      margin-top: 15px;
      width: 90%;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #595757;
    }
  }
}

@media screen and (max-width: 750px) {
  .list .item {
    display: flex;
    flex-direction: column;

    img {
      min-width: 100% !important;
      width: 100%;
      height: auto;
    }
  }
  .list .info {
    margin-top: 20px;
    width: 100%;
    margin-left: 0;
  }
  .list .info .value-group {
    width: 100%;
    margin-top: 10px;
    font-size: 15px;
    margin-left: 0;
    margin-right: 0;
  }
  .list .info .operate {
    margin-top: 20px;

    button {
      width: 30%;
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
  }

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
      width: 240px;
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
      width: 120px;
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
