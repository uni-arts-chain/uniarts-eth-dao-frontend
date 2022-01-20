/** * Created by Lay Hunt on 2021-09-13 16:02:21. */
<template>
  <div class="login container">
    <div class="select-wallet">
      <img src="@/assets/images/banner-logo@2x.png" />
      <p>Welcome ! Please sign in</p>
      <button @click="onSelectWallet">Sign in</button>
      <div class="support-wallet-info" v-if="!$store.state.global.isMobile">
        <span class="info-title">Connect with one of our available wallet providers </span>
        <div class="wallet-icon">
          <a
            href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
            class="wallet-item"
          >
            <icon-svg icon-class="metamask" />
          </a>
          <a
            href="https://chrome.google.com/webstore/detail/bitkeep/jiidiaalihmmhddjgbnbgdfflelocpak"
            target="_blank"
            class="wallet-item"
          >
            <icon-svg icon-class="bitkeep" style="font-size: 77px" />
          </a>
          <a
            href="https://chrome.google.com/webstore/detail/onto-wallet/ifckdpamphokdglkkdomedpdegcjhjdp"
            target="_blank"
            class="wallet-item"
          >
            <icon-svg icon-class="onto" style="font-size: 90px" />
          </a>
        </div>
      </div>
      <Dialog
        v-model="dialogLoginVisible"
        customClass="retrieve-dialog login-dialog"
        v-if="!$store.state.global.isMobile"
        type="small"
        width="380px"
      >
        <div class="dialog-content">
          <div class="dialog-title">Connect your wallet.</div>
          <div class="wallet-list">
            <button v-loading="isMetamaskLoading" class="wallet" @click="selectWallet('metamask')">
              <icon-svg style="font-size: 45px" icon-class="metamask" />
              <span>MetaMask</span>
            </button>
            <button v-loading="isOntoLoading" class="wallet" @click="selectWallet('onto')">
              <icon-svg style="font-size: 45px" icon-class="onto" />
              <span>ONTO</span>
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog
        v-model="dialogTableVisible"
        customClass="retrieve-dialog"
        v-if="!$store.state.global.isMobile"
        type="small"
        width="380px"
      >
        <div class="dialog-content">
          <div class="dialog-title">You need an Ethereum wallet to use Art Formula.</div>
          <div class="wallet-list">
            <a
              class="wallet"
              href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target="_blank"
            >
              <icon-svg style="font-size: 45px" icon-class="metamask" />
              <span>MetaMask</span>
            </a>
            <a
              class="wallet"
              href="https://chrome.google.com/webstore/detail/bitkeep/jiidiaalihmmhddjgbnbgdfflelocpak"
              target="_blank"
            >
              <icon-svg style="font-size: 44px" icon-class="bitkeep" />
              <span>BitKeep</span>
            </a>
            <a
              class="wallet"
              href="https://chrome.google.com/webstore/detail/onto-wallet/ifckdpamphokdglkkdomedpdegcjhjdp"
              target="_blank"
            >
              <icon-svg style="font-size: 44px" icon-class="onto" />
              <span>ONTO</span>
            </a>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import wallet from "@/plugins/wallet";
import store from "@/store";
import Dialog from "@/components/Dialog";

export default defineComponent({
  name: "login",
  components: {
    Dialog,
  },
  setup() {
    // TODO
    const router = useRouter();
    const route = useRoute();
    const back = route.query.back;

    const isMetamaskLoading = ref(false);
    const isOntoLoading = ref(false);

    const onSelectWallet = () => {
      dialogLoginVisible.value = true;
    };
    const selectWallet = async (name) => {
      try {
        switch (name) {
          case "metamask":
            isMetamaskLoading.value = true;
            await wallet.setProvider(window.ethereum || window.BinanceChain);
            await store.dispatch("user/ConnectWallet", null, { root: true });
            isMetamaskLoading.value = false;
            break;
          case "onto":
            isOntoLoading.value = true;
            await wallet.setProvider(window.onto);
            await store.dispatch("user/ConnectWallet", null, { root: true });
            isOntoLoading.value = false;
            break;
        }
        router.push(
          "/login/" + name + "/" + wallet.connectedAccount + (back ? "?back=" + back : "")
        );
      } catch (e) {
        console.log(e);
        isMetamaskLoading.value = false;
        isOntoLoading.value = false;
      }
    };

    const dialogTableVisible = ref(false);
    const dialogLoginVisible = ref(false);

    return {
      isMetamaskLoading,
      isOntoLoading,

      dialogTableVisible,
      dialogLoginVisible,
      onSelectWallet,
      selectWallet,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.user.info.address) {
      next(from);
    } else {
      next();
    }
  },
});
</script>

<style lang="scss" scoped>
.login {
  margin-top: 167px;
  margin-bottom: 200px;
}

.select-wallet {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 435px;
    height: 100px;
  }

  p {
    margin-top: 106px;
    font-size: 30px;
    font-family: Montserrat-Regular;
    font-weight: 400;
    text-align: center;
    color: #040000;
    line-height: 72px;
    margin-bottom: 40px;
  }

  button {
    width: 243px;
    height: 58px;
    background: #000000;
    border-radius: 6px;
    font-size: 22px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    line-height: 34px;
    cursor: pointer;
  }

  .support-wallet-info {
    margin-top: 100px;
    text-align: center;
    .info-title {
      font-weight: 400;
      font-size: 17px;
      color: #909399;
    }
    .wallet-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
      .wallet-item {
        width: 90px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 60px;
      }
      .wallet-item .svg-icon {
        font-size: 90px;
      }
    }
  }
}

.sign-in,
.register {
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 32px;
    line-height: 1.4;
    white-space: pre-wrap;
    margin-bottom: 20px;
  }

  .info {
    background-color: #f0f0f0;
    border-radius: 6px;
    padding: 16px;
    width: 300px;

    .label {
      font-size: 10px;
      text-align: left;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .address {
      font-size: 12px;
      text-align: left;
      margin-bottom: 24px;
      overflow: hidden;
      width: 100%;
    }

    .sign-in-button {
      display: block;
      width: 100%;
      border-radius: 4px;
      padding: 24px 32px;
      height: auto;
      font-size: 12px;
      letter-spacing: 1px;
      background: black;
      color: white;
      cursor: pointer;
    }
  }
}

.register {
  img {
    width: 295px;
    margin-bottom: 20px;
  }

  .info {
    margin-top: 20px;
    width: 350px;
    margin-bottom: 20px;

    .address {
      margin-bottom: 0px;
    }
  }

  .form {
    .item {
      margin-bottom: 30px;
      width: 350px;

      p {
        width: 100%;
        font-size: 20px;
      }

      input {
        border: 2px solid #ddd;
        width: 100%;
        height: 50px;
        font-size: 17px;
        padding: 10px;
      }
    }
  }

  .register-button {
    display: block;
    width: 350px;
    border-radius: 4px;
    padding: 24px 32px;
    height: auto;
    font-size: 12px;
    letter-spacing: 1px;
    background: black;
    color: white;
    cursor: pointer;
  }
}

.dialog-content {
  padding: 40px 30px;
  .dialog-title {
    text-align: center;
    font-weight: 900;
    font-size: 20px;
    color: rgb(4, 17, 29);
    line-height: 110%;
    margin-bottom: 34px;
    word-break: break-word;
  }
  .wallet-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0 20px 0;
    .wallet {
      width: 100%;
      margin: 10px 0;
      border: 2px solid black;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 30px;
      cursor: pointer;
    }
    .wallet > span {
      margin-left: 20px;
      font-size: 20px;
      display: block;
      width: 120px;
    }
  }
}

@media screen and (max-width: 750px) {
  .login {
    margin-top: 50px;
  }
  .select-wallet {
    img {
      width: 240px;
      height: auto;
    }

    p {
      margin-top: 40px;
      font-size: 20px;
      margin-bottom: 40px;
    }

    button {
      height: 50px;
      font-size: 18px;
    }
  }
  .register {
    img {
      width: 240px;
      height: auto;
    }
  }
  .sign-in p {
    font-size: 22px;
  }
  .sign-in .info .sign-in-button {
    height: 50px;
    font-size: 17px;
    padding: 10px;
  }
  .register {
    .form {
      .item {
        p {
          font-size: 18px;
        }
      }
    }

    .register-button {
      height: 50px;
      font-size: 17px;
      padding: 10px;
    }
  }
}
</style>
