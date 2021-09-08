/** * Created by Lay Hunt on 2021-09-03 16:40:21. */
<template>
  <nav class="nav-bar container">
    <div class="logo-group">
      <img class="logo" src="@/assets/images/logo@2x.png" />
      <img class="uniarts" src="@/assets/images/uniarts@2x.png" />
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
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "nav-bar",
  setup() {
    const route = useRoute();

    const currentPath = computed(() => {
      return route.path;
    });

    return {
      currentPath,
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
.logo {
  height: 30px;
  width: 45px;
  margin-right: 11px;
}
.uniarts {
  height: 16px;
  width: 134px;
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
</style>
