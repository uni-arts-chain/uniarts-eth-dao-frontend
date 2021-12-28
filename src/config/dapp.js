import networks from "./network";
import Wallet from "@/plugins/wallet";
import Polygon from "@/config/network/polygon";
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
    if (this.state._currentChain) {
      return this.state._currentChain;
    } else {
      const currentNetwork = this.checkChainInfo(Wallet.chainId);
      if (currentNetwork) {
        return currentNetwork;
      } else {
        const localNetwork = this.checkChainInfo(Polygon.network.chainId);
        if (localNetwork) {
          return localNetwork;
        } else {
          return {};
        }
      }
    }
  }
  get isOnline() {
    return this.state._isOnline;
  }
  reset() {
    this.state._currentChain = null;
  }
  checkChainInfo(chainId) {
    console.log(chainId);
    const item = Object.values(this.networks).find(
      (v) => parseInt(v.network.chainId) == parseInt(chainId)
    );
    console.log(item);
    this.state._isOnline = item ? true : false;
    this.state._currentChain = item;
    return item;
  }
}

export default new DappConfig();
