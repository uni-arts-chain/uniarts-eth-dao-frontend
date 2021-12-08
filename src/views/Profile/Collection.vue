/** * Created by Lay Hunt on 2021-09-08 14:14:13. */
<template>
  <div class="collectionList">
    <router-link class="title" to="/profile/collection/arts">Arts</router-link>
    <router-link class="title" to="/profile/collection/collectable">Collectable</router-link>
    <router-link class="title" to="/profile/collection/souvenirs">Souvenirs</router-link>
  </div>
  <router-view></router-view>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "collection",
  components: {},
  setup() {},
});
</script>
<style lang="scss" scoped>
.collectionList {
  padding: 0 20% 15px 20%;
  width: 100%;
  display: flex;
  flex-direction: row;

  .title {
    flex: 1;
  }
}
</style>
