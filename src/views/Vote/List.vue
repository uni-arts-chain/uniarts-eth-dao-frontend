/** * Created by Lay Hunt on 2021-09-08 18:14:01. */
<template>
  <div class="index">
    <div class="info">
      <div class="container">
        <button class="auction-button">View Auction Round</button>
        <div class="content">
          <h2>Vote Round</h2>
          <div class="date">
            <img src="@/assets/images/date-clock.png" /> 6 Days 23 Hour 59 Minute 59 Second
          </div>
          <div class="amount">
            <span class="label">Vote Payouts</span> 30.000 <span class="unit">Uink</span>
          </div>
        </div>
        <button class="back">Back</button>
      </div>
    </div>
    <div class="list">
      <div class="container item-list">
        <div class="item" v-for="(v, i) in list" :key="i">
          <div class="nft"></div>
          <div class="nft-info">
            <div class="my-votes">
              <span class="value">My Votes : 200</span>
              <div class="bar">
                <div class="progress" :style="`width: ${width}%;`"></div>
              </div>
            </div>
            <div class="vote-progress">
              <div class="bar"></div>
              <div class="vote-bar" :style="`width: ${width}%`"></div>
              <div class="current-per" :style="`left: ${width}%`">50%</div>
              <div class="total-per">Total: 45000</div>
            </div>
            <div class="number-vote">Number of votes: 30000</div>
          </div>
          <button class="vote-button">VOTE</button>
        </div>
      </div>
    </div>
    <div class="notice">
      <div class="container">
        <h2>Art Formula NFT Vote</h2>
        <p>
          - Vote for NFTs that you think are most in-demand- According to the number of votes
          obtained by each NFT, Uink rewards will be continuously cast into NFTs, which can be
          retrieved by the owner.- Vote for NFT won't cost any token, but voted token can only be
          retrieved 7 days after the end of the voted round.- Vote reward will be distributed at UTC
          00:00 everyday during the voting period, and can be withdraw at anytime once available.-
          Extra benefit from prize pool will be distributed after the end of auction. The higher the
          deal price, the more benefit will be available for the voters of the NFT.
        </p>
        <div class="more">More ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "list",
  setup() {
    // TODO
    const list = [1, 2, 3];

    const width = 50;
    return {
      list,
      width,
    };
  },
});
</script>
<style lang="scss" scoped>
.index {
  width: 100%;

  .info {
    background-color: #f1eff0;
    .container {
      height: 272px;
      display: flex;
      justify-content: space-between;
      padding-top: 35px;
    }
    .content {
      margin-top: 35px;
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        font-size: 36px;
        font-family: Montserrat-Medium;
        font-weight: 500;
        text-align: left;
        color: #000000;
      }
      .date {
        margin-top: 31px;
        display: flex;
        align-items: center;
        font-size: 19px;
        font-family: Montserrat-Regular;
        font-weight: 300;
        color: #231815;
        img {
          width: 22px;
          height: 22px;
          margin-right: 22px;
        }
      }
      .amount {
        margin-top: 15px;
        .label {
          font-size: 19px;
          font-family: Montserrat-Medium;
          font-weight: 500;
          text-align: left;
          color: #231815;
          line-height: 29px;
          margin-right: 10px;
        }
        .unit {
          margin-left: 20px;
          font-size: 16px;
          font-family: Montserrat-Regular;
          font-weight: 300;
          text-align: left;
          color: #231815;
          line-height: 25px;
        }
      }
    }
    .auction-button {
      width: 229px;
      height: 49px;
      border: 3px solid black;
      font-family: Montserrat-Medium;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      color: #231815;
    }
    .back {
      width: 116px;
      height: 36px;
      cursor: pointer;
      background: #c9caca;
      border-radius: 6px;
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: center;
      color: #231815;
    }
  }
}

.list {
  .item-list {
    padding-top: 121px;
    padding-bottom: 135px;
  }
  .item {
    margin-bottom: 27px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nft-info {
    margin-left: 86px;
    width: 707px;
  }
  .nft {
    width: 212px;
    height: 124px;
    background: black;
  }
  .my-votes {
    display: flex;
    align-items: center;
    .value {
      font-size: 14px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      line-height: 31px;
      margin-right: 17px;
    }
    .bar {
      width: 98px;
      padding: 3px 5px;
      height: 26px;
      background: url(~@/assets/images/votes-bar@2x.png) no-repeat;
      background-size: 100% 100%;
    }
    .progress {
      background: #52c3dd;
      height: 18px;
      border-radius: 10px;
    }
  }
  .vote-progress {
    margin-top: 12px;
    position: relative;
    .bar {
      width: 100%;
      height: 26px;
      border-radius: 20px;
      background: #e6e6e6;
    }
    .vote-bar {
      position: absolute;
      top: 2px;
      height: 100%;
      width: 40%;
      background: url(~@/assets/images/vote-progress@2x.png) no-repeat;
      background-size: 707px 22px;
    }
    .current-per {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #ffffff;
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translateX(-120%);
    }
    .total-per {
      font-size: 12px;
      font-family: Montserrat-Regular;
      text-align: left;
      color: #595757;
      position: absolute;
      top: 5px;
      right: 1%;
    }
  }
  .number-vote {
    margin-top: 13px;
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #595757;
  }
  .vote-button {
    width: 163px;
    height: 49px;
    font-size: 14px;
    font-family: Montserrat-Medium;
    font-weight: 600;
    text-align: center;
    color: #595757;
    line-height: 31px;
    cursor: pointer;
    border: 3px solid #ddd;
    background: transparent;
  }
}

.notice {
  padding-top: 72px;
  background-color: #f1eff0;
  .container {
    height: 272px;
    padding-top: 35px;
    h2 {
      font-size: 36px;
      font-family: Montserrat-Blod;
      font-weight: 500;
      text-align: left;
      color: #000000;
      margin-bottom: 15px;
    }
    p {
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      color: #898989;
      line-height: 24px;
      margin-bottom: 10px;
    }
    .more {
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
    }
  }
}
</style>
