/** * Created by Lay Hunt on 2021-09-08 23:08:43. */
<template>
  <div class="detail" v-loading="isLoading" v-if="!$store.state.global.isMobile">
    <div class="head">
      <span>{{ info.name }}</span>
      <button @click="onBack">Back</button>
    </div>
    <div class="nft">
      <AdaptiveView width="100%" height="100%" :nft="info" />
    </div>
    <div class="info">
      <div class="nft-info">
        <div class="title">Additional Info</div>
        <div class="address">
          <span class="address-label">NFT Address:</span>
          <span
            style="width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
            >{{ info.nft_contract }}</span
          >
          <div class="copy" @click="onCopy(info.nft_contract)">Copy</div>
          <el-popover placement="top" width="80" trigger="hover">
            <template #reference>
              <img class="qr" src="@/assets/images/qr@2x.png" />
            </template>
            <Qrcode
              class="qr-code"
              style="border: none"
              :scale="5"
              :typeNumber="7"
              :data="info.nft_contract"
            />
          </el-popover>
        </div>
        <div class="address" v-if="info.token_id !== null">
          <span class="address-label">Token ID:</span><span>{{ info.token_id }}</span>
        </div>
        <div class="votes">
          <!-- <div class="title">Number of votes obtained</div> -->
          <!-- <div class="progress">
            <Progress :value="52" />
            <div class="label">3000 of 45000</div>
          </div> -->
          <div class="nft-desc">
            <div class="title">ARTWORK INFORMATION</div>
            <div class="nft-desc-body">
              <div class="name-body">
                <div class="name">{{ info.name }}</div>
                <div class="artist-name">Artist: {{ info.artist_name }}</div>
                <!-- <div class="token-mint">Token mint: 251</div> -->
              </div>
              <div class="desc-body" v-html="info.artist_info"></div>
            </div>
            <button v-if="info.for_sale_type" class="buy-button" @click="goMarket">Buy Now</button>
          </div>
        </div>
        <div class="votes" v-if="info.is_couple && info.mate_couple?.art_id">
          <div class="nft-desc">
            <div class="title">COUPLE SERIES</div>
            <div class="nft-desc-body">
              <div class="name-body">
                <div class="name">{{ info.mate_couple.name }}</div>
                <div class="artist-name">Artist: {{ info.mate_couple.artist_name }}</div>
              </div>
              <div class="desc-body">
                <div class="nft-desc-body-item" @click="goCouple(info.mate_couple)">
                  <AdaptiveImage
                    width="100%"
                    height="100%"
                    :isPreview="true"
                    :isOrigin="false"
                    :url="info.mate_couple.property_url"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="artist-info">
        <div class="title">ABOUT ARTIST</div>
        <div class="avatar" v-if="info.artist_avatar">
          <img :src="info.artist_avatar" />
        </div>
        <div class="username">{{ info.artist_name }}</div>
        <div class="user-desc" v-html="info.artist_info"></div>
      </div>
    </div>
  </div>
  <div class="detail container" v-else>
    <div class="nft">
      <AdaptiveView width="100%" height="100%" :nft="info" />
    </div>
    <div class="info" v-loading="isLoading">
      <div class="nft-info">
        <div class="title">Additional Info</div>
        <div class="address">
          <span class="address-label">NFT Address:</span>
          <span class="address-span">{{ info.nft_contract }}</span>
          <div class="copy" @click="onCopy(info.nft_contract)">Copy</div>
          <el-popover placement="top" width="80" trigger="hover">
            <template #reference>
              <img class="qr" src="@/assets/images/qr@2x.png" />
            </template>
            <Qrcode
              class="qr-code"
              style="border: none"
              :scale="5"
              :typeNumber="7"
              :data="info.nft_contract"
            />
          </el-popover>
        </div>
        <div class="address" style="justify-content: flex-start" v-if="info.token_id !== null">
          <span class="address-label">Token ID:</span>
          <span>{{ info.token_id }}</span>
        </div>
        <div class="votes">
          <!-- <div class="title">Number of votes obtained</div> -->
          <!-- <div class="progress">
            <Progress :value="52" />
            <div class="label">3000 of 45000</div>
          </div> -->
          <div class="nft-desc">
            <div class="title">ARTWORK INFORMATION</div>
            <div class="nft-desc-body">
              <div class="name-body">
                <div class="name">{{ info.name }}</div>
                <div class="artist-name">Artist: {{ info.artist_name }}</div>
              </div>
              <div class="desc-body" v-html="info.artist_info"></div>
            </div>
            <button v-if="info.for_sale_type" class="buy-button" @click="goMarket">Buy Now</button>
          </div>
        </div>
        <div class="votes" v-if="info.is_couple && info.mate_couple?.art_id">
          <div class="nft-desc">
            <div class="title">COUPLE SERIES</div>
            <div class="nft-desc-body">
              <div class="name-body">
                <div class="name">{{ info.mate_couple.name }}</div>
                <div class="artist-name">Artist: {{ info.mate_couple.artist_name }}</div>
              </div>
              <div class="desc-body">
                <div class="nft-desc-body-item" @click="goCouple(info.mate_couple)">
                  <AdaptiveImage
                    width="100%"
                    height="100%"
                    :isPreview="true"
                    :isOrigin="false"
                    :url="info.mate_couple.property_url"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="artist-info">
          <div class="title">ABOUT ARTIST</div>
          <div class="avatar" v-if="info.artist_avatar">
            <img :src="info.artist_avatar" />
          </div>
          <div class="username">{{ info.artist_name }}</div>
          <div class="user-desc" v-html="info.artist_info"></div>
          <!-- <router-link class="more" to="/artist/1">More ></router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { notification } from "@/components/Notification";
import AdaptiveView from "@/components/AdaptiveView";
import AdaptiveImage from "@/components/AdaptiveImage";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import http from "@/plugins/http";
import Qrcode from "@/components/Qrcode";
// import Progress from "@/components/Progress";
import copy from "clipboard-copy";
export default defineComponent({
  name: "detail",
  components: {
    Qrcode,
    // Progress,
    AdaptiveView,
    AdaptiveImage,
  },
  setup() {
    // TODO

    store.dispatch("global/SetNavText", "Detail");

    const route = useRoute();
    const router = useRouter();

    const onCopy = (value) => {
      copy(value);
    };

    const onBack = () => {
      history.back();
    };

    const info = ref({});
    const isLoading = ref(false);
    const artId = computed(() => route.params.id);

    const requestData = () => {
      isLoading.value = true;
      info.value = {};
      http
        .globalGetArtDetail(
          {},
          {
            id: artId.value,
          }
        )
        .then((res) => {
          console.log(res);
          isLoading.value = false;
          info.value = res;
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          notification.error(err.head ? err.head.msg : err.message);
        });
    };
    const goCouple = (mate_couple) => {
      // if (mate_couple?.for_sale_id) {
      //   router.push("/marketplace/buy/" + mate_couple.for_sale_id);
      // } else {
      router.push("/marketplace/detail/" + mate_couple?.art_id);
      // }
    };

    const goMarket = () => {
      let id = info.value.for_sale_id;
      if (info.value.for_sale_type == "buy_now") {
        router.push("/marketplace/buy/" + id);
      } else if (info.value.for_sale_type == "auction") {
        router.push("/marketplace/auction/" + id + "/" + info.value.id);
      }
    };

    onMounted(() => {
      requestData();
    });

    watch(artId, requestData);

    return {
      onCopy,
      onBack,
      info,
      isLoading,

      requestData,
      goCouple,
      goMarket,
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
}
.head {
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 32px;
    font-family: Montserrat-Medium;
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
.nft {
  margin-top: 31px;
  width: 100%;
  height: 647px;
  .img {
    width: 100%;
    height: 100%;
    background-color: black;
  }
}
.info {
  margin-top: 83px;
  display: flex;
  justify-content: space-between;
  .nft-info {
    width: 50%;
    .title {
      font-size: 24px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      line-height: 31px;
    }
    .address {
      margin-top: 24px;
      font-size: 12px;
      font-family: Montserrat, Montserrat-Light;
      font-weight: 300;
      text-align: left;
      color: #595757;
      line-height: 27px;
      display: flex;
      align-items: center;
      margin-bottom: 24px;
    }
    .copy {
      width: 39px;
      cursor: pointer;
      height: 22px;
      line-height: 22px;
      color: #82a0e6;
      padding-right: 8px;
      margin-left: 17px;
      border-right: 1px solid #ddd;
    }
    .qr {
      margin-left: 8px;
      width: 21px;
      height: 21px;
      cursor: pointer;
    }
  }
  .votes {
    .title {
      margin-bottom: 24px;
      font-size: 14px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      line-height: 31px;
    }
    .progress {
      width: 300px;
      height: 17px;
      margin-bottom: 82px;
      .label {
        font-size: 12px;
        font-family: Montserrat-Regular;
        font-weight: 300;
        text-align: left;
        color: #595757;
        line-height: 20px;
        margin-top: 8px;
        float: right;
      }
    }
    .progress-bar {
      width: 100%;
      height: 100%;
    }
    .nft-desc .title {
      font-size: 18px;
      font-family: Montserrat-Regular;
      font-weight: 400;
      text-align: center;
      color: #898989;
      line-height: 27px;
      margin-top: 110px;
    }
    .nft-desc-body {
      display: flex;
      justify-content: space-between;
      .name-body {
        .name {
          width: 92px;
          font-size: 14px;
          font-family: Montserrat-Medium;
          font-weight: 400;
          text-align: left;
          color: #000000;
          padding-bottom: 19px;
          position: relative;
          margin-bottom: 19px;
        }
        .name::after {
          content: "";
          width: 20px;
          height: 3px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: black;
        }
        .artist-name,
        .token-mint {
          width: 122px;
          font-size: 12px;
          font-family: Montserrat-Regular;
          font-weight: 300;
          text-align: left;
          color: #898989;
          margin-bottom: 2px;
          line-height: 18px;
        }
      }
      .desc-body {
        width: 292px;
        font-size: 12px;
        font-family: Montserrat-Regular;
        font-weight: 300;
        color: #898989;
        line-height: 18px;
      }
      .nft-desc-body-item {
        width: 200px;
        height: 200px;
        cursor: pointer;
      }
      .nft-desc-body-detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 40px;
      }
      .nft-desc-body-detail-artist {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .avatar {
          width: 30px;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .artist-info {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding-left: 180px;
    .title {
      font-size: 12px;
      font-family: Montserrat-Bold;
      font-weight: SemiBold;
      text-align: left;
      color: #231815;
      line-height: 24px;
      margin-bottom: 24px;
    }
    .avatar {
      width: 111px;
      height: 111px;
      border-radius: 50%;
      margin-bottom: 31px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
      }
    }
    .username {
      font-size: 18px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
      line-height: 24px;
      margin-bottom: 12px;
    }
    .user-desc {
      width: 306px;
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      color: #898989;
      line-height: 18px;
      margin-bottom: 22px;
    }
    .more {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
      line-height: 31px;
    }
  }
}

.address-label {
  display: block;
  width: 80px;
  margin-right: 31px;
}

.buy-button {
  width: 100%;
  border: 2px solid #000000;
  border-radius: 7px;
  font-weight: bold;
  background: transparent;
  color: black;
  line-height: 18px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 0;
  margin-top: 30px;
}

@media screen and (max-width: 750px) {
  .detail {
    width: 100%;
    padding-top: 0px;
    padding-bottom: 60px;
  }
  .nft {
    margin-top: 0;
    width: 100%;
    height: 270px;
  }
  .info .votes .nft-desc-body .nft-desc-body-item {
    width: 150px;
    height: 150px;
    cursor: pointer;
  }
  .info {
    margin-top: 20px;
    .nft-info {
      width: 100%;
      .title {
        font-size: 20px;
        font-family: Montserrat-Medium;
        font-weight: 800;
      }
      .address {
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        .address-span {
          width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .copy {
        margin-left: 0;
        width: 50px;
      }
      .qr {
        margin-left: 0;
      }
      .votes {
        .title {
          font-size: 16px;
        }
        .progress {
          width: 100%;
          .label {
            font-size: 14px;
          }
        }
        .nft-desc-body .desc-body {
          width: 55%;
        }
        .nft-desc-body .name-body {
          width: 45%;
        }
      }
      .address-label {
        width: 100px;
      }
    }
    .artist-info {
      margin-top: 70px;
      width: 100%;
      padding-left: 0;
      .title {
        text-align: center;
        font-size: 16px;
      }
      .avatar {
        margin: 0 auto;
        margin-top: 10px;
      }
      .username {
        margin-top: 20px;
        text-align: center;
      }
      .user-desc {
        margin-top: 20px;
        font-size: 16px;
        line-height: 1.5;
      }
      .more {
        text-align: center;
        font-size: 15px;
      }
    }
  }
}
</style>
