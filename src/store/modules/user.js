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
    migrateInfo: [],
  },
  mutations: {
    SET_INFO(state, info) {
      state.info = info;
    },
    SET_MIGRATE_INFO(state, info) {
      state.migrateInfo = info;
    },
  },
  getters: {
    canMigrate(state) {
      let result = state.migrateInfo.find((v) => v.can_migrate);
      return result ? true : false;
    },
    canRetrieve(state) {
      let result = state.migrateInfo.find((v) => v.can_retrieve);
      return result ? true : false;
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
    GetInfo({ commit, dispatch }) {
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
          dispatch("GetMigrateInfo");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    GetMigrateInfo({ dispatch }) {
      http
        .userGetMigrate({})
        .then((res) => {
          dispatch("SetMigrateInfo", res);
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
    SetMigrateInfo({ commit }, info) {
      commit("SET_MIGRATE_INFO", info);
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
