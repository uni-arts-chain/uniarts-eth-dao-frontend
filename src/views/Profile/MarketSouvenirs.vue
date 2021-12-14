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
        <div class="input-body" v-show="selectItem.amount > 1">
          <span class="unit">Amount</span>
          <input v-model="creatAuctionData.amount" />
        </div>
        <div class="block-height" v-show="selectItem.amount > 1">
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
          <span class="unit unit2">USDT</span>
        </div>
        <div class="input-body">
          <span class="unit">Fixed Price</span>
          <input v-model="creatAuctionData.fixedPrice" />
          <span class="unit unit2">USDT</span>
        </div>
        <div class="input-body">
          <span class="unit">Min Increment</span>
          <input v-model="creatAuctionData.minIncrement" />
          <span class="unit unit2">%</span>
        </div>
        <button @click="creatToAuctionMarket">
          {{ listToAuctionApproving ? "Creat on Auction Market" : "Approve" }}
        </button>
      </div>
      <div v-show="listSelect === 1">
        <div class="input-body">
          <input v-model="creatBuyNowData.price" />
          <span class="unit unit2">USDT</span>
        </div>
        <button @click="creatToBuyNowMarket">
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

export default defineComponent({
  name: "MarketSouvenirs",
  components: {
    Dialog,
    Progress,
  },
  setup() {
    const router = useRouter();
    const selectItem = ref({});
    const listDialog = ref(false);
    const souvenirList = ref([]);
    const listToAuctionApproving = ref(false);
    const listToBuyNowApproving = ref(false);
    const listSelect = ref(1);
    const blockHeight = ref(0);
    const creatAuctionData = ref({
      amount: 1,
      startBlock: null,
      endBlock: null,
      startPrice: 0,
      fixedPrice: 0,
      minIncrement: 10,
    });
    const creatBuyNowData = ref({
      price: 0,
    });
    const creatToBuyNowMarket = () => {};
    const creatToAuctionMarket = () => {};
    const initSouvenirs = async () => {
      souvenirList.value = await http.userGetSouvenirsMine({});
    };
    const openListDialog = (item) => {
      selectItem.value = item;
      listDialog.value = true;
    };
    const getBlockHeight = async () => {
      const { block } = await Auction.dater.getDate(new moment());
      blockHeight.value = block;
    };

    const goDetail = (item) => {
      const keepsakeId = item.id;
      if (keepsakeId) router.push("/souvenirs/detail/" + keepsakeId);
    };
    onMounted(() => {
      initSouvenirs();
      getBlockHeight();
    });
    return {
      goDetail,
      souvenirList,
      openListDialog,
      listDialog,
      listToAuctionApproving,
      listSelect,
      creatAuctionData,
      blockHeight,
      listToBuyNowApproving,
      creatToBuyNowMarket,
      creatToAuctionMarket,
      creatBuyNowData,
      selectItem,
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
