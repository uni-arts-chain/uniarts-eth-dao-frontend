/** * Created by Lay Hunt on 2021-09-09 18:08:37. */
<template>
  <div class="item">
    <div class="nft">
      <AdaptiveView :isResponsive="true" :nft="item" />
    </div>
    <div class="info">
      <div class="title">{{ item.name }}</div>
      <Progress :value="formatPercent((item.number / (item.total || 1)) * 100)" />
      <div class="votes-group">
        <div class="number-votes">Current votes: {{ item.number }}</div>
        <div class="totl">Total：{{ item.total }}</div>
      </div>
      <div class="user-info">
        <img :src="item.artist_avatar ? item.artist_avatar : Avatar" />
        <div class="username">{{ item.artist_name }}</div>
      </div>
      <div class="token-info">
        <div class="token">
          Token mint:
          <span
            style="
              font-size: 20px;
              margin-left: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 150px;
              white-space: nowrap;
            "
            >{{ formatNumber(item.token_mint) }}</span
          >
          UART
        </div>
        <div class="bid">
          {{ Number(item.auction_latest_price) ? "Current High Bid" : "Price" }}：<span
            style="font-size: 20px; margin-left: 10px"
            >{{
              Number(item.auction_latest_price) ? item.auction_latest_price : item.auction_min_bid
            }}</span
          >
          {{ item.biding_coin?.toUpperCase() }}
        </div>
      </div>
      <div class="bid-group">
        <div class="label">
          <span>Bid History</span>
          <span>Total {{ item.biding_count }} Bids</span>
        </div>
        <button @click="goAuction(item.auction_id, item.id)">Place a Bid</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, toRefs } from "vue";
import { useRouter } from "vue-router";
import { BigNumber } from "@/plugins/bignumber";
import DappConfig from "@/config/dapp";
import Progress from "@/components/Progress";
import Avatar from "@/assets/images/avatar@2x.png";
import AdaptiveView from "@/components/AdaptiveView";
import VoteMining from "@/contracts/VoteMining";
export default defineComponent({
  name: "auction",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Progress,
    AdaptiveView,
  },
  setup(props) {
    // TODO

    const router = useRouter();

    const goAuction = (uid, id) => {
      router.push("/marketplace/auction/" + uid + "/" + id);
    };
    const formatPercent = (number) => {
      return new BigNumber(number).toFixed(2, 1);
    };

    const { item } = toRefs(props);

    watch(item, () => {
      getMintRewards();
    });

    const getMintRewards = async () => {
      if (item && item.value.token_id >= 0) {
        const tokenMint = await VoteMining.getMintRewards(
          item.value.nft_contract,
          item.value.token_id
        );
        if (!new BigNumber(tokenMint).isZero()) {
          item.value.token_mint = new BigNumber(tokenMint)
            .shiftedBy(-DappConfig.config.tokens.UART.decimals)
            .toString();
        }
      }
    };

    const formatNumber = (string) => {
      return new BigNumber(string || 0).toFixed(1, 1);
    };

    return {
      goAuction,
      formatPercent,
      formatNumber,
      Avatar,
    };
  },
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
}
.nft {
  width: 520px;
  height: 573px;
  /* background-color: black; */
}
.info {
  width: 434px;
  margin-left: 149px;
  .title {
    font-size: 32px;
    font-family: Montserrat-Medium;
    font-weight: 500;
    text-align: left;
    color: #000000;
    margin-bottom: 15px;
  }
  .desc {
    font-size: 18px;
    font-family: Montserrat-Medium;
    font-weight: 500;
    text-align: left;
    color: #000000;
    margin-bottom: 23px;
  }
  .votes-group {
    display: flex;
    justify-content: space-between;
    > div {
      margin-top: 13px;
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #595757;
    }
  }
  .user-info {
    margin-top: 45px;
    display: flex;
    align-items: center;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      box-shadow: 3px 4px 9px 0px rgba(34, 24, 20, 0.52);
    }
    .username {
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      margin-left: 15px;
      color: #231815;
      line-height: 24px;
    }
  }
  .token-info {
    margin-top: 32px;
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #595757;
    > div {
      margin-bottom: 10px;
    }
  }
  .bid-group {
    margin-top: 63px;
    .label {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 400;
      width: 376px;
      text-align: left;
      color: #595757;
      line-height: 27px;
    }
    button {
      margin-top: 8px;
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 400;
      text-align: left;
      color: #898989;
      line-height: 18px;
      width: 376px;
      height: 48px;
      text-align: center;
      cursor: pointer;
      background: transparent;
      border: 2px solid #898989;
    }
  }
}
</style>
