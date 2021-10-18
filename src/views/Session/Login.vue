/** * Created by Lay Hunt on 2021-09-13 16:02:21. */
<template>
  <div class="login container">
    <div v-if="!isChecked" class="select-wallet">
      <img src="@/assets/images/banner-logo@2x.png" />
      <p>Welcome ! Please sign in</p>
      <button v-loading="isLoading" @click="onConnectMetaMask">Sign in</button>
    </div>
    <div v-if="!isNeedSignUp && isChecked" class="sign-in">
      <p>Welcome back</p>
      <p>@{{ userIntro.nickname }}!</p>
      <div class="info">
        <div class="label">ADDRESS</div>
        <div class="address">{{ userIntro.address }}</div>
        <button v-loading="isLoading" class="sign-in-button" @click="onLogin">SIGN IN</button>
      </div>
    </div>
    <div v-else-if="isNeedSignUp && isChecked" class="register">
      <img src="@/assets/images/banner-logo@2x.png" />
      <div class="info">
        <div class="label">ADDRESS</div>
        <div class="address">{{ address }}</div>
      </div>
      <div class="form">
        <div class="item">
          <p>Please enter your email address:</p>
          <input
            v-model="registerForm.email"
            placeholder="Please enter your email address"
            type="text"
          />
        </div>
        <div class="item">
          <p>Please enter your nickname:</p>
          <input
            v-model="registerForm.nickname"
            placeholder="Please enter your nickname"
            type="text"
          />
        </div>
      </div>
      <button class="register-button" @click="onLogin">SIGN UP</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { notification } from "@/components/Notification";
import http from "@/plugins/http";
import wallet from "@/plugins/wallet";
import store from "@/store";

export default defineComponent({
  name: "login",
  setup() {
    // TODO
    const router = useRouter();
    const route = useRoute();
    const back = route.query.back ? decodeURIComponent(route.query.back) : "";

    const isLoading = ref(false);
    const isChecked = ref(false);
    const isNeedSignUp = ref(false);
    const address = ref("");
    const onLogin = async () => {
      isLoading.value = true;
      let response = await http.userLoginMessage({});
      let notifyId;
      try {
        notifyId = notification.notice(
          {
            type: "loading",
            message: "Please wait for the wallet's response",
          },
          {
            timeout: 0,
          }
        );
        let signatureData = await wallet.signature(response.message);
        notification.dismiss(notifyId);
        let info;
        if (isNeedSignUp.value) {
          if (!registerForm.email || !registerForm.nickname) {
            return notification.error("Please enter the correct information");
          }
          const reg = new RegExp(
            "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
          );
          if (!reg.test(registerForm.email)) {
            return notification.error("Please enter the correct mail address");
          }
          info = await http.userPostSignUp({
            address: wallet.connectedAccount,
            message: response.message,
            signature: signatureData,
            email: registerForm.email,
            nickname: registerForm.nickname,
          });
        } else {
          info = await http.userLogin({
            address: wallet.connectedAccount,
            message: response.message,
            signature: signatureData,
          });
        }

        await store.dispatch("user/SetInfo", info);
        isLoading.value = true;
        notification.success("Logged");
        isLoading.value = false;
        if (back) {
          router.push(back);
        } else {
          router.push("/");
        }
      } catch (error) {
        notification.dismiss(notifyId);
        isLoading.value = false;
        notification.error(error.head ? error.head.msg : error.message);
      }
    };
    const checkAddress = () => {
      return http.userCheckAddress({
        address: address.value,
      });
    };

    const registerForm = reactive({
      email: "",
      nickname: "",
    });

    const userIntro = reactive({});
    const onConnectMetaMask = () => {
      isLoading.value = true;
      store
        .dispatch("user/ConnectWallet")
        .then(async () => {
          address.value = wallet.connectedAccount;
          const intro = await checkAddress();
          userIntro.nickname = intro.nickname;
          userIntro.address = intro.address;
          isChecked.value = true;
          isLoading.value = false;
        })
        .catch((err) => {
          console.log(err);
          isLoading.value = false;
          if (err.code === 100) {
            notification.error("Please install the selected wallet");
          } else if (err.head && err.head.code === 6010) {
            isNeedSignUp.value = true;
            isChecked.value = true;
          } else {
            notification.error(err.head ? err.head.msg : err.message);
          }
        });
    };

    return {
      isLoading,
      isNeedSignUp,
      isChecked,
      onConnectMetaMask,
      onLogin,

      address,
      userIntro,
      registerForm,
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
