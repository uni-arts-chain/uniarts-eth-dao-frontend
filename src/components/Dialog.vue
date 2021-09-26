/** * Created by Lay Hunt on 2021-09-24 15:06:52. */
<template>
  <el-dialog
    :modal="true"
    v-model="dialogVisible"
    :append-to-body="true"
    :lock-scroll="true"
    :close-on-press-escape="false"
    :show-close="false"
    :close="close"
    custom-class="vote-dialog"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, watch, emit } from "vue";
export default defineComponent({
  name: "dialog",
  model: {
    prop: "visible",
    emit: "update",
  },
  emit: ["update"],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // TODO
    const dialogVisible = ref(false);

    watch(props.visible, (value) => {
      dialogVisible.value = value;
    });

    const onClose = () => {
      emit("update:visible", false);
      dialogVisible.value = false;
    };
    return {
      dialogVisible,
      onClose,
    };
  },
});
</script>

<style lang="scss" scoped></style>
