import { setLocalStore, getLocalStore, removeLocalStore } from "@/plugins/storage";
import http from "@/plugins/http";
import Wallet from "@/plugins/wallet";

export default {
  namespaced: true,
  state: {
    info: Object.assign(
      {},
      JSON.parse(getLocalStore("user_token") || '{ "token": "", "expire_at": "", "address": "" }')
    ),
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
    GetInfo({ commit }) {
      http
        .userGetInfo({})
        .then((info) => {
          let tokens = {
            token: info.token,
            expire_at: info.expire_at,
            address: info.address,
          };
          setLocalStore("user_token", tokens);
          commit("SET_INFO", info);
        })
        .catch((err) => {
          console.log(err);
        });
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
        http
          .userLogout({})
          .then(() => {
            removeLocalStore("user_token");
            commit("SET_INFO", {
              token: "",
              expire_at: "",
              address: "",
            });
          })
          .catch(() => {
            removeLocalStore("user_token");
            commit("SET_INFO", {
              token: "",
              expire_at: "",
              address: "",
            });
          });
      }
    },
  },
};
