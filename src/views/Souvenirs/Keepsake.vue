<template>
  <div class="keepsake">
    <div class="thumbnail">
      <img :src="keepsake.sample" class="thumbnail-img" @click="openKeepsake" />
    </div>
    <div class="lattice">
      <div class="title" @click="openKeepsake">{{ keepsake.title }}</div>
      <button v-loading="isLoading" :disabled="isDisable" class="collect" @click="collect">
        Collect
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import http from "@/plugins/http";
import { ref } from "vue";
import { notification } from "@/components/Notification";

export default {
  name: "Keepsake",
  props: {
    keepsake: {
      type: Object,
      default: null,
    },
  },
  emits: ["reset"],
  setup(props, { emit }) {
    const isDisable = ref(false);
    const router = useRouter();
    const isLoading = ref(false);
    const openKeepsake = () => {
      const keepsakeId = props.keepsake.id;
      if (keepsakeId) router.push("/souvenirs/detail/" + keepsakeId);
    };
    const collect = async () => {
      isLoading.value = true;
      try {
        await http.userCollectMySouvenir({ uuid: props.keepsake.uuid });
        isDisable.value = true;
        notification.success("Collect Success");
        isLoading.value = false;
        emit("reset");
      } catch (e) {
        console.log(e);
        notification.error(e);
      } finally {
        isLoading.value = false;
      }
    };
    return {
      openKeepsake,
      collect,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.keepsake {
  width: 386px;
  max-width: 100%;
  text-align: center;

  .thumbnail-img {
    cursor: pointer;
    display: block;
    width: 286px;
    height: auto;
    margin: 0 auto;
  }

  .lattice {
    width: 258px;
    line-height: 20px;
    border-radius: 4px;
    background-color: rgba(251, 250, 250, 100);
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 100);
    margin: 12px auto 70px;
    padding: 10px 20px;

    .title {
      cursor: pointer;
      color: rgba(16, 16, 16, 100);
      font-size: 16px;
      font-family: "Montserrat-Regular";
      line-height: 52px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .collect {
      cursor: pointer;
      width: 223px;
      height: 52px;
      line-height: 29px;
      border-radius: 10px 10px 10px 10px;
      background-color: rgba(4, 0, 3, 100);
      color: rgba(255, 255, 255, 100);
      font-size: 20px;
      text-align: center;
      font-family: Roboto;
    }
  }
}
</style>
