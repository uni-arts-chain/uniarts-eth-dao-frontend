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
            <Progress :value="width" />
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
import Progress from "@/components/Progress";
export default defineComponent({
  name: "collection",
  components: {
    Progress,
  },
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
  }
}
</style>
