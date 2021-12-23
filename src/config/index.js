import contractsMap from "@/contracts";
import DappConfig from "@/config/dapp";

class Config {
  constructor() {
    this._HTTP_DEFAULT_CONFIG = null;
    this._CHAIN_DEFAULT_CONFIG = null;
    this._DAPP_CONTRACTS = null;
  }
  async init() {
    this._HTTP_DEFAULT_CONFIG = DappConfig.config.api;
    this._CHAIN_DEFAULT_CONFIG = window.NODE_CONFIG || {};
    this._DAPP_CONTRACTS = await this.buildContracts();
  }
  get HTTP_DEFAULT_CONFIG() {
    return this._HTTP_DEFAULT_CONFIG;
  }
  get CHAIN_DEFAULT_CONFIG() {
    return this._CHAIN_DEFAULT_CONFIG;
  }
  get DAPP_CONTRACTS() {
    return this._DAPP_CONTRACTS;
  }
  async buildContracts() {
    const contracts = {};
    console.log(contractsMap);
    console.log(DappConfig.config);
    return new Promise((resolve, reject) => {
      if (DappConfig.config?.contracts) {
        Object.keys(DappConfig.config?.contracts).map((key) => {
          contractsMap[key].init && contractsMap[key].init();
          contracts[DappConfig.config?.contracts[key].toLowerCase()] = {
            name: key,
            contract: contractsMap[key],
          };
        });
        resolve(contracts);
      }
      reject(contracts);
    });
  }
}

export default new Config();
