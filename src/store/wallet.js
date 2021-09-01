import MetaMask from '@/components/MetaMask';

export default {
  namespaced: true,
  state: () => ({
    walletAddress: null,
    walletPrice: null,
  }),
  mutations: {
    setWalletAddress(state, data) {
      state.walletAddress = data;
    },
    setWalletPrice(state, data) {
      state.walletPrice = data;
    },
  },
  actions: {
    async login() {
      await MetaMask.initMetaMask();
      await MetaMask.connect();
      await MetaMask.checkBalances();
    },
  },
  getters: {},
};
