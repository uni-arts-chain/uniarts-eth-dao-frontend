/** * Created by Lay Hunt on 2021-09-09 22:08:39. */
<template>
  <div class="auction">
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
    <div class="center"></div>
    <div class="right"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "auction",
  setup() {
    // TODO

    return {};
  },
});
</script>

<style lang="scss" scoped>
.auction {
  display: flex;
  justify-content: space-between;
  .left {
    .title {
      font-size: 32px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      line-height: 56px;
    }
  }
}
</style>
