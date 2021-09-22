/** * Created by Lay Hunt on 2021-09-03 16:40:21. */
<template>
  <nav class="nav-bar container" v-if="!isMobile">
    <div class="logo-group">
      <img class="uniarts" src="@/assets/images/logo@2x.png" />
    </div>
    <ul class="menu-group">
      <li :class="{ active: currentPath == '/' }"><router-link to="/">Homepage</router-link></li>
      <li :class="{ active: currentPath == '/vote' }">
        <router-link to="/vote">Vote</router-link>
      </li>
      <li :class="{ active: currentPath == '/marketplace' }">
        <router-link to="/marketplace">Marketplace</router-link>
      </li>
      <li :class="{ active: currentPath == '/airdrop' }">
        <router-link to="/airdrop">Airdrop</router-link>
      </li>
      <li>
        <router-link to="/marketplace"><img src="@/assets/images/search@2x.png" /></router-link>
      </li>
      <li>
        <router-link to="/profile"><img src="@/assets/images/profile@2x.png" /></router-link>
      </li>
    </ul>
  </nav>
  <nav class="mobile-nav-bar" v-if="isMobile">
    <div class="nav-left">
      <img class="menu" src="@/assets/images/menu@2x.png" @click="onOpenDrawer" />
    </div>
    <div class="nav-center">
      <img src="@/assets/images/logo@2x.png" />
    </div>
    <div class="nav-right"></div>
  </nav>
  <el-drawer
    custom-class="uniarts-drawer"
    modal-class="uniarts-modal"
    :with-header="false"
    :lock-scroll="true"
    size="270px"
    v-if="isMobile"
    v-model="drawer"
    direction="ltr"
    :before-close="handleClose"
    destroy-on-close
  >
    <div class="top">
      <img src="@/assets/images/arrow@1x.png" @click="onClickItem" />
    </div>
    <ul class="ul-menu">
      <li :class="{ active: currentPath == '/' }">
        <router-link to="/" @click="onClickItem">Homepage</router-link>
      </li>
      <li :class="{ active: currentPath == '/vote' }">
        <router-link to="/vote" @click="onClickItem">Vote</router-link>
      </li>
      <li :class="{ active: currentPath == '/marketplace' }">
        <router-link to="/marketplace" @click="onClickItem">Marketplace</router-link>
      </li>
      <li :class="{ active: currentPath == '/airdrop' }">
        <router-link to="/airdrop" @click="onClickItem">Airdrop</router-link>
      </li>
      <li>
        <router-link to="/marketplace" @click="onClickItem">Search</router-link>
      </li>
      <li>
        <router-link to="/profile" @click="onClickItem">Account</router-link>
      </li>
    </ul>
  </el-drawer>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useRoute } from "vue-router";
import store from "@/store";
export default defineComponent({
  name: "nav-bar",
  setup() {
    const route = useRoute();

    const currentPath = computed(() => {
      return route.path;
    });

    const isMobile = computed(() => {
      return store.state.global.isMobile;
    });
    const drawer = ref(false);
    const handleClose = (done) => {
      done();
    };

    const onOpenDrawer = () => {
      drawer.value = true;
    };

    const onClickItem = () => {
      drawer.value = false;
    };

    return {
      currentPath,
      isMobile,
      drawer,
      handleClose,
      onOpenDrawer,
      onClickItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo-group {
  display: flex;
  align-items: center;
}
.uniarts {
  height: 30px;
  width: 190px;
}
.menu-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  color: $--theme-sub;
  line-height: 24px;
  li {
    margin-left: 60px;
  }
  li.active {
    color: $--theme-primary;
  }
  img {
    height: 16px;
  }
  a {
    display: flex;
    align-items: center;
  }
}
.mobile-nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .nav-left {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 20px;
      height: 14px;
    }
  }
  .nav-right {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-center {
    flex: 1 0 auto;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 154px;
      height: 24px;
    }
  }
}

.top {
  border-bottom: 1px solid #d2d2d2;
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 17px;
    height: 15px;
    margin-right: 20px;
  }
}
.ul-menu {
  margin-top: 10px;
  margin-left: 40px;
  li {
    font-family: Montserrat-Light;
    font-weight: 300;
    text-align: left;
    color: #040000;
    line-height: 55px;
  }
  li:focus {
    background-color: none;
  }
}
</style>
