/** * Created by Lay Hunt on 2021-09-08 18:14:01. */
<template>
  <div class="index">
    <div class="info">
      <div class="container">
        <div class="back-button-wrapper">
          <button v-if="!$store.state.global.isMobile" class="back" @click="onBack">Back</button>
        </div>
        <div class="content">
          <h2>Result of last vote round</h2>
        </div>
      </div>
    </div>
    <div class="list" v-loading="isLoading">
      <div class="container item-list" v-if="list.length > 0">
        <div class="item" v-for="(v, i) in list" :key="i">
          <div class="nft">
            <AdaptiveView :isResponsive="true" :isPreview="true" :nft="v" />
          </div>
          <div class="nft-info">
            <div class="my-votes">
              <span class="value" style="font-size: 18px">{{ v.name }}</span>
            </div>
            <div class="vote-progress">
              <div class="bar"></div>
              <div
                class="vote-bar"
                :style="`width: ${parseInt((v.number / (v.total || 1)) * 100)}%`"
              ></div>
              <div
                class="current-per"
                :style="`left: ${parseInt((v.number / (v.total || 1)) * 100)}%`"
              >
                {{ formatPercent((v.number / (v.total || 1)) * 100) }}%
              </div>
              <div class="total-per">Total: {{ v.total }}</div>
            </div>
            <div class="number-vote">Number of votes: {{ v.number }}</div>
          </div>
        </div>
      </div>
      <div
        v-else-if="list.length == 0 && !isLoading"
        class="container"
        style="height: 600px; display: flex; align-items: center; justify-content: center"
      >
        No vote
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from "vue";
import store from "@/store";
import { useRouter } from "vue-router";
import http from "@/plugins/http";
import AdaptiveView from "@/components/AdaptiveView";
import { BigNumber } from "@/plugins/bignumber";
import { notification } from "@/components/Notification";
export default defineComponent({
  name: "list",
  components: {
    AdaptiveView,
  },
  setup() {
    // TODO

    const router = useRouter();

    store.dispatch("global/SetNavText", "Vote");

    const isLoading = ref(false);
    const list = ref([]);
    const voteInfo = reactive({});
    const requestData = () => {
      isLoading.value = true;
      http
        .globalGetGroupVotedList({})
        .then((res) => {
          http
            .globalGetGroupVoted({
              sn: res.sn,
            })
            .then((result) => {
              isLoading.value = false;
              list.value = result.list;
            })
            .catch((err) => {
              console.log(err);
              isLoading.value = false;
              notification.error(
                (err.head && err.head.msg) || err.message || (err.data && err.data.message)
              );
            });
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          notification.error(
            (err.head && err.head.msg) || err.message || (err.data && err.data.message)
          );
        });
    };

    onMounted(() => {
      requestData();
    });

    const width = 50;

    const onBack = () => {
      router.push("/vote");
    };

    const formatPercent = (number) => {
      return new BigNumber(number).toFixed(2, 1);
    };

    return {
      list,
      width,

      onBack,
      voteInfo,

      formatPercent,
      isLoading,
    };
  },
});
</script>
<style lang="scss" scoped>
.index {
  width: 100%;

  .info {
    background-color: #f1eff0;
    .container {
      height: 272px;
      /* display: flex; */
      /* justify-content: space-between; */
      padding-top: 35px;
    }
    .back-button-wrapper {
      display: flex;
      justify-content: flex-end;
    }
    .content {
      margin-top: 35px;
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        font-size: 36px;
        font-family: Montserrat-Medium;
        font-weight: 500;
        text-align: left;
        color: #000000;
      }
      .date {
        margin-top: 31px;
        display: flex;
        align-items: center;
        font-size: 19px;
        font-family: Montserrat-Regular;
        font-weight: 300;
        color: #231815;
        img {
          width: 22px;
          height: 22px;
          margin-right: 22px;
        }
      }
      .amount {
        margin-top: 15px;
        .label {
          font-size: 19px;
          font-family: Montserrat-Medium;
          font-weight: 500;
          text-align: left;
          color: #231815;
          line-height: 29px;
          margin-right: 10px;
        }
        .unit {
          margin-left: 20px;
          font-size: 16px;
          font-family: Montserrat-Regular;
          font-weight: 300;
          text-align: left;
          color: #231815;
          line-height: 25px;
        }
      }
    }
    .auction-button {
      cursor: pointer;
      width: 229px;
      height: 49px;
      border: 3px solid black;
      font-family: Montserrat-Medium;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      color: #231815;
    }
    .back {
      width: 116px;
      height: 36px;
      cursor: pointer;
      background: #c9caca;
      border-radius: 6px;
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: center;
      color: #231815;
    }
  }
}

.list {
  min-height: 400px;
  .item-list {
    padding-top: 100px;
    padding-bottom: 200px;
  }
  .item {
    margin-bottom: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nft-info {
    margin-left: 26px;
    width: 747px;
  }
  .nft {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: black; */
    img {
      /* width: 100%; */
      height: 100%;
    }
  }
  .my-votes {
    display: flex;
    align-items: center;
    .value {
      font-size: 14px;
      font-family: Montserrat-Medium;
      font-weight: 500;
      text-align: left;
      color: #000000;
      line-height: 31px;
      margin-right: 17px;
    }
    .bar {
      width: 98px;
      padding: 3px 5px;
      height: 26px;
      background: url(~@/assets/images/votes-bar@2x.png) no-repeat;
      background-size: 100% 100%;
    }
    .progress {
      background: #52c3dd;
      height: 18px;
      border-radius: 10px;
    }
  }
  .vote-progress {
    margin-top: 12px;
    position: relative;
    overflow: hidden;
    .bar {
      width: 100%;
      height: 26px;
      border-radius: 20px;
      background: #e6e6e6;
    }
    .vote-bar {
      position: absolute;
      top: 2px;
      height: 100%;
      max-width: 100%;
      width: 40%;
      background: url(~@/assets/images/vote-progress@2x.png) no-repeat;
      background-size: 707px 22px;
    }
    .current-per {
      font-size: 12px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #ffffff;
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translateX(-120%);
    }
    .total-per {
      font-size: 12px;
      font-family: Montserrat-Regular;
      text-align: left;
      color: #595757;
      position: absolute;
      top: 5px;
      right: 1%;
    }
  }
  .number-vote {
    margin-top: 13px;
    font-size: 14px;
    font-family: Montserrat-Regular;
    font-weight: 300;
    text-align: left;
    color: #595757;
  }
  .vote-button {
    width: 163px;
    height: 49px;
    font-size: 14px;
    font-family: Montserrat-Medium;
    font-weight: 600;
    text-align: center;
    color: #595757;
    line-height: 31px;
    cursor: pointer;
    border: 3px solid #ddd;
    background: transparent;
  }
}

.notice {
  padding-top: 72px;
  background-color: #f1eff0;
  .container {
    height: 272px;
    padding-top: 35px;
    h2 {
      font-size: 36px;
      font-family: Montserrat-Blod;
      font-weight: 500;
      text-align: left;
      color: #000000;
      margin-bottom: 15px;
    }
    p {
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      color: #898989;
      line-height: 24px;
      margin-bottom: 10px;
    }
    .more {
      font-size: 14px;
      font-family: Montserrat-Regular;
      font-weight: 300;
      text-align: left;
      color: #231815;
    }
  }
}

@media screen and (max-width: 750px) {
  .index .info {
    .container {
      padding-top: 0;
      display: flex;
      align-items: center;
      height: 200px;
    }
    .content {
      margin: 0 auto;
      margin-top: 0;
      h2 {
        font-size: 27px;
      }
      .date {
        margin-top: 31px;
        font-size: 15px;
      }
      .amount {
        margin-top: 5px;
        .label {
          font-size: 15px;
        }
        font-size: 15px;
      }
      .auction-button {
        margin-top: 35px;
      }
    }
  }
  .list .item-list {
    padding-top: 20px;
    padding-bottom: 50px;
    .item {
      flex-direction: column;
      margin-bottom: 50px;
      .nft {
        width: 313px;
        max-width: 100%;
        height: 313px;
      }
      .nft-info {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
        .number-vote {
          font-size: 15px;
        }
      }
      .vote-button {
        margin-top: 20px;
        width: 80%;
      }
      .vote-bar {
        background-size: 335px 22px;
      }
    }
  }
  .notice {
    padding-top: 0;
  }
  .notice .container {
    height: auto;
    padding-top: 30px;
    padding-bottom: 50px;
    h2 {
      font-size: 22px;
      font-family: Montserrat-Medium;
    }
    p {
      color: black;
    }
    .more {
      font-family: Montserrat-Medium;
      font-weight: 800;
      color: black;
    }
  }
}
</style>
