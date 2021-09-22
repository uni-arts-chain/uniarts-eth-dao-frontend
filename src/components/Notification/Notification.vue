/** * Created by Lay Hunt on 2021-01-15 15:19:07. */
<template>
  <div class="notification">
    <div class="logo">
      <Icon icon-class="success" class="success" v-if="noticeType == 'success'" />
      <Icon icon-class="loading" class="loading" v-if="noticeType == 'loading'" />
      <Icon icon-class="error" class="error" v-if="noticeType == 'error'" />
      <Icon icon-class="info" class="info" v-if="noticeType == 'info'" />
    </div>
    <div class="body">
      <h1 v-if="noticeTitle">{{ noticeTitle }}</h1>
      <p v-if="noticeMessage">{{ noticeMessage }}</p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Icon from "../IconSvg.vue";
export default defineComponent({
  name: "notification",
  props: {
    noticeType: {
      type: String,
      default: "info",
    },
    noticeTitle: {
      type: String,
      default: "",
    },
    noticeMessage: {
      type: String,
      default: "",
    },
  },
  components: {
    Icon,
  },
  created() {},
  data() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.notification {
  display: flex;
  align-items: center;
  min-height: 50px;
  .logo {
    display: flex;
    align-items: center;
    color: black;
    font-size: 18px;
    margin-right: 20px;
    .success {
      color: green;
    }
    .error {
      color: red;
    }
  }
  .body {
    > h1 {
      font-size: 20px;
      color: black;
      font-weight: 500;
      margin-bottom: 5px;
    }
    > p {
      font-size: 18px;
      color: black;
      word-break: break-word;
    }
  }
}
@media screen and (max-width: 750px) {
  .notification {
    .logo {
      font-size: 16px;
    }
    .body {
      > h1 {
        font-size: 17px;
      }
      > p {
        font-size: 16px;
      }
    }
  }
}
</style>
