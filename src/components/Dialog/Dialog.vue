/** * Created by Lay Hunt on 2020-11-20 17:08:48. */
<template>
  <el-dialog
    :custom-class="{
      dialog: true,
      medium: type == 'medium',
      small: type == 'small',
      fullscreen: type == 'fullscreen',
      message: displayType == 'PluginError',
    }"
    :width="width"
    :modal="false"
    v-model="dialogVisible"
    :append-to-body="true"
    :lock-scroll="true"
    :close-on-click-modal="clickModel"
    :close-on-press-escape="false"
    :show-close="showClose"
    top="0"
    :before-close="handleClose"
    @closed="closed"
  >
    <slot></slot>
  </el-dialog>
</template>
<script>
export default {
  name: "uni-dialog",
  emit: ["closed"],
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    close: {
      type: Function,
      default: function () {
        this.$emit("update:visible", false);
        this.dialogVisible = false;
      },
    },
    displayType: {
      type: String,
      default: "dialog",
    },
    type: {
      type: String,
      default: "medium",
    },
    clickModel: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "50%",
    },
  },
  watch: {
    visible(value) {
      this.dialogVisible = value;
      if (value) {
        this.$el.addEventListener("wheel", this.lockScreen);
      } else {
        this.$el.removeEventListener("wheel", this.lockScreen);
      }
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    if (this.visible) {
      this.$el.addEventListener("wheel", this.lockScreen);
    }
  },
  methods: {
    handleClose() {
      this.close();
    },
    lockScreen(e) {
      e.preventDefault();
    },
    closed() {
      this.$emit("closed");
    },
  },
};
</script>
<style lang="scss" scoped></style>
