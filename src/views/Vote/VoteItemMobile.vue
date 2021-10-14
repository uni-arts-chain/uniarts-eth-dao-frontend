/** * Created by Lay Hunt on 2021-09-09 18:08:37. */
<template>
  <div class="item">
    <div class="nft">
      <AdaptiveView :isResponsive="true" :nft="item" />
    </div>
    <div class="info">
      <div class="title">{{ item.name }}</div>
      <div class="artwork">
        <div class="artwork-desc">
          {{ getShorten(item.details, 100) }}
        </div>
        <div class="artwork-more"></div>
      </div>
      <div class="user">
        <div class="user-info">
          <img :src="item.artist_avatar ? item.artist_avatar : Avatar" />
          <div class="username">{{ item.artist_name }}</div>
        </div>
        <div class="user-desc">
          <div class="desc-text">
            {{ getShorten(item.artist_info, 70) }}
          </div>
          <div class="user-more" @click="goArtistDetail(item.artist_uid)">More ></div>
        </div>
      </div>
      <div class="bid-group">
        <button @click="onVote">Vote</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Avatar from "@/assets/images/avatar@2x.png";
import AdaptiveView from "@/components/AdaptiveView";

export default defineComponent({
  name: "vote",
  components: {
    AdaptiveView,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    // TODO
    const router = useRouter();

    const onVote = () => {
      router.push("/vote/" + props.item.id);
    };

    const goArtistDetail = (id) => {
      router.push("/artist/" + id);
    };

    const getShorten = (str, length = 355) => {
      return str && str.length > length ? str.substr(0, length) + "..." : str;
    };

    return {
      onVote,
      goArtistDetail,
      Avatar,
      getShorten,
    };
  },
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
}
.nft {
  width: 520px;
  max-width: 100%;
  height: 573px;
  /* background-color: black; */
}
.info {
  width: 500px;
  margin-left: 149px;
  .title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 32px;
    font-family: Montserrat-Medium;
    font-weight: 500;
    text-align: left;
    color: #000000;
    margin-bottom: 15px;
    padding-bottom: 74px;
    border-bottom: 1px solid black;
  }
  .desc {
    font-size: 18px;
    font-family: Montserrat-Medium;
    font-weight: 500;
    text-align: left;
    color: #000000;
    margin-bottom: 23px;
  }

  .user-info {
    margin-top: 45px;
    display: flex;
    align-items: center;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      box-shadow: 3px 4px 9px 0px rgba(34, 24, 20, 0.52);
    }
    .username {
      width: 67px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      margin-left: 15px;
      color: #231815;
      line-height: 24px;
    }
  }
  .artwork-label {
    margin-top: 31px;
    font-size: 14px;
    font-family: Montserrat-Medium;
    font-weight: 500;
    text-align: left;
    color: #000000;
    margin-bottom: 18px;
  }
  .artwork-desc,
  .user-desc {
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #898989;
    line-height: 18px;
    min-height: 54px;
    margin-bottom: 13px;
  }
  .user-desc {
    margin-top: 28px;
  }
  .artwork-more,
  .user-more {
    font-size: 12px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #231815;
    margin-bottom: 19px;
    cursor: pointer;
  }
  .user-more {
    margin-bottom: 20px;
  }
  .bid-group {
    margin-top: 33px;
    text-align: center;
    button {
      margin-top: 8px;
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 400;
      text-align: left;
      color: #898989;
      line-height: 18px;
      width: 90%;
      height: 48px;
      text-align: center;
      cursor: pointer;
      background: transparent;
      border: 2px solid #898989;
    }
  }
}

.item {
  flex-direction: column;
}
.nft {
  margin: 0 auto;
  width: 335px;
  height: 335px;
}
.info {
  margin-left: 0;
  width: 100%;
  .title {
    margin-top: 20px;
    border-bottom: none;
    font-size: 23px;
    font-weight: 600;
    font-family: Montserrat-Medium;
    padding-bottom: 0;
  }
  .artwork-desc {
    font-size: 16px;
    margin-bottom: 50px;
  }
}

.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .user-info {
    margin-top: 0;
    flex-direction: column;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
    }
    .username {
      margin-left: 0;
      margin-top: 15px;
      font-size: 17px;
    }
  }
  .user-desc {
    height: 100%;
    margin-left: 30px;
    margin-top: 0;
    margin-bottom: 0;
    .desc-text {
      font-size: 16px;
      height: 80px;
      overflow: hidden;
      width: 220px;
      /* text-overflow: ellipsis; */
      /* white-space: nowrap; */
    }
    .user-more {
      text-align: right;
      margin-bottom: 0;
    }
  }
}
</style>
