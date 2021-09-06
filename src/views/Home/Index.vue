/** * Created by Lay Hunt on 2021-09-03 19:59:12. */
<template>
  <div class="home">
    <banner />
    <info />
    <art-works />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Banner from "./Banner";
import Info from "./Info";
import ArtWorks from "./ArtWorks";
export default defineComponent({
  name: "home",
  components: {
    Banner,
    Info,
    ArtWorks,
  },
  setup() {
    // TODO

    return {};
  },
});
</script>

<style lang="scss" scoped></style>
