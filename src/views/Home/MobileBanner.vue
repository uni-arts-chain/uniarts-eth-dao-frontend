/** * Created by Lay Hunt on 2021-09-18 01:10:36. */
<template>
  <div class="mobilebanner">
    <img class="banner-logo" src="@/assets/images/banner-logo@2x.png" />
    <AdaptiveView width="330px" height="230px" :nft="recommmedInfo" />
    <div class="vote-date">
      <p>Voting Start Date: {{ recommmedInfo.created_at }}</p>
      <p>Select the most in-demand NFT artwork</p>
    </div>
    <button @click="$router.push(`/vote/${recommmedInfo.id}`)">Start Voting</button>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import AdaptiveView from "@/components/AdaptiveView";
import http from "@/plugins/http";
import { notification } from "@/components/Notification";
export default defineComponent({
  name: "mobilebanner",
  components: {
    AdaptiveView,
  },
  setup() {
    const isLoading = ref(false);
    const recommmedInfo = ref({});
    const requestData = () => {
      isLoading.value = false;
      http
        .globalGetRecommend({})
        .then((res) => {
          isLoading.value = false;
          console.log(res);
          recommmedInfo.value = res;
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          notification.error(err.head ? err.head.msg : err.message);
        });
    };

    onMounted(() => {
      requestData();
    });
    return {
      recommmedInfo,
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
  background: #000;
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
