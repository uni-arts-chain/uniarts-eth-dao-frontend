/** * Created by Lay Hunt on 2021-09-06 21:06:32. */
<template>
  <div class="artworks container">
    <div class="title">Featured Artworks</div>
    <div class="list-head">
      <div class="auctions-head">Timed Auctions</div>
      <div class="offers-head">Offers</div>
    </div>
    <div class="list-body">
      <div class="auctions-body" v-if="auctions.length">
        <div
          class="main-item"
          @click="$router.push(`/marketplace/auction/${auctions[0].auction_id}/${auctions[0].id}`)"
        >
          <AdaptiveView :nft="auctions[0]" :isResponsive="true" :isPreview="true" />
        </div>
        <div class="artist-info">
          <div class="avatar">
            <div class="avatar-image" @click="$router.push('/artist/' + auctions[0].artist_uid)">
              <img
                :src="auctions[0].artist_avatar || require('@/assets/images/avatar@2x.png')"
                :alt="auctions[0].artist_name"
              />
              <div class="name">{{ auctions[0].artist_name }}</div>
            </div>
          </div>
          <div class="info">
            <div class="vote-number">
              {{ Number(auctions[0].auction_latest_price) ? "Current High Bid " : "Price " }}
              <span style="color: #fe0000">
                {{
                  Number(auctions[0].auction_latest_price)
                    ? auctions[0].auction_latest_price
                    : auctions[0].auction_fixed_price
                }}
              </span>
              <span> {{ " " + auctions[0].currency_code?.toUpperCase() }}</span>
            </div>
            <div class="vote-date">
              <img src="@/assets/images/date-clock.png" />
              <div class="date">{{ getAuctionDateString }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="offers-body"
        v-if="auctions.filter((item, index) => index >= 1 && index <= 3).length"
      >
        <div
          class="sub-item"
          v-for="item of auctions.filter((item, index) => index >= 1 && index <= 3)"
          :key="item.id"
        >
          <div
            class="item-content"
            @click="$router.push(`/marketplace/auction/${item.auction_id}/${item.id}`)"
          >
            <AdaptiveView :nft="item" :isResponsive="true" :isPreview="true" />
          </div>
          <div class="item-user">
            <span class="username">{{ item.name }}@</span>
            <span style="color: #fe0000">{{
              (Number(item.auction_latest_price)
                ? item.auction_latest_price
                : item.auction_fixed_price) +
              " " +
              item.currency_code?.toUpperCase()
            }}</span>
          </div>
        </div>
      </div>
      <div class="offers-body" v-else>No data temporarily</div>
    </div>
    <div class="list-head">
      <div class="auctions-head">Buy Now</div>
      <div class="offers-head">Offers</div>
    </div>
    <div class="list-body">
      <div class="auctions-body" v-if="artOrderList.length">
        <div class="main-item" @click="$router.push(`/marketplace/buy/${artOrderList[0].id}`)">
          <AdaptiveView :nft="artOrderList[0].art" :isResponsive="true" :isPreview="true" />
        </div>
        <div class="artist-info">
          <div class="avatar">
            <div
              class="avatar-image"
              @click="$router.push('/artist/' + artOrderList[0].art.artist_uid)"
            >
              <img
                :src="artOrderList[0].art.artist_avatar || require('@/assets/images/avatar@2x.png')"
              />
              <div class="name">{{ artOrderList[0].art.artist_name }}</div>
            </div>
          </div>
          <div class="info">
            <div class="vote-number">
              <span> Price </span>
              <span style="color: #fe0000">{{ artOrderList[0].price }}</span>
              <span> {{ artOrderList[0].art.currency_code.toUpperCase() }} </span>
            </div>
            <!--            <div class="vote-date">-->
            <!--              <img src="@/assets/images/date-clock.png" />-->
            <!--              <div class="date">3 Days 23 Hour 59 Minute 59 Second</div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
      <div
        class="offers-body"
        v-if="artOrderList.filter((item, index) => index >= 1 && index <= 3).length"
      >
        <div
          class="sub-item"
          v-for="item of artOrderList.filter((item, index) => index >= 1 && index <= 3)"
          :key="item.id"
        >
          <div class="item-content" @click="$router.push(`/marketplace/buy/${item.id}`)">
            <AdaptiveView :nft="item.art" :isResponsive="true" :isPreview="true" />
          </div>
          <div class="item-user">
            <span class="username">{{ item.art.name }} @</span>
            <span style="color: #fe0000">{{ item.price }}</span>
            <span>{{ item.art.currency_code.toUpperCase() }}</span>
          </div>
        </div>
      </div>
      <div class="offers-body" v-else>No data temporarily</div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeMount, onMounted, reactive, ref } from "vue";
import http from "@/plugins/http";
import AdaptiveView from "@/components/AdaptiveView";
import Auction from "@/contracts/Auction";
import moment from "moment";

export default defineComponent({
  name: "artworks",
  components: {
    AdaptiveView,
  },
  setup() {
    const auctions = ref([]);
    const now = ref(new Date());
    let interval = null;
    const startEnd = reactive({});
    const dataMessage = ref("");
    const getAuctionDate = async (auction) => {
      try {
        const { timestamp: startDate } = await Auction.dater.getBlockWrapper(
          auction.auction_open_block
        );
        startEnd.startDate = new Date(startDate * 1000);
      } catch (e) {
        console.error(e);
      }
      try {
        const { timestamp: endDate } = await Auction.dater.getBlockWrapper(
          auction.auction_expiry_block
        );
        startEnd.endDate = new Date(endDate * 1000);
      } catch (e) {
        console.error(e);
      }
      if (!startEnd.startDate) {
        dataMessage.value = "Auction not started";
      } else if (!startEnd.endDate) {
        const blockHeight = await Auction.dater.getDate(new moment());
        now.value =
          ((new Date() - startEnd.startDate) * (auction.auction_expiry_block - blockHeight.block)) /
          (blockHeight.block - auction.auction_open_block);
      } else {
        dataMessage.value = "Auction is over";
      }
    };
    const getAuctionDateString = computed(() => {
      if (dataMessage.value) {
        return dataMessage;
      } else {
        let second = now.value / 1000;
        const day = (second / (60 * 60 * 24)).toFixed(0);
        second = second % (60 * 60 * 24);
        const hour = (second / (60 * 60)).toFixed(0);
        second = second % (60 * 60);
        const minute = (second / 60).toFixed(0);
        second = (second % 60).toFixed(0);
        return `${day} Days ${hour} Hour ${minute} Minute ${second} Second`;
      }
    });
    const artOrderList = ref([]);
    onMounted(async () => {
      http
        .globalGetArtOrderRecommend({ size: 4 })
        .then((res) => {
          artOrderList.value = res || [];
        })
        .catch((err) => {
          console.log(err);
        });
      const data = await http.globalGetAuctionsRecommend({ size: 4 });
      auctions.value = data?.auction || [];
      if (auctions.value.length) {
        await getAuctionDate(auctions.value[0]);
        interval = setInterval(() => (now.value -= 1000), 1000);
      }
    });
    onBeforeMount(() => {
      if (interval) {
        clearInterval(interval);
      }
    });
    return { auctions, getAuctionDateString, artOrderList };
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin-top: 159px;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: #000000;
  line-height: 48px;
  margin-bottom: 81px;
}

.list-head {
  margin-bottom: 38px;
  display: flex;
  justify-content: center;

  .auctions-head {
    font-size: 18px;
    font-family: Montserrat-Medium;
    font-weight: 400;
    width: 492px;
    text-align: left;
    color: #040000;
    line-height: 23px;
  }

  .offers-head {
    font-size: 18px;
    margin-left: 196px;
    width: 143px;
    font-family: Montserrat-Medium;
    font-weight: 400;
    text-align: left;
    color: #040000;
    line-height: 23px;
  }
}

.list-body {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .auctions-body {
    .main-item {
      width: 492px;
      height: 540px;
      overflow: hidden;
      box-shadow: 3px 4px 12px 12px rgba(34, 24, 20, 0.11);

      img {
        height: 100%;
      }
    }

    .artist-info {
      padding-left: 30px;
      margin-top: 23px;
      overflow: hidden;

      .avatar {
        float: left;
        margin-bottom: 10px;
      }

      .info {
        float: left;
      }

      .avatar-image {
        display: flex;
        align-items: center;

        img {
          background-color: black;
          overflow: hidden;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          box-shadow: 3px 4px 9px 0px rgba(34, 24, 20, 0.52);
        }

        .name {
          margin-left: 14px;
          font-size: 13px;
          font-family: Montserrat-Regular, Montserrat-Light;
          font-weight: 300;
          text-align: left;
          color: #000000;
        }
      }

      .avatar .name {
        font-size: 13px;
        font-family: Montserrat-Regular, Montserrat-Light;
        font-weight: 300;
        text-align: left;
        color: #000000;
      }

      .info {
        margin-left: 39px;
        font-size: 13px;
        font-family: Montserrat, Montserrat-Light;
        font-weight: 300;
        text-align: left;
        color: #898989;

        .vote-number {
          font-size: 13px;
          font-weight: 300;
          text-align: center;
          color: #040000;
          line-height: 24px;
          line-height: 36px;
        }

        .vote-date {
          display: flex;
          align-items: center;
          margin-top: 7px;
        }

        .vote-date img {
          width: 20px;
          height: 20px;
        }

        .vote-date .date {
          margin-left: 5px;
        }
      }
    }
  }

  .offers-body {
    margin-left: 196px;
    margin-bottom: 110px;

    .sub-item {
      margin-bottom: 31px;

      .item-content {
        width: 143px;
        height: 143px;
        overflow: hidden;

        img {
          height: 100%;
        }
      }

      .item-user {
        font-size: 13px;
        font-family: Montserrat-Regular, Montserrat-Light;
        font-weight: 300;
        text-align: left;
        color: #898989;
        margin-top: 15px;
        line-height: 24px;

        .username {
          margin-right: 17px;
        }
      }
    }
  }
}
</style>
