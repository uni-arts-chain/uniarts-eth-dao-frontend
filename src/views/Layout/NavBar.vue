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
      <!-- <li :class="{ active: currentPath == '/souvenirs' }">
        <router-link to="/souvenirs">Souvenirs</router-link>
      </li> -->
      <!--      <li>-->
      <!--        <router-link to="/marketplace"><img src="@/assets/images/search@2x.png" /></router-link>-->
      <!--      </li>-->
      <li>
        <router-link to="/profile"><img src="@/assets/images/profile@2x.png" /></router-link>
      </li>
      <li class="network">
        <el-dropdown trigger="click" @command="onNetworkChange">
          <div>
            <button class="network-button" v-if="currentChainInfo.chainId">
              <icon-svg
                :icon-class="currentChainInfo.chainName?.toLowerCase().split(' ').join('-')"
                v-if="currentChainInfo.hasIcon"
              />
              <span style="text-transform: capitalize">{{ currentChainInfo.chainName }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </button>
            <button v-else class="network-button">
              <span style="color: red">Unknown Network</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </button>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="v" v-for="(v, i) in networkList" :key="i">
                <icon-svg :icon-class="v.chainName.toLowerCase().split(' ').join('-')" /><span>{{
                  v.chainName
                }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </nav>
  <nav class="mobile-nav-bar" v-if="isMobile">
    <div class="nav-left">
      <img class="menu" src="@/assets/images/menu@2x.png" @click="onOpenDrawer" />
    </div>
    <div class="nav-center">
      <span v-if="$store.state.global.navText">{{ $store.state.global.navText }}</span>
      <img v-else src="@/assets/images/logo@2x.png" />
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
    <div
      style="
        height: calc(100% - 70px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
    >
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
        <!-- <li :class="{ active: currentPath == '/souvenirs' }">
          <router-link to="/souvenirs" @click="onClickItem">Souvenirs</router-link>
        </li> -->
        <li>
          <router-link to="/profile" @click="onClickItem">Account</router-link>
        </li>
        <li v-if="$store.getters['user/canMigrate']" class="icon-link">
          <router-link to="/migrate" @click="onClickItem"
            >Migrate<icon-svg icon-class="new"
          /></router-link>
        </li>
        <li v-if="$store.state.user.info.address">
          <span @click="onLogout">Log out</span>
        </li>
      </ul>
      <ul class="ul-menu bottom">
        <li class="network">
          <button class="network-button" v-if="currentChainInfo.chainId" @click="showDialog">
            <icon-svg
              :icon-class="currentChainInfo.chainName?.toLowerCase().split(' ').join('-')"
              v-if="currentChainInfo.hasIcon"
            />
            <span style="text-transform: capitalize">{{ currentChainInfo.chainName }}</span>
          </button>
          <button v-else class="network-button" @click="showDialog">
            <span style="color: red">Unknown Network</span>
          </button>
        </li>
        <li class="parter">
          Audit by
          <div class="parter-icon"></div>
        </li>
      </ul>
    </div>
  </el-drawer>
  <MobileConfirm v-model="dialogTableVisible" customClass="retrieve-confirm">
    <div class="confirm-content">
      <div class="title">Select Network</div>
      <div class="list">
        <div class="item" v-for="(v, i) in networkList" :key="i" @click="onNetworkChange(v)">
          <icon-svg :icon-class="v.chainName.toLowerCase().split(' ').join('-')" /><span>{{
            v.chainName
          }}</span>
        </div>
      </div>
    </div>
  </MobileConfirm>
</template>

<script>
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import MobileConfirm from "@/components/MobileConfirm";
import { useRoute, useRouter } from "vue-router";
import DappConfig from "@/config/dapp";
import { notification } from "@/components/Notification";
import wallet from "@/plugins/wallet";
import store from "@/store";
export default defineComponent({
  name: "nav-bar",
  components: {
    MobileConfirm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const currentPath = computed(() => {
      return route.path;
    });

    watch(currentPath, () => {
      store.dispatch("global/SetNavText", null);
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

    const onLogout = () => {
      store.dispatch("user/Quit");
      drawer.value = false;
      router.push("/");
    };

    const currentChainInfo = ref({});
    const getCurrentChainInfo = (currentChainId) => {
      if (!wallet.provider) return;
      const item = Object.values(DappConfig.networks).find(
        (v) => v.network.chainId == currentChainId
      );

      if (item) {
        currentChainInfo.value = item.network;
        currentChainInfo.value.hasIcon = item ? true : false;
      }
    };

    onMounted(() => {
      setTimeout(() => {
        if (wallet.provider) {
          wallet.getCurrentChainId().then((res) => {
            const currentChainId = "0x" + new Number(res).toString(16);
            getCurrentChainInfo(currentChainId);
          });

          wallet.provider.on("chainChanged", (currentChainId) => {
            getCurrentChainInfo(currentChainId);
          });
        }
      }, 3000);
    });

    const onNetworkChange = async (command) => {
      if (!wallet.provider) {
        notification.error("Please install the wallet first");
      }
      const chainInfo = command;
      await wallet.switchNetwork(chainInfo);
      dialogTableVisible.value = false;
      onClickItem();
    };

    const networkList = ref(Object.values(DappConfig.networks).map((v) => v.network));

    const dialogTableVisible = ref(false);

    const showDialog = () => {
      dialogTableVisible.value = true;
    };

    return {
      currentPath,
      isMobile,
      drawer,
      handleClose,
      onOpenDrawer,
      onClickItem,
      onLogout,
      onNetworkChange,
      currentChainInfo,
      networkList,
      dialogTableVisible,
      showDialog,
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
  li.network {
    display: flex;
    align-items: center;
    margin-left: 30px;
    .network-button {
      background-color: #f0f0f0;
      color: black;
      /* background-color: transparent; */
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 14px;
      border-radius: 6px;
      padding: 6px 15px;
      .svg-icon {
        margin-right: 10px;
        font-size: 24px;
      }
    }
  }
  img {
    height: 16px;
  }
  a {
    display: flex;
    align-items: center;
  }
}

.el-dropdown-menu {
  padding-left: 5px;
  padding-right: 5px;
}
.el-dropdown-menu__item:hover {
  border-radius: 6px;
}
.el-dropdown-menu__item {
  display: flex;
  align-items: center;
  padding: 2px 15px;
  .svg-icon {
    margin-right: 15px;
    font-size: 24px;
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
  li.icon-link {
    > a {
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
.ul-menu.bottom {
  margin-bottom: 40px;
  margin-right: 40px;
  li {
    width: 100%;
    display: flex;
    align-items: center;
  }
  li.network {
    display: flex;
    justify-content: center;
    .network-button {
      max-width: 100%;
      background-color: #f0f0f0;
      color: black;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 14px;
      border-radius: 6px;
      padding: 6px 15px;
      .svg-icon {
        margin-right: 10px;
        font-size: 24px;
      }
    }
  }
  li.parter {
    margin: 0 auto;
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    line-height: 23px;
    font-size: 14px;
    .parter-icon {
      width: 120px;
      height: 40px;
      background: url(~@/assets/images/certik-white.png) no-repeat;
      background-size: 190px 70px;
      background-position: -35px -16px;
      border-radius: 10px;
    }
  }
}
.confirm-content {
  padding: 20px 15px;
  .title {
    font-size: 20px;
    width: 100%;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 40px;
  }
  .list {
    width: 100%;
    min-height: 100px;
    margin-bottom: 30px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .item {
      width: 80%;
      min-width: 310px;
      padding: 15px 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .item .svg-icon {
      margin-right: 30px;
      font-size: 27px;
    }
    .item > span {
      font-size: 20px;
    }
  }
}
</style>
