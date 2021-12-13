<template>
  <div class="title">Collect Your Vote Memorials</div>
  <div class="list" v-if="keepsakes.length">
    <keepsake v-for="keepsake of keepsakes" :key="keepsake" :keepsake="keepsake"></keepsake>
  </div>
  <div v-else class="no-list">no data</div>
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
    const getMemorialsData = async () => {
      keepsakes.value = await http.userCollectedSouvenirs({});
      console.log(keepsakes.value);
    };
    onMounted(() => {
      getMemorialsData();
    });
    return {
      keepsakes,
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
  font-family: SourceHanSansSC-regular;
}

.list {
  width: 1160px;
  margin: 0 auto 30px;
  display: flex;
  flex-direction: row;
}
.no-list {
  text-align: center;
  line-height: 50px;
}
</style>
