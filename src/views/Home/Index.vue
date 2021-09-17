/** * Created by Lay Hunt on 2021-09-03 19:59:12. */
<template>
  <div class="home">
    <banner v-if="!$store.state.global.isMobile" />
    <MobileBanner v-else />
    <info />
    <art-works v-if="!$store.state.global.isMobile" />
    <MobileArtworks v-else />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Banner from "./Banner";
import MobileBanner from "./MobileBanner";
import MobileArtworks from "./MobileArtworks";
import Info from "./Info";
import ArtWorks from "./ArtWorks";
export default defineComponent({
  name: "home",
  components: {
    Banner,
    MobileBanner,
    MobileArtworks,
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
