/** * Created by Lay Hunt on 2021-09-08 23:08:43. */
<template>
  <div class="detail" v-if="!$store.state.global.isMobile">
    <div class="head">
      <span>NFT Name</span>
      <button @click="onBack">Back</button>
    </div>
    <div class="nft">
      <img
        class="img"
        src="https://ipfs.pixura.io/ipfs/QmbBmVPHkXQFcUHUw1ETKsq3m51iUjCNkJwop9L44uiAmV/FinalWithGradient.jpg"
      />
    </div>
    <div class="info">
      <div class="nft-info">
        <div class="title">Additional Info</div>
        <div class="address">
          <span>NFT Address:</span>
          <span style="margin-left: 31px">0xsbd354sdf42354sdf441d354s54...</span>
          <div class="copy" @click="onCopy(1)">Copy</div>
          <el-popover placement="top" width="80" trigger="hover">
            <template #reference>
              <img class="qr" src="@/assets/images/qr@2x.png" />
            </template>
            <Qrcode
              class="qr-code"
              style="border: none"
              :scale="5"
              :typeNumber="7"
              data="0xsbd354sdf42354sdf441d354s54"
            />
          </el-popover>
        </div>
        <div class="votes">
          <div class="title">Number of votes obtained</div>
          <div class="progress">
            <Progress :value="52" />
            <div class="label">3000 of 45000</div>
          </div>
          <div class="nft-desc">
            <div class="title">ARTWORK INFORMATION</div>
            <div class="nft-desc-body">
              <div class="name-body">
                <div class="name">Name</div>
                <div class="artist-name">Artist: XYZ</div>
                <div class="token-mint">Token mint: 251 Uink</div>
              </div>
              <div class="desc-body">
                "Planet spirit" is an oil painting created by in 2010. After successful creation, it
                has aroused great repercussions and won great recognition in the circle, which also
                led to the introduction of the work, introduction...
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="artist-info">
        <div class="title">ABOUT ARTIST</div>
        <div class="avatar">
          <img src="https://avatars.githubusercontent.com/u/87279659?v=4" />
        </div>
        <div class="username">Kyle Bighead</div>
        <div class="user-desc">
          "Planet spirit" is an oil painting created by in 2010. After successful creation, it has
          aroused great repercussions and won great recognition in the circle, which also led to the
          introduction of the work, introduction...
        </div>
        <router-link class="more" to="/artist/1">More ></router-link>
      </div>
    </div>
  </div>
  <div class="detail container" v-else>
    <div class="nft">
      <img
        class="img"
        src="https://ipfs.pixura.io/ipfs/QmbBmVPHkXQFcUHUw1ETKsq3m51iUjCNkJwop9L44uiAmV/FinalWithGradient.jpg"
      />
    </div>
    <div class="info">
      <div class="nft-info">
        <div class="title">Additional Info</div>
        <div class="address">
          <span>NFT Address:</span>
          <span class="address-span">0xsbd354sdf42354sdf441d354s54</span>
          <div class="copy" @click="onCopy(1)">Copy</div>
          <el-popover placement="top" width="80" trigger="hover">
            <template #reference>
              <img class="qr" src="@/assets/images/qr@2x.png" />
            </template>
            <Qrcode
              class="qr-code"
              style="border: none"
              :scale="5"
              :typeNumber="7"
              data="0xsbd354sdf42354sdf441d354s54"
            />
          </el-popover>
        </div>
        <div class="votes">
          <div class="title">Number of votes obtained</div>
          <div class="progress">
            <Progress :value="52" />
            <div class="label">3000 of 45000</div>
          </div>
          <div class="nft-desc">
            <div class="title">ARTWORK INFORMATION</div>
            <div class="nft-desc-body">
              <div class="name-body">
                <div class="name">Name</div>
                <div class="artist-name">Artist: XYZ</div>
              </div>
              <div class="desc-body">
                "Planet spirit" is an oil painting created by in 2010. After successful creation, it
                has aroused great repercussions and won great recognition in the circle, which also
                led to the introduction of the work, introduction...
              </div>
            </div>
          </div>
        </div>
        <div class="artist-info">
          <div class="title">ABOUT ARTIST</div>
          <div class="avatar">
            <img src="https://avatars.githubusercontent.com/u/87279659?v=4" />
          </div>
          <div class="username">Kyle Bighead</div>
          <div class="user-desc">
            "Planet spirit" is an oil painting created by in 2010. After successful creation, it has
            aroused great repercussions and won great recognition in the circle, which also led to
            the introduction of the work, introduction...
          </div>
          <router-link class="more" to="/artist/1">More ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import Qrcode from "@/components/Qrcode";
import Progress from "@/components/Progress";
import copy from "clipboard-copy";
export default defineComponent({
  name: "detail",
  components: {
    Qrcode,
    Progress,
  },
  setup() {
    // TODO

    const router = useRouter();

    store.dispatch("global/SetNavText", "Detail");

    const onCopy = (value) => {
      copy(value);
    };

    const onBack = () => {
      router.push("/marketplace");
    };

    return {
      onCopy,
      onBack,
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
    }
    .nft-desc-body {
      display: flex;
      justify-content: space-between;
      .name-body {
        .name {
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
      background-color: black;
      margin-bottom: 31px;
      overflow: hidden;
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
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: justifyLeft;
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
