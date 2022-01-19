/** * Created by Lay Hunt on 2022-01-19 14:34:03. */
<template>
  <div class="vault" v-loading="dataLoading">
    <div v-if="list.length <= 0" class="no-data">No data</div>
    <div v-for="v in list" :key="v" class="list">
      <div class="item">
        <AdaptiveImage
          :isOrigin="false"
          :url="v.property_url"
          style="max-width: 100%"
          width="349px"
          height="260px"
        />
        <div class="info">
          <div class="title">{{ v.name }}</div>
          <div class="prop">
            <span>Tx Hash:</span>
            <span style="cursor: pointer" @click="onCopy(v.pinned_hash?.toUpperCase())">{{
              formatAddress(v.pinned_hash?.toUpperCase())
            }}</span>
          </div>
          <div class="prop">
            <span>NFT Contract:</span>
            <span style="cursor: pointer" @click="onCopy(v.nft_contract?.toUpperCase())">{{
              formatAddress(v.nft_contract?.toUpperCase())
            }}</span>
          </div>
          <div class="prop">
            <span>Token ID: </span>
            <span style="cursor: pointer" @click="onCopy(v.token_id)">{{
              formatTokenId(v.token_id)
            }}</span>
          </div>
          <div class="prop">
            <span>Token Standard:</span>
            <span>{{ v.token_standard }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import AdaptiveImage from "@/components/AdaptiveImage";
import http from "@/plugins/http";
import { notification } from "@/components/Notification";
import copy from "clipboard-copy";

export default defineComponent({
  name: "vault",
  components: {
    AdaptiveImage,
  },
  setup() {
    // TODO
    onMounted(() => {
      requestData();
    });

    const list = ref([]);
    const dataLoading = ref(false);

    const requestData = () => {
      dataLoading.value = true;
      http
        .userGetPinnedList({})
        .then((res) => {
          dataLoading.value = false;
          list.value = res.list;
        })
        .catch((err) => {
          console.log(err);
          dataLoading.value = false;
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    const formatAddress = (address) => {
      if (!address) return "";
      return address.substr(0, 6) + "..." + address.substr(-4, 4);
    };

    const formatTokenId = (id) => {
      if (!id) return;
      let tokenId = id + "";
      if (id.length > 10) {
        return tokenId.substr(0, 5) + "..." + tokenId.substr(-5, 5);
      } else {
        return id;
      }
    };

    const onCopy = (v) => {
      copy(v);
      notification.success("Copy successfully");
    };

    return {
      dataLoading,
      list,
      formatAddress,
      formatTokenId,
      onCopy,
    };
  },
});
</script>

<style lang="scss" scoped>
.vault {
  min-height: 200px;
}
.list {
  .item {
    display: flex;
    margin-bottom: 72px;
  }

  .info {
    width: 434px;
    margin-left: 37px;

    .title {
      margin-top: 15px;
      font-size: 22px;
      margin-bottom: 40px;
    }

    .prop {
      font-size: 18px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #656565;
      span:last-child {
        color: black;
      }
    }
  }
}

.adaptive-image {
  cursor: pointer;
}

@media screen and (max-width: 750px) {
  .list .item {
    display: flex;
    flex-direction: column;

    /* img {
      min-width: 100% !important;
      width: 100%;
      height: auto;
    } */
  }
  .list .info {
    margin-top: 20px;
    width: 100%;
    margin-left: 0;
  }
}

.no-data {
  color: #aaa;
  font-size: 13px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
