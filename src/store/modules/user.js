import { setLocalStore, removeLocalStore } from "@/plugins/storage";
import Wallet from "@/plugins/wallet";

export default {
  namespaced: true,
  state: {
    info: {},
  },
  mutations: {
    SET_INFO(state, info) {
      state.info = info;
    },
  },
  actions: {
    async ConnectWallet({ dispatch }) {
      await Wallet.connect();
      dispatch("InitWallet");
    },
    async InitWallet() {
      await Wallet.init();
    },
    SetInfo({ commit }, info) {
      let tokens = {
        token: info.token,
        expire_at: info.expire_at,
        address: info.address,
      };
      setLocalStore("user_token", tokens);
      commit("SET_INFO", info);
    },
    Quit({ commit, state }) {
      if (state.info.token) {
        removeLocalStore("user_token");
        commit("SET_INFO", {
          token: "",
          expire_at: "",
          address: "",
        });
      }
    },
  },
};
