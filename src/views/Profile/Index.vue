/** * Created by Lay Hunt on 2021-09-07 16:17:29. */
<template>
  <div class="index container">
    <div class="info">
      <div class="info-wrapper">
        <div class="avatar-body">
          <img src="@/assets/images/avatar@2x.png" />
          <span class="nickname">Kyle Bighead</span>
        </div>
        <ul class="menu">
          <li class="menu-li"><router-link class="link" to="/profile">My Assets</router-link></li>
          <li class="menu-li">
            <router-link class="link" to="/profile/history">Reward History</router-link>
          </li>
          <li class="menu-li">
            <router-link class="link" to="/profile/collection">My Collection</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "index",
  setup() {
    // TODO

    return {};
  },
});
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  justify-content: center;
}
.info {
  margin-top: 129px;
  min-width: 200px;
  display: flex;
  justify-content: flex-end;
}
.info-wrapper {
  display: flex;
  flex-direction: column;
}
.avatar-body {
  display: flex;
  flex-direction: column;
  img {
    width: 82px;
    height: 82px;
    overflow: hidden;
    border-radius: 50%;
    margin-left: 7px;
    /* border: 2px solid black; */
  }
  .nickname {
    margin-top: 22px;
    font-size: 15px;
    font-family: Montserrat-Medium;
    text-align: left;
    color: #000000;
    display: block;
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.menu {
  margin-top: 61px;
  display: flex;
  flex-direction: column;
  li {
    display: block;
    font-size: 14px;
    font-family: Montserrat-Medium, Montserrat-Light;
    font-weight: 300;
    text-align: left;
    color: #000000;
    margin-bottom: 45px;
  }
}
.content {
  width: 800px;
  margin-top: 129px;
  margin-left: 68px;
  padding-top: 184px;
}
</style>
