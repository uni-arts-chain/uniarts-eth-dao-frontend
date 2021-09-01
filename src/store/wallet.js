import MetaMask from '@/contract/MetaMask';
import TokenLockerContract from '@/contract/TokenLockerContract';

export default {
  namespaced: true,
  state: () => ({
    walletAddress: null,
    walletPrice: null,
    lockPositionAmount: null,
  }),
  mutations: {
    setWalletAddress(state, data) {
      state.walletAddress = data;
    },
    setWalletPrice(state, data) {
      state.walletPrice = data;
    },
    setLockPositionAmount(state, data) {
      state.lockPositionAmount = data;
    },
  },
  actions: {
    async login() {
      await MetaMask.initMetaMask();
      await MetaMask.connect();
      await MetaMask.checkBalances();
      TokenLockerContract.queryLockPosition();
    },
  },
  getters: {},
};
