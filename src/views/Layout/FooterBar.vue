/** * Created by Lay Hunt on 2021-09-03 16:40:35. */
<template>
  <footer class="footer-bar">
    <div class="container">
      <div class="bottom-logo">
        <div class="logo-bt">
          <img src="@/assets/images/footer-logo@2x.png" />
          <div class="split—line"></div>
          <img src="@/assets/images/certik.png" />
        </div>
        <div class="intro">
          Community guidelines•Terms of Service Privacy• Policy•Report content
        </div>
        <div class="label">2021 The Impossible Art Fromula</div>
        <div class="social-group">
          <a href="https://t.me/uniarts" target="_blank"
            ><img src="@/assets/images/telegram.png"
          /></a>
          <a href="https://uniartsnetwork.medium.com" target="_blank"
            ><img src="@/assets/images/medium.png"
          /></a>
          <a href="https://twitter.com/UniartsNetwork" target="_blank"
            ><img src="@/assets/images/twitter.png"
          /></a>
          <a href="https://github.com/uni-arts-chain" target="_blank"
            ><img src="@/assets/images/github.png"
          /></a>
        </div>
      </div>
      <div class="info">
        <div class="uniarts-logo">
          <img src="@/assets/images/uniarts.png" style="height: 25px" />
          <img src="@/assets/images/polygon.png" style="height: 25px" />
          <img src="@/assets/images/acid.png" style="height: 25px" />
          <img src="@/assets/images/art.png" style="height: 34px" />
        </div>
        <a
          class="white-page"
          href="https://github.com/uni-arts-chain/UniArts-white-paper/blob/master/UniArts_White_Paper.pdf"
          target="_blank"
          >Get project white papers</a
        >
        <div class="desc">UniArts granted by Web3 Foundation</div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "footer-bar",
  setup() {
    // TODO

    return {};
  },
});
</script>

<style lang="scss" scoped>
.footer-bar {
  padding-top: 70px;
  padding-bottom: 89px;
  height: 401px;
  background: black;
}

.container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.bottom-logo {
  .logo-bt {
    width: 207px;
    height: 48px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    .split—line {
      border: 1px solid #fff;
      width: 1px;
      height: 100%;
      background-color: #fff;
      margin-left: 10px;
      margin-right: 10px;
      position: relative;
    }
    .img {
      height: 100%;
    }
  }

  .intro {
    width: 495px;
    font-size: 19px;
    font-family: Montserrat-Regular;
    font-weight: 700;
    text-align: left;
    color: #ffffff;
    line-height: 30px;
  }

  .label {
    font-size: 16px;
    font-family: Montserrat-Light;
    font-weight: 100;
    text-align: left;
    color: #ffffff;
    line-height: 30px;
    margin-bottom: 24px;
  }

  .social-group {
    img {
      width: 25px;
      margin-right: 35px;
    }
  }
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .uniarts-logo {
    height: 20px;
    display: flex;
    align-items: center;

    img {
      margin: 0 20px;
    }
  }

  .white-page {
    margin-top: 20px;
    display: block;
    width: 422px;
    height: 71px;
    background: url(~@/assets/images/white-page@2x.png);
    background-size: 100% 111px;
    position: relative;
    padding: 30px 50px 0 50px;
    color: white;
  }
}

.desc {
  margin-top: 70px;
  width: calc(100% - 30px);
  margin-right: 30px;
  border-top: 1px solid rgb(160, 160, 160);
  color: white;
  padding-top: 20px;
  font-size: 16px;
  font-family: Montserrat-Light;
}
</style>
