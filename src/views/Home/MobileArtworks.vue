/** * Created by Lay Hunt on 2021-09-18 01:29:38. */
<template>
  <div class="mobile-artworks">
    <div class="artworks">Featured Artworks</div>
    <div class="tabs">
      <div class="tab-head">
        <div :class="{ active: curTab === 1 }" class="tab-head-item" @click="curTab = 1">
          Timed Auctions
        </div>
        <div :class="{ active: curTab === 2 }" class="tab-head-item" @click="curTab = 2">
          Buy Now
        </div>
      </div>
      <div v-if="curTab === 1" class="tab-body">
        <div v-for="item of auctions" :key="item.id" class="item">
          <AdaptiveView
            :nft="item"
            height="330px"
            width="330px"
            :isResponsive="true"
            :isPreview="true"
            @click="$router.push(`/marketplace/auction/${item.auction_id}/${item.id}`)"
          />
          <div class="info">
            <div
              class="name"
              @click="$router.push(`/marketplace/auction/${item.auction_id}/${item.id}`)"
            >
              {{ item.name }}
            </div>
            <div class="price">
              {{ Number(item.auction_latest_price) ? "Current High Bid" : "Price" }}
              <span style="color: red">{{
                (Number(item.auction_latest_price)
                  ? item.auction_latest_price
                  : item.auction_fixed_price) +
                " " +
                item.currency_code?.toUpperCase()
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="curTab === 2" class="tab-body">
        <div v-for="item of artOrderList" :key="item.id" class="item">
          <AdaptiveView
            :nft="item.art"
            height="330px"
            width="330px"
            :isResponsive="true"
            :isPreview="true"
            @click="$router.push(`/marketplace/buy/${item.id}`)"
          />
          <div class="info">
            <div class="name" @click="$router.push(`/marketplace/buy/${item.id}`)">
              {{ item.art.name }}
            </div>
            <div class="price">
              Price
              <span style="color: red">{{
                item.price + " " + item.art.currency_code?.toUpperCase()
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import AdaptiveView from "@/components/AdaptiveView";
import http from "@/plugins/http";

export default defineComponent({
  name: "mobile-artworks",
  components: {
    AdaptiveView,
  },
  setup() {
    // TODO
    const curTab = ref(1);
    const auctions = ref([]);
    // const nft = {
    //   img_main_file1: {
    //     url: "https://bitflix-assets.s3.us-east-2.amazonaws.com/miner_pool/property/img/1/d128ae2b-ffb4-41c8-87d8-41c08e4a9cda.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA6PPSF6Y2ZB5JF5HX%2F20210917%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210917T171518Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=191d92380da0fe41a9ba47a0fe9ca3fc9c9cdccc4b709667021be50cf899061a",
    //   },
    //   property_url:
    //     "https://bitflix-assets.s3.us-east-2.amazonaws.com/miner_pool/property/img/1/d128ae2b-ffb4-41c8-87d8-41c08e4a9cda.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA6PPSF6Y2ZB5JF5HX%2F20210917%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210917T171518Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=191d92380da0fe41a9ba47a0fe9ca3fc9c9cdccc4b709667021be50cf899061a",
    // };
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
    });
    return {
      curTab,
      artOrderList,
      auctions,
    };
  },
});
</script>

<style lang="scss" scoped>
.mobile-artworks {
  padding-bottom: 80px;
}

.artworks {
  margin-top: 50px;
  font-family: Montserrat-Bold;
  font-weight: 700;
  text-align: center;
  font-size: 19px;
  color: #000000;
  line-height: 46px;
}

.tab-head {
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .tab-head-item {
    width: 40%;
    padding: 5px 0px;
    text-align: center;
    border-bottom: 2px solid #cbcccc;
    font-family: Montserrat-Medium;
    color: #000000;
    font-weight: 600;
    line-height: 46px;
  }

  .tab-head-item.active {
    border-bottom: 2px solid black;
  }
}

.item {
  margin-top: 40px;

  .adaptive-view {
    margin: 0 auto;
  }

  .info {
    margin: 0 auto;
    margin-top: 5px;
    width: 330px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #040000;
      line-height: 50px;
    }

    .price {
      font-family: Montserrat-Light;
      font-weight: 300;
      text-align: right;
      color: #040000;
      line-height: 50px;
    }
  }
}
</style>
