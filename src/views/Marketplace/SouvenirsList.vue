/** * Created by Lay Hunt on 2021-09-08 18:13:44. */
<template>
  <div></div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import http from "@/plugins/http";

export default defineComponent({
  name: "SouvenirsList",
  setup() {
    const getSortType = async () => {
      const sortTypes = await http.globalGetSouvenirsSortTypes({});
      console.log(sortTypes);
    };
    onMounted(() => {
      getSortType();
    });
  },
});
</script>
<style lang="scss" scoped></style>
