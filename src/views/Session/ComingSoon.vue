/** * Created by Lay Hunt on 2021-09-08 18:09:49. */
<template>
  <div class="coming-soon">
    <img class="bg" src="@/assets/images/comingsoon-bg@2x.png" />
    <img class="text" src="@/assets/images/comingsoon-text@2x.png" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "coming-soon",
  setup() {
    // TODO

    return {};
  },
});
</script>

<style lang="scss" scoped>
.coming-soon {
  background-color: #272727;
  height: 100%;
  position: relative;
  min-height: 800px;
}
.bg {
  width: 618px;
  height: 632px;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
}
.text {
  width: 701px;
  height: 66px;
  position: absolute;
  top: 370px;
  left: 50%;
  transform: translateX(-50%) translateY(-80px);
}
</style>
