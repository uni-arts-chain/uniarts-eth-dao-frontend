<template>
  <div class="title">Collect Your Vote Memorials</div>
  <div class="list">
    <keepsake></keepsake>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Keepsake from "@/views/Souvenirs/Keepsake";

export default defineComponent({
  name: "Souvenirs",
  components: { Keepsake },
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
  margin: 0 auto;
  width: 1160px;
}
</style>
