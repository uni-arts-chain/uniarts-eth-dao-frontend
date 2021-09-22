/** * Created by Lay Hunt on 2021-09-09 22:08:39. */
<template>
  <div class="auction container">
    <div class="left">
      <div class="title">NFT Name</div>
      <div class="desc-title">Artwork description</div>
      <div class="desc-content">
        "Planet spirit" is an oil painting created by in 2010. After successful creation, it has
        aroused great repercussions and won great recognition in the circle, which also led to the
        introduction of the work, introduction...
      </div>
      <div class="more">More ></div>
      <div class="number-votes">Number of votes obtained</div>
      <Progress :value="52" />
      <div class="number-vote-value">3000 of 45000</div>
      <div class="token-info">
        <div class="token">
          <span>Token mint:&nbsp;&nbsp;</span>
          <span class="value">251</span>Uink
        </div>
        <div class="bid">
          <span>Current High Bid: &nbsp;&nbsp;</span>
          <span class="value">1500</span>Tether
        </div>
      </div>
      <div class="bid-history">
        <div class="bid-title">
          <span style="font-family: Montserrat-Bold">Bid History</span>
          <span>Total 4 Bids</span>
        </div>
        <div class="button-group">
          <button>Make an Offer</button>
          <button>Collect Now</button>
        </div>
        <div class="bid-list">
          <div class="item">@Bighead made an offer of 1500 USDC</div>
          <div class="item">@Smallhead made an offer of 1200 USDC</div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="nft">
        <img
          style="width: 520px; height: 515px"
          src="https://ipfs.pixura.io/ipfs/QmbBmVPHkXQFcUHUw1ETKsq3m51iUjCNkJwop9L44uiAmV/FinalWithGradient.jpg"
        />
      </div>
      <div class="notice">
        <img src="@/assets/images/date-clock.png" />
        6 Days 23 Hour 59 Minute 59 Second
      </div>
    </div>
    <div class="right">
      <div class="back">
        <button @click="onBack">Back</button>
      </div>
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
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import Progress from "@/components/Progress";
export default defineComponent({
  name: "auction",
  components: {
    Progress,
  },
  setup() {
    // TODO
    const router = useRouter();

    store.dispatch("global/SetNavText", "Auction");

    const onBack = () => {
      router.push("/vote");
    };

    return {
      onBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.auction {
  margin-top: 132px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 131px;
  .left {
    width: 309px;
    .title {
      width: 100%;
      font-size: 32px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      margin-bottom: 85px;
    }
    .desc-title {
      font-size: 14px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      margin-bottom: 14px;
    }
    .desc-content {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      color: #898989;
      line-height: 18px;
      margin-bottom: 17px;
    }
    .more {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
      margin-bottom: 47px;
    }
    .number-votes {
      font-size: 14px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      line-height: 31px;
      margin-bottom: 40px;
    }
    .number-vote-value {
      margin-top: 12px;
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: right;
      color: #595757;
      line-height: 20px;
    }
    .token-info {
      margin-top: 52px;
      .token,
      .bid {
        display: flex;
        align-items: flex-end;
        font-size: 15px;
        font-family: Montserrat-Regular;
        font-weight: 300;
        text-align: left;
        color: #595757;
        margin-bottom: 15px;
      }
      .value {
        font-size: 24px;
        margin: 0 10px;
        line-height: 22px;
      }
    }
    .bid-history {
      .bid-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        font-family: Montserrat-Regular;
        font-weight: 400;
        text-align: left;
        color: #000000;
        margin-top: 69px;
        margin-bottom: 20px;
      }
      .button-group {
        button {
          cursor: pointer;
          width: 321px;
          height: 43px;
          font-size: 14px;
          font-weight: Normal;
          text-align: center;
          background: transparent;
          color: #595757;
          line-height: 16px;
          border: 2px solid #939393;
          margin-bottom: 19px;
        }
      }
      .bid-list {
        margin-top: 10px;
        .item {
          font-size: 12px;
          font-family: Montserrat-Regular;
          font-weight: 300;
          text-align: left;
          color: #595757;
          line-height: 27px;
        }
      }
    }
  }
  .center {
    width: 521px;
    .notice {
      padding-left: 20px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
      img {
        margin-right: 18px;
      }
    }
  }
  .right {
    width: 280px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 12px;
      font-family: Montserrat-Bold;
      font-weight: SemiBold;
      text-align: left;
      color: #231815;
      line-height: 24px;
      margin-bottom: 54px;
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
    .back {
      text-align: right;
      margin-bottom: 29px;
      button {
        width: 116px;
        height: 36px;
        font-size: 14px;
        font-family: Montserrat-Regular;
        font-weight: 300;
        text-align: center;
        color: #231815;
        background: #c9caca;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
}
</style>
