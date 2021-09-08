import { ElLoading, ElRow, ElCol, ElPopover } from "element-plus";

export default {
  install: (vue) => {
    vue.use(ElLoading.directive);
    vue.use(ElRow);
    vue.use(ElCol);
    vue.use(ElPopover);
  },
};
