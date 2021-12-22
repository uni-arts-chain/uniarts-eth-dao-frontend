import networks from "./network";
import Wallet from "@/plugins/wallet";

class DappConfig {
  constructor() {
    this.networks = networks;
  }
  get config() {
    if (Wallet.isConnected) {
      let chainId = parseInt(Wallet.chainId);
      let currentNetwork = Object.values(this.networks).find(
        (v) => parseInt(v.network.chainId) == chainId
      );
      if (currentNetwork) {
        return currentNetwork;
      } else {
        return {};
      }
    } else {
      return {};
    }
  }
}

export default new DappConfig();
