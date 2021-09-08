import { ElLoading, ElRow, ElCol } from "element-plus";

export default {
  install: (vue) => {
    vue.use(ElLoading.directive);
    vue.use(ElRow);
    vue.use(ElCol);
  },
};
