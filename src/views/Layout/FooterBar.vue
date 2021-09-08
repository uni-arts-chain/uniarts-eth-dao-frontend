/** * Created by Lay Hunt on 2021-09-03 16:40:35. */
<template>
  <footer class="footer-bar">
    <div class="container">
      <div class="bottom-logo">
        <img class="logo-bt" src="@/assets/images/footer-logo@2x.png" />
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
        <img class="uniarts-logo" src="@/assets/images/bottom-uniarts@2x.png" />
        <a
          href="https://github.com/uni-arts-chain/UniArts-white-paper/blob/master/UniArts_White_Paper.pdf"
          target="_blank"
          class="white-page"
          >Get project white papers</a
        >
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
  align-items: center;
  justify-content: space-between;
}
.bottom-logo {
  img.logo-bt {
    width: 292px;
    height: 67px;
    margin-bottom: 15px;
  }
  .intro {
    width: 495px;
    font-size: 20px;
    font-family: Montserrat, Montserrat-Bold;
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
  img.uniarts-logo {
    width: 125px;
    height: 20px;
  }
  .white-page {
    display: block;
    width: 422px;
    height: 71px;
    background: url(~@/assets/images/white-page@2x.png);
    background-size: 100% 111px;
    position: relative;
    left: -50px;
    padding: 30px 50px 0 50px;
    color: white;
  }
}
</style>
