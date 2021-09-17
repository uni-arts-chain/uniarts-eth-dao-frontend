import {
  ElLoading,
  ElRow,
  ElCol,
  ElPopover,
  ElCarousel,
  ElDialog,
  ElDropdown,
  ElDrawer,
} from "element-plus";
import "element-plus/dist/index.css";

export default {
  install: (vue) => {
    vue.use(ElLoading);
    vue.use(ElRow);
    vue.use(ElCol);
    vue.use(ElPopover);
    vue.use(ElCarousel);
    vue.use(ElDialog);
    vue.use(ElDropdown);
    vue.use(ElDrawer);
  },
};
