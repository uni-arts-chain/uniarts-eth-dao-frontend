import Detect from "@/plugins/detect";
import { ElLoading } from "element-plus";
import Config from "@/config";
import http from "@/plugins/http";

export default {
  namespaced: true,
  state: {
    lang: "en",
    theme: "light",
    isMobile: Detect.device.type === "mobile",
    navText: "",
    isPageLoading: true,
    setting: {},
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
    SET_PAGE_LOADING(state, status) {
      state.isPageLoading = status;
    },
    SET_SETTING(state, setting) {
      state.setting = setting;
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
    DetectNetwork({ dispatch, commit }) {
      dispatch("WindowResize");
      commit("SET_PAGE_LOADING", true);
      const loadingInstance = ElLoading.service({
        text: "Detecting network...",
        customClass: "service-loading",
      });
      setTimeout(async () => {
        try {
          await dispatch("user/ConnectWallet", null, { root: true });
          await Config.init();
          let settings = await http.globalGetSettings({});
          console.log(settings);
          settings && commit("SET_SETTING", settings);
          commit("SET_PAGE_LOADING", false);
          loadingInstance.close();
        } catch (e) {
          console.log(e);
          commit("SET_PAGE_LOADING", false);
          loadingInstance.close();
        }
      }, 2000);
    },
  },
};
