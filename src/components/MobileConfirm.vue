/** * Created by Lay Hunt on 2021-09-23 00:19:32. */
<template>
  <el-drawer
    v-model="visible"
    :open-delay="0"
    :close-delay="0"
    :with-header="false"
    modal-class="mobile-confirm-modal"
    custom-class="mobile-confirm"
    direction="btt"
    :before-close="handleClose"
  >
    <slot></slot>
  </el-drawer>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "mobilecomfirm",
  model: {
    value: "visible",
    event: "update",
  },
  setup() {
    // TODO
    const visible = ref(false);
    const onClose = () => {
      return;
    };
    return {
      visible,

      onClose,
    };
  },
});
</script>

<style lang="scss" scoped></style>
