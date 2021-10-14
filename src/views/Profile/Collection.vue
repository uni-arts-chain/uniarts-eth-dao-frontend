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
            <!--            <button>List</button>-->
            <button @click="() => openSendDialog(v)">Send</button>
            <button @click="() => pin(v)">Pin</button>
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
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import Progress from "@/components/Progress";
import { useRouter } from "vue-router";
// import { BigNumber } from "@/plugins/bignumber";
// import { DAPP_CONFIG } from "@/config";
// import store from "@/store";
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

export default defineComponent({
  name: "collection",
  components: {
    Mobilecomfirm,
    Dialog,
    Progress,
  },
  setup() {
    const width = 70;
    const sendDialog = ref(false);
    const sender = ref("");
    const isLoading = ref(false);
    const list = ref([]);
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
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    onMounted(() => {
      requestData();
    });
    let selectItem = null;
    const openSendDialog = (v) => {
      selectItem = v;
      sendDialog.value = true;
    };
    const closeSendDiaLog = () => {
      sendDialog.value = false;
      requestData();
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
        token_id: selectItem.token_id,
      });
      let notifyId = notification.loading("In transferred assets");
      erc721
        .sendNft(sender.value, selectItem.token_id, (err, txHash) => {
          if (err) {
            console.log(err);
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
          notification.error(err);
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
          notifyId = notification.error(err);
          return;
        }
      }

      Pin.pin(nft.address, item.token_id, (err, txHash) => {
        if (err) {
          console.log(err);
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
          notification.error(err);
        });
    };
    const router = useRouter();
    const goDetail = (id) => {
      router.push("/marketplace/" + id);
    };
    return {
      pin,
      sendDialog,
      list,
      width,
      send,
      sender,
      isLoading,
      openSendDialog,
      goDetail,
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
      width: 130px;
      font-size: 16px;
      background-color: white;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: center;
      color: #000000;
      line-height: 48px;
      padding: 0 10px;
      border-right: 1px solid #e3e4e5;
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
