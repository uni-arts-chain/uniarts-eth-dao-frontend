import Wallet from "@/plugins/wallet";
import Icon from "@/plugins/icon";

import detect from "@/plugins/detect";
import Element from "@/plugins/element";
import http from "@/plugins/http";
import copy from "clipboard-copy";

export default {
  install: async (vue) => {
    vue.use(Icon);
    vue.use(Element);
    vue.config.globalProperties.$browser = detect.browser;
    vue.config.globalProperties.$http = http;
    vue.config.globalProperties.$wallet = Wallet;
    vue.config.globalProperties.$copy = copy;
  },
};
