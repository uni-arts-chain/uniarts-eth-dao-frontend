/** * Created by Lay Hunt on 2021-09-09 22:08:39. */
<template>
  <div class="vote-detail container">
    <div class="left">
      <div class="title">NFT Name</div>
      <div class="desc-title">Artwork description</div>
      <div class="desc-content">
        "Planet spirit" is an oil painting created by in 2010. After successful creation, it has
        aroused great repercussions and won great recognition in the circle, which also led to the
        introduction of the work, introduction...
      </div>
      <div class="more">More ></div>
    </div>
    <div class="center">
      <div class="nft">
        <img
          style="width: 520px; height: 515px"
          src="https://ipfs.pixura.io/ipfs/QmbBmVPHkXQFcUHUw1ETKsq3m51iUjCNkJwop9L44uiAmV/FinalWithGradient.jpg"
        />
      </div>
      <div class="progress">
        <VoteProgress :value="52" />
        <div class="progress-value">
          <span>Number of votes：30000</span>
          <span>Total：45000</span>
        </div>
      </div>
      <div class="vote-body">
        <div class="tabs">
          <div :class="{ active: curTab == 1 }" @click="curTab = 1">Stake&Vote</div>
          <div :class="{ active: curTab == 2 }" @click="curTab = 2">Pending Vote</div>
        </div>
        <div class="form-body" v-if="curTab == 1">
          <div class="amount-input">
            <input type="amount" placeholder="Amount" />
            <div class="unit">Uink</div>
          </div>
          <button class="submit">Approve</button>
          <div class="balance">
            <span>Wallet Balance</span>
            <span>5000.00 Uink</span>
          </div>
          <div class="notice">
            Notice： <br />
            1. Vote for NFT won’t cost any token, but voted&nbsp;token can only be retrieved 7 days
            after the end of the voted round. <br />
            2. Vote reward will be distributed at UTC 00:00 everyday during the voting period, and
            can be withdraw at anytime once available.
          </div>
          <div class="info">
            <div class="info-title">My Account</div>
            <div class="info-list">
              <div class="item">
                <span>Staking</span>
                <span>1000 Uink</span>
              </div>
              <div class="item">
                <span>Staking</span>
                <span>1000 Uink</span>
              </div>
              <div class="item">
                <span>- Voted</span>
                <span>800 Uink</span>
              </div>
              <div class="item">
                <span>- Pending to vote</span>
                <span>200 Uink</span>
              </div>
              <div class="item">
                <span>Avaliable to withdraw</span>
                <span>30 Uink</span>
              </div>
              <div class="item end">
                <span>Total</span>
                <span>1030 Uink</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-body" v-else>
          <div class="amount-input">
            <input type="amount" placeholder="Amount" />
            <div class="unit">Uink</div>
          </div>
          <button class="submit">Pending</button>
          <div class="balance">
            <span>Wallet Balance</span>
            <span>5000.00 Uink</span>
          </div>
          <div class="notice">
            Notice： <br />
            1. Vote for NFT won’t cost any token, but voted&nbsp;token can only be retrieved 7 days
            after the end of the voted round. <br />
            2. Vote reward will be distributed at UTC 00:00 everyday during the voting period, and
            can be withdraw at anytime once available.
          </div>
          <div class="info">
            <div class="info-title">My Account</div>
            <div class="info-list">
              <div class="item">
                <span>Staking</span>
                <span>1000 Uink</span>
              </div>
              <div class="item">
                <span>Staking</span>
                <span>1000 Uink</span>
              </div>
              <div class="item">
                <span>- Voted</span>
                <span>800 Uink</span>
              </div>
              <div class="item">
                <span>- Pending to vote</span>
                <span>200 Uink</span>
              </div>
              <div class="item">
                <span>Avaliable to withdraw</span>
                <span>30 Uink</span>
              </div>
              <div class="item end">
                <span>Total</span>
                <span>1030 Uink</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="back" @click="onBack">
        <button>Back</button>
      </div>
      <div class="user">
        <img class="avatar" src="https://avatars.githubusercontent.com/u/87279659?v=4" />
        <span class="username">Kyle Bighead</span>
      </div>
      <div class="user-desc">
        "Planet spirit" is an oil painting created by in 2010. After successful creation, it has
        aroused great repercussions and won great recognition in the circle, which also led to the
        introduction of the work, introduction...
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import VoteProgress from "@/components/Progress";
export default defineComponent({
  name: "vote-detail",
  components: {
    VoteProgress,
  },
  setup() {
    // TODO

    const curTab = ref(1);

    const onBack = () => {
      history.go(-1);
    };

    return {
      curTab,

      onBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.vote-detail {
  padding-top: 132px;
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
    }
  }
  .center {
    width: 521px;
    .progress {
      padding-top: 33px;
      margin-bottom: 61px;
    }
    .progress-value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 9px;
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #595757;
    }
    .vote-body {
      width: 100%;
      background-color: #efeff0;
      border-radius: 8px;
      overflow: hidden;
      .tabs {
        display: flex;
        > div {
          cursor: pointer;
          width: 50%;
          height: 63px;
          opacity: 0.2;
          font-size: 24px;
          font-family: Montserrat-Regular;
          font-weight: 400;
          text-align: center;
          color: #000000;
          line-height: 63px;
          background: linear-gradient(to bottom, #eeeeef, #dedfdf);
        }
        > div.active {
          opacity: 1;
        }
      }
      .form-body {
        padding: 21px;
        .amount-input {
          display: flex;
          align-items: center;
          margin-bottom: 36px;
          input {
            width: 404px;
            height: 59px;
            font-size: 14px;
            font-family: Montserrat-Regular;
            font-weight: 300;
            text-align: left;
            color: black;
            padding: 0 20px;
            border: 2px solid #ccc;
          }
          .unit {
            font-size: 18px;
            font-family: Montserrat-Regular;
            font-weight: 300;
            text-align: left;
            color: #595757;
            margin-left: 16px;
          }
        }
        .submit {
          display: block;
          margin: 0 auto;
          font-size: 18px;
          font-family: Montserrat-Regular;
          font-weight: 400;
          text-align: center;
          color: #ffffff;
          line-height: 51px;
          width: 403px;
          height: 51px;
          cursor: pointer;
          background: black;
          border-radius: 30px;
          margin-bottom: 24px;
        }
        .balance {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-family: Montserrat-Regular;
          font-weight: 300;
          text-align: left;
          color: #595757;
          line-height: 56px;
        }
      }
      .notice {
        background: #dcdddd;
        border-radius: 11px;
        padding: 21px 16px;
        font-size: 14px;
        font-family: Montserrat-Regular;
        font-weight: 400;
        text-align: left;
        color: #595757;
        line-height: 24px;
      }
      .info {
        margin-top: 27px;
        .info-title {
          font-size: 14px;
          font-family: Montserrat-Regular;
          font-weight: 400;
          text-align: left;
          color: #000000;
          line-height: 56px;
        }
        .info-list {
          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            font-family: Montserrat-Regular;
            font-weight: 300;
            text-align: left;
            color: #595757;
            line-height: 24px;
          }
          .end {
            margin-top: 35px;
            margin-bottom: 38px;
          }
        }
      }
    }
  }
  .right {
    width: 292px;
    .back {
      text-align: right;
      margin-bottom: 67px;
      button {
        font-size: 14px;
        cursor: pointer;
        font-family: Montserrat-Regular;
        font-weight: 300;
        text-align: left;
        color: #231815;
        line-height: 24px;
        background: transparent;
      }
    }
    .user {
      display: flex;
      align-items: center;
      margin-bottom: 31px;
    }
    .avatar {
      border-radius: 50%;
      width: 36px;
      height: 36px;
      box-shadow: 3px 4px 9px 0px rgba(34, 24, 20, 0.52);
    }
    .username {
      margin-left: 14px;
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: right;
      color: #231815;
    }
    .user-desc {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      color: #898989;
      line-height: 18px;
    }
  }
}
</style>
