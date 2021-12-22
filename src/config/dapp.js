import networks from "./network";
import Wallet from "@/plugins/wallet";
import { reactive } from "vue";

class DappConfig {
  constructor() {
    this.networks = networks;
    this.state = reactive({
      _isOnline: false,
      _currentChain: null,
    });
  }
  get config() {
    if (Wallet.isConnected) {
      if (this.state._currentChain) {
        return this.state._currentChain;
      } else {
        const currentNetwork = this.checkChainInfo(Wallet.chainId);
        if (currentNetwork) {
          return currentNetwork;
        } else {
          return {};
        }
      }
    } else {
      return {};
    }
  }
  get isOnline() {
    return this.state._isOnline;
  }
  checkChainInfo(chainId) {
    console.log(chainId);
    const item = Object.values(this.networks).find(
      (v) => parseInt(v.network.chainId) == parseInt(chainId)
    );
    this.state._isOnline = item ? true : false;
    this.state._currentChain = item;
    return item;
  }
}

export default new DappConfig();
