/** * Created by Lay Hunt on 2021-09-13 16:02:21. */
<template>
  <div class="login container">
    <!-- <div class="select-wallet">
      <img src="@/assets/images/banner-logo@2x.png" />
      <p>Welcome ! Please select your wallet</p>
      <button>Select a Wallet</button>
    </div> -->
    <!-- <div class="sign-in">
      <p>Welcome back</p>
      <p>@scorpiocat14!</p>
      <div class="info">
        <div class="label">ADDRESS</div>
        <div class="address">0x123fsdf1342dwsd23423424</div>
        <button class="sign-in-button">SIGN IN</button>
      </div>
    </div> -->
    <div class="register">
      <img src="@/assets/images/banner-logo@2x.png" />
      <div class="info">
        <div class="label">ADDRESS</div>
        <div class="address">0x123fsdf1342dwsd23423424</div>
      </div>
      <div class="form">
        <div class="item">
          <p>Please enter your email address:</p>
          <input type="text" placeholder="Please enter your email address" />
        </div>
        <div class="item">
          <p>Please enter your nickname:</p>
          <input type="text" placeholder="Please enter your nickname" />
        </div>
      </div>
      <button class="register-button">REGISTER</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "login",
  setup() {
    // TODO

    return {};
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
</style>
