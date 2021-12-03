/** * Created by Lay Hunt on 2021-09-08 14:14:13. */
<template>
  <div class="collection">
    <div v-if="list.length <= 0" class="no-data">No data</div>
    <div v-for="v in list" :key="v.id" class="list">
      <div class="item">
        <div class="status" v-show="v.aasm_state !== 'online'">
          {{ v.aasm_state?.toString().toUpperCase() }}
        </div>
        <img :src="v.art.img_main_file1.url" alt="" @click="goDetail(v.id)" />
        <div class="info">
          <div class="progress">
            <Progress :value="(v.art.number || 0) / (v.art.total || 1)" />
            <div class="value-group">
              <span>Number of votes: {{ v.art.number || 0 }}</span>
              <span>Total: {{ v.art.total || 0 }}</span>
            </div>
          </div>
          <div class="operate">
            <button v-show="v.aasm_state === 'online'" @click="removeOrder(v)">Remove Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import Progress from "@/components/Progress";
import { useRouter } from "vue-router";
import http from "@/plugins/http";
import { notification } from "@/components/Notification";
import { DAPP_CONFIG } from "@/config";
import TrustMarketplace from "@/contracts/TrustMarketplace";

export default defineComponent({
  name: "MyOrder",
  components: {
    Progress,
  },
  setup() {
    const marketCurrency = "WETH";
    const marketToken = DAPP_CONFIG.tokens[marketCurrency];
    const width = 70;
    const isLoading = ref(false);
    const list = ref([]);
    const approving = ref(false);
    const requestData = () => {
      http
        .userGetOrderNFT({})
        .then((res) => {
          list.value.splice(0, 0, ...res);
          console.log(list.value);
        })
        .catch((err) => {
          console.log(err);
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    onMounted(() => {
      requestData();
    });
    const router = useRouter();
    const goDetail = (id) => {
      router.push("/marketplace/detail/" + id);
    };
    const removeOrder = async (auction) => {
      console.log(auction);
      let loadingMessage = notification.loading("Please wait for the wallet's response");
      isLoading.value = true;
      try {
        await TrustMarketplace.cancelOrder(
          DAPP_CONFIG.nfts.UniartsNFT.address,
          auction.art.token_id,
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
    };
    return {
      list,
      width,
      isLoading,
      goDetail,
      marketToken,
      approving,
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

    .status {
      position: absolute;
      z-index: 100;
      font-size: 16px;
      margin: 7px;
      padding: 7px;
      color: #fff;
      border-radius: 5px;
      background-color: #00000088;
    }

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
      cursor: auto;
    }

    .select-item {
      background-color: #d0d0d0;
      color: #000;
    }
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
