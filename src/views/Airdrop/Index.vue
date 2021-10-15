/** * Created by Lay Hunt on 2021-09-07 15:37:25. */
<template>
  <div class="index container">
    <div class="content">
      <img class="logo" src="@/assets/images/banner-logo@2x.png" />
      <div class="airdrop-body">
        <div class="airdrop-content" v-if="!isLogin">
          <span class="title">To View Your UART Airdrop Result</span>
          <button class="connect-wallet" @click="onLogin">SIGN IN</button>
        </div>
        <div class="airdrop-content connected" v-if="isLogin && airDropBalanceList.length < 2">
          <span class="title">Your Airdrop Result is:</span>
          <button class="connect-wallet">Collect {{ airDropBalance }} UART</button>
        </div>
        <div class="airdrop-content connected" v-if="isLogin && airDropBalanceList.length >= 2">
          <span class="title">
            The
            <select class="airdropSelect" v-model="airDropBalanceSelecter">
              <option v-for="(item, index) of airDropBalanceList" :key="index" :value="item">
                {{ index + 1 }}
              </option>
            </select>
            Time Your Airdrop Result Is:
          </span>
          <button class="connect-wallet">Collect {{ airDropBalanceSelecter || 0 }} UART</button>
        </div>
      </div>
      <div class="action-notice">To Collect Airdrop & Vote for NFT</div>
      <div class="label"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import TokenLocker from "@/contracts/TokenLocker";
import store from "@/store";
export default defineComponent({
  name: "index",
  setup() {
    // TODO

    const router = useRouter();
    const route = useRoute();
    const onLogin = () => {
      router.push("/login?back=" + encodeURIComponent(route.path));
    };
    const isLogin = computed(() => {
      return store.state.user.info.address;
    });

    const airDropBalance = ref(0);
    const airDropBalanceList = ref([]);
    const airDropBalanceSelecter = ref(0);
    onMounted(async () => {
      const number = await TokenLocker.queryLockNum();
      for (let i = 0; i < number; i++) {
        const value = await TokenLocker.queryLockPosition(i);
        airDropBalanceList.value.push(value);
        if (i === 0) {
          airDropBalanceSelecter.value = value;
          airDropBalance.value = value;
        }
      }
      console.log(airDropBalanceList);
    });

    return {
      onLogin,
      airDropBalanceList,
      isLogin,
      airDropBalanceSelecter,
      airDropBalance,
    };
  },
});
</script>

<style lang="scss" scoped>
.index {
  margin-top: 125px;
  margin-bottom: 114px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 361px;
  height: 83px;
  margin-bottom: 46px;
}
.airdrop-body {
  background-color: #f0f0f0;
  border-radius: 10px;
  width: 498px;
  height: 230px;
  padding: 54px 63px;

  .airdrop-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .airdrop-content.connected {
    .connect-wallet {
      background-color: white;
      color: black;
      font-family: Montserrat-Medium;
      font-weight: 400;
      text-align: center;
      color: #000000;
      line-height: 39px;
      letter-spacing: -1px;
    }
  }
  .title {
    font-size: 22px;
    font-family: Montserrat-Regular;
    font-weight: 400;
    text-align: center;
    color: #000000;
    line-height: 27px;
    margin-bottom: 40px;
    .airdropSelect {
      position: relative;
      height: 34px;
      font-size: 20px;
    }
  }
  .connect-wallet {
    background: #000000;
    border-radius: 11px;
    padding: 8px 0;
    color: white;
    font-size: 21px;
    width: 353px;
    font-family: Montserrat-Regular;
    font-weight: 400;
    text-align: center;
    line-height: 39px;
    letter-spacing: -1px;
    cursor: pointer;
  }
}
.action-notice {
  margin-top: 31px;
  font-size: 22px;
  font-family: Montserrat-Medium;
  font-weight: 400;
  text-align: center;
  color: #000000;
  line-height: 33px;
}
.label {
  margin-top: 106px;
  font-size: 26px;
  font-family: Montserrat-Regular;
  font-weight: 300;
  text-align: center;
  color: #000000;
  line-height: 44px;
}

@media screen and (max-width: 750px) {
  .index {
    margin-top: 80px;
  }
  .logo {
    width: 230px;
    height: auto;
  }
  .airdrop-body {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 30px;
    padding-bottom: 30px;
    height: 200px;
  }
  .connect-wallet {
    width: 100%;
  }
  .airdrop-content {
    .connect-wallet {
      width: 100%;
      height: 50px;
      font-size: 18px;
      padding: 5px;
    }
  }

  .airdrop-content.connected {
    .connect-wallet {
      width: 100%;
      background-color: white;
      color: black;
      font-family: Montserrat-Medium;
      font-weight: 400;
      text-align: center;
      color: #000000;
      line-height: 39px;
      letter-spacing: -1px;
    }
  }
  .label {
    margin-top: 30px;
    font-size: 20px;
  }
  .action-notice {
    font-size: 20px;
  }
}
</style>
