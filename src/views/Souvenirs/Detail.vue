/** * Created by Lay Hunt on 2021-09-09 22:08:39. */
<template>
  <div class="detail">
    <div class="head">
      <span>{{ souvenir.title }}</span>
      <button @click="$router.back()">Back</button>
    </div>
    <div class="keepsake">
      <img :src="souvenir.sample" alt="keepsake" class="img" />
    </div>
    <div class="info">
      <div class="info-item">
        <div class="title"><span>Description</span></div>
        <div class="message">{{ souvenir.artist_info }}</div>
      </div>
      <div class="info-item">
        <div class="title"><span>Properties</span></div>
        <div class="properties">
          <div class="properties-item">
            <div class="artist">ARTIST</div>
            <div class="describe">{{ souvenir.artist_name }}</div>
            <div class="trait"><span class="number">33%</span> have this trait</div>
          </div>
          <div class="properties-item">
            <div class="artist">ARTWORK</div>
            <div class="describe">******</div>
            <div class="trait"><span class="number">33%</span> have this trait</div>
          </div>
        </div>
      </div>
      <div class="info-item">
        <div class="title"><span>Details</span></div>
        <div class="details">
          <div class="details-item">
            <div class="key">Contract Address</div>
            <div class="value">0x............</div>
          </div>
          <div class="details-item">
            <div class="key">Token ID</div>
            <div class="value">{{ souvenir.token_id }}</div>
          </div>
          <div class="details-item">
            <div class="key">Token Standard</div>
            <div class="value">ERC-721</div>
          </div>
          <div class="details-item">
            <div class="key">Blockchain</div>
            <div class="value">Polygon</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import http from "@/plugins/http";
import copy from "clipboard-copy";

export default defineComponent({
  name: "Detail",
  setup() {
    const onCopy = (v) => copy(v);
    const route = useRoute();
    const souvenir = ref({});
    const initKeepsakeData = async () => {
      const { id } = route.params;
      souvenir.value = await http.globalGetSouvenirById({}, { id });
      console.log(souvenir.value);
    };
    onMounted(() => {
      initKeepsakeData();
    });
    return {
      onCopy,
      souvenir,
    };
  },
});
</script>
<style lang="scss" scoped>
.detail {
  width: 972px;
  margin: 0 auto;
  padding-top: 130px;
  padding-bottom: 184px;

  .head {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 32px;
      font-weight: 500;
      text-align: left;
      color: #000000;
      line-height: 56px;
    }

    button {
      width: 116px;
      height: 36px;
      background: #c9caca;
      border-radius: 6px;
      cursor: pointer;
    }
  }

  .keepsake {
    margin-top: 31px;
    width: 100%;

    .img {
      display: block;
      width: 100%;
      height: auto;
      background-color: black;
    }
  }

  .info {
    margin-top: 83px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .info-item {
      margin-bottom: 33px;

      .title {
        height: 40px;
        color: black;
        font-size: 28px;
        text-align: left;
        font-weight: 600;
        margin-bottom: 33px;
      }

      .message {
        height: 30px;
        color: black;
        font-size: 20px;
        text-align: left;
        font-weight: 400;
      }

      .properties {
        display: flex;
        flex-direction: row;

        .properties-item {
          margin-right: 33px;
          width: 243px;
          height: 112px;
          line-height: 35px;
          border-radius: 5px;
          background-color: white;
          text-align: center;
          border: 3px solid black;
          display: flex;
          flex-direction: column;

          .artist {
            color: #1a13caff;
            font-size: 18px;
          }

          .describe {
            color: black;
            font-weight: 500;
            font-size: 18px;
          }

          .trait {
            color: #909399;
            font-size: 18px;

            .number {
              color: #037dd6ff;
            }
          }
        }
      }

      .details {
        display: flex;
        flex-direction: column;

        .details-item {
          display: flex;
          flex-direction: row;
          line-height: 40px;
          color: black;
          font-size: 20px;
          text-align: left;

          .key {
            flex: 1;
          }

          .value {
            flex: 2;
          }
        }
      }
    }
  }
}
</style>
