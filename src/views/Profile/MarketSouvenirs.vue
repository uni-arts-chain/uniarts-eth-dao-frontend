/** * Created by Lay Hunt on 2021-09-08 14:14:13. */
<template>
  <div class="collection">
    <div v-if="souvenirList.length <= 0" class="no-data">No data</div>
    <div v-for="v in souvenirList" :key="v" class="list">
      <div class="item">
        <img :src="v.sample" alt="" @click="goDetail(v)" />
        <div class="info">
          <div class="title">{{ v.title }}</div>
          <div class="progress">
            <Progress :value="0" />
            <div class="value-group">
              <span>Number of votes: {{ "v.number" }}</span>
              <span>Total: {{ "v.total" }}</span>
            </div>
          </div>
          <div class="operate">
            <!--            <button>Cancel Listing</button>-->
            <button @click="openListDialog(v)">List</button>
            <button>Send</button>
            <!-- <button @click="() => pin(v)">Pin</button> -->
            <button disabled>Pin</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-if="!$store.state.global.isMobile" v-model="listDialog" type="small">
    <div class="dialog-content">
      <div class="list-select">
        <span :class="{ 'select-item': tabStatus === 0 }" class="list-item" @click="tabStatus = 0">
          Listing to Auction
        </span>
        <span :class="{ 'select-item': tabStatus === 1 }" class="list-item" @click="tabStatus = 1">
          Listing to BuyNow Market
        </span>
      </div>
      <div v-show="tabStatus === 0">
        <div v-show="selectItem.amount > 1" class="input-body">
          <span class="unit">Amount</span>
          <input v-model="creatAuctionData.amount" />
        </div>
        <div v-show="selectItem.amount > 1" class="block-height">
          range: 1 - {{ selectItem.amount }}
        </div>
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
          <select v-model="selectToken" class="unit unit2">
            <option
              v-for="(value, name) in souvenirListTokens"
              :key="name"
              :value="value.symbol.toLowerCase()"
            >
              {{ value.symbol }}
            </option>
          </select>
        </div>
        <div class="input-body">
          <span class="unit">Fixed Price</span>
          <input v-model="creatAuctionData.fixedPrice" />
          <select v-model="selectToken" class="unit unit2">
            <option
              v-for="(value, name) in souvenirListTokens"
              :key="name"
              :value="value.symbol.toLowerCase()"
            >
              {{ value.symbol }}
            </option>
          </select>
        </div>
        <div class="input-body">
          <span class="unit">Min Increment</span>
          <input v-model="creatAuctionData.minIncrement" />
          <span class="unit unit2">%</span>
        </div>
        <button v-loading="loading" @click="creatToAuctionMarket">
          {{ listToAuctionApproving ? "Creat on Auction Market" : "Approve" }}
        </button>
      </div>
      <div v-show="tabStatus === 1">
        <div class="input-body">
          <input v-model="creatBuyNowData.price" />
          <select v-model="selectToken" class="unit unit2">
            <option
              v-for="(value, name) in souvenirListTokens"
              :key="name"
              :value="value.symbol.toLowerCase()"
            >
              {{ value.symbol }}
            </option>
          </select>
        </div>
        <button v-loading="loading" @click="creatToBuyNowMarket">
          {{ listToBuyNowApproving ? "Creat on BuyNow Market" : "Approve" }}
        </button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import Progress from "@/components/Progress";
import http from "@/plugins/http";
import { useRouter } from "vue-router";
import Auction from "@/contracts/Auction";
import moment from "moment";
import Dialog from "@/components/Dialog";
import config from "@/config/network";
import IErc1155 from "@/contracts/IErc1155";
import { notification } from "@/components/Notification";
import MultiTokenTrustMarketplace from "@/contracts/MultiTokenTrustMarketplace";
import MultiTokenAuction from "@/contracts/MultiTokenAuction";

export default defineComponent({
  name: "MarketSouvenirs",
  components: {
    Dialog,
    Progress,
  },
  setup() {
    const souvenirListTokens = ref(config.souvenirListTokens);
    const router = useRouter();
    const loading = ref(false);
    // 我的纪念品列表
    const souvenirList = ref([]);
    // 刷新我的纪念品列表
    const initSouvenirs = async () => {
      loading.value = true;
      souvenirList.value = await http.userGetSouvenirsMine({});
      loading.value = false;
    };

    // 弹出层内tab选择器
    const tabStatus = ref(0);
    // 弹出层开关
    const listDialog = ref(false);
    // 当前弹出层纪念品对象
    const selectItem = ref({});
    // 选择币种
    const selectToken = ref(config.souvenirListTokens.WETH.symbol.toLowerCase());
    // 打开弹出层事件
    const openListDialog = (item) => {
      getApproveStatus(item);
      selectItem.value = item;
      listDialog.value = true;
      selectToken.value = config.souvenirListTokens.WETH.symbol.toLowerCase();
      creatAuctionData.value = {
        amount: 1,
        startBlock: blockHeight.value + 200,
        endBlock: blockHeight.value + 1200,
        startPrice: 0,
        fixedPrice: 0,
        minIncrement: 10,
      };
      creatBuyNowData.value = {
        price: 0,
      };
    };
    // 关闭所有弹窗
    const closeDialog = () => {
      selectItem.value = {};
      listDialog.value = false;
    };

    // 获取当前合约状态
    const getApproveStatus = async (souvenir) => {
      loading.value = true;
      console.log(souvenir);
      await getAuctionApproveStatus(souvenir);
      await getBuyNowApproveStatus(souvenir);
      loading.value = false;
    };

    // 一口价挂单输入对象
    const creatBuyNowData = ref({
      price: 0,
    });
    // 一口价挂单合约授权
    const listToBuyNowApproving = ref(false);
    // 查询一口价挂单合约授权
    const getBuyNowApproveStatus = async (souvenir) => {
      try {
        const nft = new IErc1155(souvenir.nft_contract);
        listToBuyNowApproving.value = await nft.isApprovedForAll(
          MultiTokenTrustMarketplace.address
        );
      } catch (err) {
        listToAuctionApproving.value = false;
      }
    };
    // 挂单到一口价市场
    const creatToBuyNowMarket = () => {};

    // 拍卖挂单输入对象
    const creatAuctionData = ref({
      amount: 1,
      startBlock: null,
      endBlock: null,
      startPrice: 0,
      fixedPrice: 0,
      minIncrement: 10,
    });
    // 竞拍挂单合约授权
    const listToAuctionApproving = ref(false);
    // 查询竞拍挂单合约授权
    const getAuctionApproveStatus = async (souvenir) => {
      try {
        const nft = new IErc1155(souvenir.nft_contract);
        listToAuctionApproving.value = await nft.isApprovedForAll(souvenir.auction_contract);
      } catch (err) {
        listToAuctionApproving.value = false;
      }
    };
    // Auction合约授权
    const approveAuction = async (souvenir) => {
      loading.value = true;
      let notifyId = notification.loading("Waiting for wallet response");
      const nft = new IErc1155(souvenir.nft_contract);
      console.log(souvenir.auction_contract);
      try {
        const res = await nft.setApprovalForAll(souvenir.auction_contract, (err, txHash) => {
          notification.dismiss(notifyId);
          if (err) {
            console.log(err);
            loading.value = false;
            myNotificationErr(err);
            throw err;
          } else if (txHash) {
            console.log(txHash);
            notification.success(txHash);
            notifyId = notification.loading("Waiting for confirmation on the chain");
          }
        });
        listToAuctionApproving.value = true;
        console.log(res);
        notification.success("Approved");
      } catch (err) {
        console.error(err);
        myNotificationErr(err);
      } finally {
        loading.value = false;
        notification.dismiss(notifyId);
      }
    };
    // 挂单到拍卖市场
    const creatAuctionList = async (souvenir) => {
      loading.value = true;
      let notifyId = notification.loading("Waiting for wallet response");
      console.log(souvenir, MultiTokenAuction);
      try {
        console.log(
          souvenir.auction_contract,
          selectToken.value,
          creatAuctionData.value.startBlock,
          creatAuctionData.value.endBlock,
          creatAuctionData.value.minIncrement,
          souvenir.nft_contract,
          souvenir.id,
          creatAuctionData.value.amount,
          creatAuctionData.value.startPrice,
          creatAuctionData.value.fixedPrice
        );
        await MultiTokenAuction.creatAuction(
          souvenir.auction_contract,
          selectToken.value,
          creatAuctionData.value.startBlock,
          creatAuctionData.value.endBlock,
          creatAuctionData.value.minIncrement,
          souvenir.nft_contract,
          souvenir.id,
          creatAuctionData.value.amount,
          creatAuctionData.value.startPrice,
          creatAuctionData.value.fixedPrice,
          (err, txHash) => {
            notification.dismiss(notifyId);
            if (err) {
              console.log(err);
              loading.value = false;
              myNotificationErr(err);
              throw err;
            } else if (txHash) {
              console.log(txHash);
              notification.success(txHash);
              notifyId = notification.loading("Waiting for confirmation on the chain");
            }
          }
        );
        notification.success("Creat To Auction List Success");
        closeDialog();
        initSouvenirs();
      } catch (err) {
        myNotificationErr(err);
      } finally {
        notification.dismiss(notifyId);
        loading.value = false;
      }
    };
    // 挂单到拍卖市场事件
    const creatToAuctionMarket = async () => {
      if (listToAuctionApproving.value) {
        await creatAuctionList(selectItem.value);
      } else {
        await approveAuction(selectItem.value);
      }
    };

    // 当前快高
    const blockHeight = ref(0);
    // 获取当前快高
    const getBlockHeight = async () => {
      const { block } = await Auction.dater.getDate(new moment());
      blockHeight.value = block;
    };

    // 查看详情
    const goDetail = (item) => {
      const keepsakeId = item.id;
      if (keepsakeId) router.push("/souvenirs/detail/" + keepsakeId);
    };
    onMounted(() => {
      initSouvenirs();
      getBlockHeight();
    });
    // 错误输出
    const myNotificationErr = (err) =>
      notification.error(
        err.message.split("{")[0] ||
          (err.head && err.head.msg) ||
          err.message ||
          (err.data && err.data.message)
      );
    return {
      goDetail,
      souvenirList,
      openListDialog,
      listDialog,
      listToAuctionApproving,
      tabStatus,
      creatAuctionData,
      blockHeight,
      listToBuyNowApproving,
      creatToBuyNowMarket,
      creatToAuctionMarket,
      creatBuyNowData,
      selectItem,
      souvenirListTokens,
      selectToken,
      loading,
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

    .title {
      margin-top: 25px;
      font-size: 22px;
      margin-bottom: 40px;
    }

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
      height: 100%;
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
