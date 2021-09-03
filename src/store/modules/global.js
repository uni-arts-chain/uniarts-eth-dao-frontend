export default {
  namespaced: true,
  state: {
    lang: "en",
    theme: "light",
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
  },
};
