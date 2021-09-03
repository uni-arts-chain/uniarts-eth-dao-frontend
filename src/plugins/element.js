import { ElLoading } from "element-plus";

export default {
  install: (vue) => {
    vue.use(ElLoading.directive);
  },
};
