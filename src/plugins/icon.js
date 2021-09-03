import IconSvg from "@/components/IconSvg";

const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const req = require.context("../assets/icons", false, /\.svg$/);
requireAll(req);

export default {
  install: (vue) => {
    vue.component("icon-svg", IconSvg);
  },
};
