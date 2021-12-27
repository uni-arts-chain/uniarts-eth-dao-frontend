/** * Created by Lay Hunt on 2021-09-08 14:14:13. */
<template>
  <div class="collectionList">
    <router-link active-class="select" class="title" to="/profile/collection/arts">
      Arts
    </router-link>
    <!-- <router-link active-class="select" class="title" to="/profile/collection/collectable">
      Collectable
    </router-link> -->
    <span class="title">Collectable</span>
    <router-link active-class="select" class="title" to="/profile/collection/souvenirs">
      Souvenirs
    </router-link>
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
  @media screen and (max-width: 750px) {
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
  }
  margin-bottom: 20px;
  padding: 0 20% 15px 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .title {
    /* flex: 1; */
  }

  span.title {
    color: #bbb;
  }

  .select {
    font-weight: 900;
    text-decoration: underline;
  }
}
</style>
