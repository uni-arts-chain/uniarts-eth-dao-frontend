<template>
  <div class="title">Collect Your Vote Memorials</div>
  <div v-loading="isLoading">
    <div class="list" v-if="keepsakes.length">
      <keepsake
        @reset="getMemorialsData"
        v-for="keepsake of keepsakes"
        :key="keepsake"
        :keepsake="keepsake"
      ></keepsake>
    </div>
    <div v-else class="no-list">no data</div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import Keepsake from "@/views/Souvenirs/Keepsake";
import http from "@/plugins/http";

export default defineComponent({
  name: "Souvenirs",
  components: { Keepsake },
  setup() {
    const keepsakes = ref([]);
    const isLoading = ref(false);
    const getMemorialsData = async () => {
      isLoading.value = true;
      keepsakes.value = await http.userCollectedSouvenirs({});
      isLoading.value = false;
    };
    onMounted(() => {
      getMemorialsData();
    });
    return {
      getMemorialsData,
      keepsakes,
      isLoading,
    };
  },
});
</script>
<style lang="scss" scoped>
.title {
  margin-top: 150px;
  margin-bottom: 80px;
  color: rgba(16, 16, 16, 100);
  font-size: 25px;
  text-align: center;
  font-family: "Montserrat-Regular";
}

.list {
  width: 1160px;
  margin: 0 auto 100px;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 750px) {
    display: unset;
  }
}

.keepsake {
  /* margin-right: 20px; */
}

.no-list {
  text-align: center;
  line-height: 200px;
  height: 400px;
}

@media screen and (max-width: 765px) {
  .title {
    font-size: 22px;
  }
}
</style>
