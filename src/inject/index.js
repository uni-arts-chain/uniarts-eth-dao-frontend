import Wallet from "@/plugins/wallet";
import Icon from "@/plugins/icon";

import detect from "@/plugins/detect";
import Element from "@/plugins/element";
import copy from "clipboard-copy";

export default {
  install: async (vue) => {
    vue.use(Icon);
    vue.use(Element);
    vue.config.globalProperties.$browser = detect.browser;
    vue.config.globalProperties.$wallet = Wallet;
    vue.config.globalProperties.$copy = copy;
  },
};
