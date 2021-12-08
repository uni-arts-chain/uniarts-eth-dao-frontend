/** * Created by Lay Hunt on 2021-09-07 16:17:29. */
<template>
  <div class="index container">
    <div class="info" v-if="!$store.state.global.isMobile">
      <div class="info-wrapper">
        <div class="avatar-body">
          <img src="@/assets/images/avatar@2x.png" />
          <span class="nickname">{{ userInfo.nickname }}</span>
        </div>
        <ul class="menu">
          <li class="menu-li"><router-link class="link" to="/profile">My Assets</router-link></li>
          <li class="menu-li">
            <router-link class="link" to="/profile/votes">My Votes</router-link>
          </li>
          <li class="menu-li">
            <router-link class="link" to="/profile/history">My Rewards</router-link>
          </li>
          <li class="menu-li">
            <router-link class="link" to="/profile/collection/arts">My Collection</router-link>
          </li>
          <li class="menu-li">
            <router-link class="link" to="/profile/my_order">My Order</router-link>
          </li>
          <li class="menu-li">
            <router-link class="link" to="/profile/unbond">Unbond History</router-link>
          </li>
          <li class="menu-li icon-link" v-if="$store.getters['user/canMigrate']">
            <router-link class="link" to="/profile/migrate"
              >Migrate<icon-svg icon-class="new"
            /></router-link>
          </li>
        </ul>
        <ul class="menu" style="margin: 11px 0">
          <li class="menu-li" style="cursor: pointer" @click="onLogout">Log out</li>
        </ul>
      </div>
    </div>
    <div class="info" v-else>
      <div class="info-wrapper">
        <el-tabs v-model="curTab" @tab-click="handleClick">
          <el-tab-pane label="My Assets" name="1">
            <template #label>
              <router-link class="link" to="/profile">My Assets</router-link>
            </template>
          </el-tab-pane>
          <el-tab-pane label="My Votes" name="2">
            <template #label>
              <router-link class="link" to="/profile/votes">My Votes</router-link>
            </template>
          </el-tab-pane>
          <el-tab-pane label="Rewards History" name="5">
            <template #label>
              <router-link class="link" to="/profile/history">My Rewards</router-link>
            </template>
          </el-tab-pane>
          <el-tab-pane label="My Colloection" name="3">
            <template #label>
              <router-link class="link" to="/profile/collection/arts">My Collection</router-link>
            </template>
          </el-tab-pane>
          <el-tab-pane label="My Colloection" name="6">
            <template #label>
              <router-link class="link" to="/profile/my_order">My Order</router-link>
            </template>
          </el-tab-pane>
          <el-tab-pane label="Unbond History" name="4">
            <template #label>
              <router-link class="link" to="/profile/unbond">Unbond History</router-link>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "@/store";
export default defineComponent({
  name: "index",

  setup() {
    // TODO
    const router = useRouter();
    const route = useRoute();

    store.dispatch("global/SetNavText", "Account");

    const curTab = ref("1");
    switch (route.path) {
      case "/profile/assets":
        curTab.value = "1";
        break;
      case "/profile/votes":
        curTab.value = "2";
        break;
      case "/profile/unbond":
        curTab.value = "4";
        break;
      case "/profile/collection/arts":
      case "/profile/collection":
        curTab.value = "3";
        break;
      case "/profile/history":
        curTab.value = "3";
        break;
    }

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
      curTab,
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
  li .link {
    display: block;
    font-size: 14px;
    font-family: Montserrat-Medium, Montserrat-Light;
    font-weight: 300;
    text-align: left;
    background-color: transparent;
    cursor: pointer;
    color: #000000;
    margin-top: 11px;
    margin-bottom: 11px;
    display: inline-block;
  }
  li.icon-link {
    .link {
      position: relative;
      .svg-icon {
        position: absolute;
        left: calc(100% + 5px);
        bottom: calc(100% - 10px);
        font-size: 27px;
        color: red;
      }
    }
  }
}
.content {
  width: 800px;
  margin-top: 129px;
  margin-left: 68px;
  padding-top: 184px;
}

@media screen and (max-width: 750px) {
  .index {
    flex-direction: column;
    padding-bottom: 40px;
    .content {
      width: 100%;
      margin: 0;
      padding-top: 0;
    }
    .info {
      width: 100%;
      margin-top: 10px;
      .info-wrapper {
        width: 100%;
        :deep .el-tabs__nav-wrap::after {
          display: none;
        }
        :deep .el-tabs__item a {
          color: #a1a1a1;
          font-size: 15px;
        }
        :deep .el-tabs__item.is-active a,
        :deep .el-tabs__item:hover a {
          color: black;
          font-weight: 600;
          font-family: Montserrat-Medium;
        }
        :deep .el-tabs__active-bar.is-top {
          background-color: black;
        }
      }
    }
  }
}
</style>
