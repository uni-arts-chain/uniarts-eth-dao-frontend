import Detect from "@/plugins/detect";
export default {
  namespaced: true,
  state: {
    lang: "en",
    theme: "light",
    isMobile: Detect.device.type === "mobile",
    navText: "",
  },
  mutations: {
    SET_CHAIN(state, data) {
      state.chain = data;
    },
    SET_THEME(state, theme) {
      state.theme = theme;
    },
    SET_SYMBOL(state, obj) {
      state.symbol = obj.symbol ? obj.symbol : "uart";
    },
    SET_DEVICE(state, status) {
      state.isMobile = status === "mobile" || window.innerWidth <= 750;
    },
    SET_NAV_TEXT(state, text) {
      state.navText = text;
    },
  },
  actions: {
    SetChain({ commit }, data) {
      commit("SET_CHAIN", data);
    },
    SetTheme({ commit }, theme) {
      commit("SET_THEME", theme);
    },
    SetSymbol({ commit }, symbol) {
      commit("SET_SYMBOL", symbol);
    },
    SetNavText({ commit }, text) {
      commit("SET_NAV_TEXT", text);
    },
    WindowResize({ commit }) {
      commit("SET_DEVICE", Detect.getInstance().getDevice().type);
    },
  },
};
