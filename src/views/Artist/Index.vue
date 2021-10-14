/** * Created by Lay Hunt on 2021-09-08 17:27:09. */
<template>
  <div class="index container">
    <div class="artist">
      <img class="avatar" :src="info.artist_avatar ? info.artist_avatar : Avatar" />
      <div class="username">{{ info.artist_name }}</div>
      <div class="desc" v-html="info.artist_info"></div>
    </div>
    <div class="collection">
      <div class="title">CREATIONS</div>
      <div class="list">
        <div class="item" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
          <AdaptiveView width="100%" height="100%" :isPreview="true" :nft="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from "vue";
import store from "@/store";
import { useRoute, useRouter } from "vue-router";
import http from "@/plugins/http";
import notification from "@/components/Notification";
import Avatar from "@/assets/images/avatar@2x.png";
import AdaptiveView from "@/components/AdaptiveView";
export default defineComponent({
  name: "index",
  components: {
    AdaptiveView,
  },
  setup() {
    // TODO
    const route = useRoute();
    const router = useRouter();

    store.dispatch("global/SetNavText", "Artist");

    const isLoading = ref(false);
    let info = reactive({});
    const list = ref([]);

    const requestData = () => {
      http
        .globalGetArtistDetail({
          uid: route.params.id,
        })
        .then((res) => {
          console.log(res);
          isLoading.value = false;
          info.artist_name = res.artist_avatar;
          info.artist_info = res.artist_info;
          info.artist_name = res.artist_name;
          list.value = res.arts;
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

    const goDetail = (id) => {
      router.push("/marketplace/" + id);
    };

    return {
      list,
      info,

      Avatar,
      goDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.index {
  margin-top: 125px;
  overflow: hidden;
  margin-bottom: 172px;
}
.artist {
  float: left;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 432px;
  .avatar {
    width: 103px;
    height: 103px;
    border-radius: 50%;
  }
  .username {
    font-size: 44px;
    font-family: Montserrat-Medium;
    text-align: left;
    color: #000000;
    margin-left: 39px;
    line-height: 103px;
    width: 290px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .desc {
    width: 290px;
    min-height: 180px;
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: justifyLeft;
    color: #898989;
    line-height: 18px;
  }
}
.collection {
  float: left;
  width: 680px;
  margin-left: 50px;
  .title {
    font-size: 21px;
    font-family: Montserrat-Medium;
    font-weight: 400;
    text-align: center;
    color: #000000;
    line-height: 64px;
    padding-bottom: 16px;
    border-bottom: 2px solid black;
    margin-bottom: 33px;
  }
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 331px;
      height: 331px;
      /* background-color: black; */
      margin-bottom: 16px;
    }
  }
}

@media (max-width: 750px) {
  .index {
    margin-top: 20px;
    margin-bottom: 50px;
    .artist {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      .avatar {
        width: 80px;
        height: 80px;
      }
      .username {
        width: auto;
        font-size: 25px;
        font-family: Montserrat-Medium;
        line-height: 80px;
        margin-left: 20px;
      }
      .desc {
        width: 100%;
        margin-top: 40px;
        font-size: 16px;
        line-height: 1.5;
        min-height: 80px;
      }
    }
    .collection {
      width: 100%;
      margin-left: 0;
      .title {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      .list .item {
        width: 340px;
        height: 200px;
        margin: 0 auto;
        margin-bottom: 40px;
      }
    }
  }
}
</style>
