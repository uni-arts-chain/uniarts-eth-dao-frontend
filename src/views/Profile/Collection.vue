/** * Created by Lay Hunt on 2021-09-08 14:14:13. */
<template>
  <div class="collection">
    <div class="list" v-for="v in list" :key="v">
      <div class="item">
        <img
          style="width: 400px; height: 233px"
          src="https://ipfs.pixura.io/ipfs/QmbBmVPHkXQFcUHUw1ETKsq3m51iUjCNkJwop9L44uiAmV/FinalWithGradient.jpg"
          alt=""
        />
        <div class="info">
          <div class="progress">
            <div class="progress-bar">
              <div class="label-number" :style="`left: ${width}%`">{{ width }}%</div>
              <div class="bar" :style="`width: ${width}%`"></div>
              <div class="bg"></div>
            </div>
            <div class="value-group">
              <span>Number of votes: 30000</span>
              <span>Total: 45000</span>
            </div>
          </div>
          <div class="operate">
            <button>List</button>
            <button>Send</button>
            <button disabled>Pin</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "collection",
  setup() {
    // TODO
    const list = [1, 2, 3];
    const width = 70;
    return {
      list,
      width,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  .item {
    display: flex;
    margin-bottom: 72px;
  }
  .info {
    width: 434px;
    margin-left: 37px;
    .operate {
      display: flex;
      justify-content: space-between;
      margin-top: 69px;
      button {
        font-size: 14px;
        font-family: Montserrat-Medium;
        text-align: center;
        color: #ffffff;
        width: 119px;
        height: 43px;
        background-color: black;
      }
      button:disabled {
        background-color: #8e8e8e;
      }
    }
    .value-group {
      margin: 0 auto;
      margin-top: 15px;
      width: 90%;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #595757;
    }
    .progress-bar {
      width: 100%;
      height: 23px;
      position: relative;
      margin-top: 27px;
    }
    .bar {
      background-image: url(~@/assets/images/progress-bar@2x.png);
      background-repeat: no-repeat;
      background-size: 434px 19px;
      background-position: 0px 1px;
      top: 2px;
      height: 19px;
      position: absolute;
      border-radius: 10px;
    }
    .bg {
      background-color: #e6e6e6;
      border-radius: 20px;
      height: 100%;
      width: 100%;
    }
    .label-number {
      position: absolute;
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #595757;
      line-height: 32px;
      top: -35px;
      transform: translateX(-50%);
    }
    .label-number::after {
      content: "";
      position: absolute;
      bottom: 1px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 6px solid black;
    }
  }
}
</style>
