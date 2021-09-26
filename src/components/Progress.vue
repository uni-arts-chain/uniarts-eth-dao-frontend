/** * Created by Lay Hunt on 2021-09-08 23:58:32. */
<template>
  <div class="progress-bar">
    <div class="label-number" :style="`left: ${value}%`">{{ format(value) }}%</div>
    <div class="bar" :style="`width: ${value}%`"></div>
    <div class="bg"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { BigNumber } from "bignumber.js";
export default defineComponent({
  name: "vote-progress",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    // TODO
    const format = (value) => {
      let percent = new BigNumber(value);
      return percent.eq(100) ? 100 : percent.isNaN() ? 0 : percent.toString();
    };

    return {
      format,
    };
  },
});
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  height: 23px;
  position: relative;
  margin-top: 27px;
}
.bar {
  background-image: url(~@/assets/images/progress-bar@2x.png);
  background-repeat: no-repeat;
  background-size: 100% 99%;
  background-position: 0px 1px;
  top: 5%;
  left: 2px;
  height: 90%;
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
</style>
