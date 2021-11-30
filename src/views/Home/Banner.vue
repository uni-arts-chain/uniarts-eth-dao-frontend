/** * Created by Lay Hunt on 2021-09-06 15:49:53. */
<template>
  <div class="featured-art container">
    <div class="feature-label" v-if="recommmedInfo.id">FEATURED ART</div>
    <div class="body">
      <div class="art" v-if="recommmedInfo.id">
        <div class="art-resource">
          <AdaptiveImage
            class="banner-image"
            width="100%"
            height="100%"
            :isOrigin="false"
            :cover="recommmedInfo.img_main_file1"
            :url="recommmedInfo.property_url"
          />
        </div>
      </div>
      <div class="text" :class="{ 'no-data-text': !recommmedInfo.id }">
        <img src="@/assets/images/banner-logo@2x.png" />
        <h4>Select the most in demand artwork NFT</h4>
        <!-- <router-link :to="votePath" :style="{ background: recommmedInfo.id ? 'black' : '#909399' }">
          START VOTE
        </router-link> -->
        <router-link
          :to="bidPath"
          :style="{
            background: 'black',
            fontSize: '14px',
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '90px',
            paddingRight: '90px',
          }"
        >
          Bid
        </router-link>
      </div>
    </div>
    <div class="artist-info" v-if="recommmedInfo.id">
      <div class="avatar">
        <div class="label">ARTIST:</div>
        <div class="avatar-image">
          <router-link :to="`/artist/${recommmedInfo.artist_uid}`">
            <img v-if="recommmedInfo.artist_avatar" :src="recommmedInfo.artist_avatar" />
            <img v-else src="@/assets/images/avatar@2x.png" />
          </router-link>
          <div class="name">{{ recommmedInfo.artist_name }}</div>
        </div>
      </div>
      <!-- <div class="info">
        <div class="vote-number">Number of votes: 500 Voting period:</div>
        <div class="vote-date">
          <img src="@/assets/images/date-clock.png" />
          <div class="date">2021/09/01-2021/09/08</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from "vue";
import http from "@/plugins/http";
import { notification } from "@/components/Notification";
import AdaptiveImage from "@/components/AdaptiveImage";
export default defineComponent({
  name: "banner",
  components: {
    AdaptiveImage,
  },
  setup() {
    // TODO

    const isLoading = ref(false);
    const recommmedInfo = ref({});
    const requestData = () => {
      isLoading.value = false;
      http
        .globalGetRecommend({})
        .then((res) => {
          isLoading.value = false;
          console.log(res);
          recommmedInfo.value = res;
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          notification.error(err.head ? err.head.msg : err.message);
        });
    };

    onMounted(() => {
      requestData();
    });

    const votePath = computed(() => {
      return recommmedInfo.value.id ? `/vote/${recommmedInfo.value.id}` : "";
    });

    const bidPath = computed(() => {
      return "/vote/auctionlist";
    });

    return {
      recommmedInfo,
      votePath,
      bidPath,
    };
  },
});
</script>

<style lang="scss" scoped>
.featured-art {
  padding-top: 87px;
  margin-bottom: 119px;
  .feature-label {
    font-size: 15px;
    padding-left: 27px;
    color: #040000;
    line-height: 23px;
    margin-bottom: 19px;
    font-weight: 600;
    font-family: Montserrat-Medium;
  }
  .body {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .art {
    padding-left: 30px;
  }
  .text.no-data-text {
    width: 100%;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    img {
      width: 435px;
      height: 100px;
      margin-bottom: 64px;
    }
    h4 {
      font-size: 30px;
      font-weight: 300;
      color: #040000;
      line-height: 41px;
      margin-bottom: 81px;
    }
    a {
      background: #000000;
      border-radius: 7px;
      font-size: 12px;
      font-family: Montserrat-Bold;
      font-weight: bold;
      color: #ffffff;
      line-height: 18px;
      padding: 20px 60px;
      cursor: pointer;
    }
  }
}
.art-resource {
  width: 468px;
  height: 468px;
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
  .avatar .label {
    font-size: 13px;
    font-family: Montserrat-Regular, Montserrat-Light;
    font-weight: 300;
    text-align: left;
    margin-bottom: 5px;
    color: #898989;
    line-height: 24px;
  }
  .avatar .name {
    font-size: 13px;
    font-family: Montserrat-Regular, Montserrat-Light;
    font-weight: 300;
    text-align: left;
    color: #000000;
  }
  .info {
    margin-left: 59px;
    font-size: 13px;
    font-family: Montserrat, Montserrat-Light;
    font-weight: 300;
    text-align: left;
    color: #898989;
    .vote-number {
      padding-left: 26px;
      width: 168px;
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
</style>
