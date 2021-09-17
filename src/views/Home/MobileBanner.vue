/** * Created by Lay Hunt on 2021-09-18 01:10:36. */
<template>
  <div class="mobilebanner">
    <img class="banner-logo" src="@/assets/images/banner-logo@2x.png" />
    <AdaptiveView width="330px" height="230px" :nft="nft" />
    <div class="vote-date">
      <p>Voting period: 2021/09/01~2021/09/08</p>
      <p>Select the most in-demand NFT artwork</p>
    </div>
    <button>Start Voting!</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AdaptiveView from "@/components/AdaptiveView";
export default defineComponent({
  name: "mobilebanner",
  components: {
    AdaptiveView,
  },
  setup() {
    // TODO
    const nft = {
      img_main_file1: {
        url: "https://bitflix-assets.s3.us-east-2.amazonaws.com/miner_pool/property/img/1/d128ae2b-ffb4-41c8-87d8-41c08e4a9cda.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA6PPSF6Y2ZB5JF5HX%2F20210917%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210917T171518Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=191d92380da0fe41a9ba47a0fe9ca3fc9c9cdccc4b709667021be50cf899061a",
      },
      property_url:
        "https://bitflix-assets.s3.us-east-2.amazonaws.com/miner_pool/property/img/1/d128ae2b-ffb4-41c8-87d8-41c08e4a9cda.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA6PPSF6Y2ZB5JF5HX%2F20210917%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210917T171518Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=191d92380da0fe41a9ba47a0fe9ca3fc9c9cdccc4b709667021be50cf899061a",
    };
    return {
      nft,
    };
  },
});
</script>

<style lang="scss" scoped>
.banner-logo {
  width: 220px;
  display: block;
  margin: 40px auto;
}
.adaptive-view {
  margin: 0 auto;
  margin-bottom: 10px;
}
.vote-date {
  font-family: Montserrat-Regular;
  font-weight: 400;
  font-size: 15px;
  text-align: center;
  color: #040000;
  line-height: 41px;
  margin-bottom: 30px;
}
button {
  display: block;
  margin: 0 auto;
  width: 220px;
  height: 47px;
  opacity: 1;
  background: #c9c9c9;
  border-radius: 6px;
  margin-bottom: 40px;
  font-family: Montserrat-Medium;
  font-weight: 500;
  text-align: center;
  font-size: 17px;
  color: #ffffff;
  line-height: 37px;
}
</style>
