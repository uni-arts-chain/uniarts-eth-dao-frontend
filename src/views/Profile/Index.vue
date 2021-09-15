/** * Created by Lay Hunt on 2021-09-07 16:17:29. */
<template>
  <div class="index container">
    <div class="info">
      <div class="info-wrapper">
        <div class="avatar-body">
          <img src="@/assets/images/avatar@2x.png" />
          <span class="nickname">{{ userInfo.nickname }}</span>
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
        <ul class="menu" style="margin-top: 0px">
          <li class="menu-li" style="cursor: pointer" @click="onLogout">Log out</li>
        </ul>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
// import notification from "@/components/notification";
export default defineComponent({
  name: "index",
  setup() {
    // TODO
    const router = useRouter();

    const onLogout = () => {
      store.dispatch("user/Quit");
      router.push("/");
    };

    const userInfo = computed(() => {
      return store.state.user.info;
    });

    return {
      userInfo,
      onLogout,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.user.info.address) {
      next();
    } else {
      next({ path: "/login" });
    }
  },
});
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  justify-content: center;
  padding-bottom: 200px;
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
  li,
  li a {
    display: block;
    font-size: 14px;
    font-family: Montserrat-Medium, Montserrat-Light;
    font-weight: 300;
    text-align: left;
    color: #000000;
    margin-bottom: 23px;
  }
}
.content {
  width: 800px;
  margin-top: 129px;
  margin-left: 68px;
  padding-top: 184px;
}
</style>
