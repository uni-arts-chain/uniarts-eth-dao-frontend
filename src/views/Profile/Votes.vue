/** * Created by Lay Hunt on 2021-09-26 14:46:04. */
<template>
  <div class="votes">
    <div class="list">
      <div class="item-list">
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
          <button class="vote-button" @click="goVoteDetail(1)">Retrieve</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "votes",
  setup() {
    // TODO
    const list = [1, 2, 3, 4];
    const width = 52;
    const goVoteDetail = (id) => {
      console.log(id);
      // router.push("/vote/" + id);
    };
    return {
      list,
      width,
      goVoteDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  .item {
    margin-bottom: 27px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nft-info {
    margin-left: 36px;
    width: 390px;
  }
  .nft {
    width: 180px;
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
    margin-left: 20px;
    width: 160px;
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
@media screen and (max-width: 750px) {
  .list .item-list {
    padding-top: 20px;
    padding-bottom: 50px;
    .item {
      flex-direction: column;
      margin-bottom: 50px;
      .nft {
        width: 100%;
        height: 235px;
      }
      .nft-info {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
        .number-vote {
          font-size: 15px;
        }
      }
      .vote-button {
        margin-top: 20px;
        width: 80%;
      }
    }
  }
}
</style>
