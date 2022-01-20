import { BigNumber } from "@/plugins/bignumber";
import Web3Utils from "web3-utils";
import { reactive } from "vue";
import { getChainByChainId } from "evm-chains";
class Wallet {
  constructor() {
    // this.provider = window.ethereum || window.BinanceChain || window.onto;
    this.provider = "";
    this.state = reactive({
      connectedAccount: "",
      chainId: "",
      accountBalance: "",
      isConnected: false,
    });
    this.accountsChanged = () => {};
    this.chainChanged = () => {};
  }
  get connectedAccount() {
    return this.state.connectedAccount;
  }
  get chainId() {
    return this.state.chainId;
  }
  get accountBalance() {
    return this.state.accountBalance;
  }
  get isConnected() {
    return this.state.isConnected;
  }
  async init() {
    if (!this.provider) {
      throw {
        code: 100,
      };
    }
    if (this.isConnected) return;
    this.setListener();
    let account = await this.provider.request({
      method: "eth_accounts",
    });
    if (account.length <= 0) {
      throw {
        code: 300,
      };
    }
    console.log("account: ", account);
    let address = account[0];
    this.state.connectedAccount = address;
    this.state.chainId = parseInt(this.provider.chainId);
    let balance = await this.provider.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });
    if (balance) {
      this.state.accountBalance = new BigNumber(balance).shiftedBy(-18).toString();
    }
    this.state.isConnected = true;
    return;
  }
  async setProvider(provider) {
    this.provider = provider;
    this.state.connectedAccount = "";
    this.state.chainId = "";
    this.state.accountBalance = "";
    this.state.isConnected = false;
  }
  async setListener() {
    if (!this.provider) {
      throw {
        code: 100,
      };
    }
    if (this.provider.on) {
      this.provider.on("accountsChanged", (accounts) => {
        this.state.connectedAccount = accounts[0];
        this.accountsChanged();
      });
      this.provider.on("chainChanged", (chainId) => {
        this.state.chainId = parseInt(chainId);
        this.chainChanged();
      });
    }
  }
  async connect() {
    // this.provider = window.ethereum || window.BinanceChain || window.onto;
    if (!this.provider) {
      throw {
        code: 100,
      };
    }
    await this.provider.request({
      method: "eth_requestAccounts",
    });
    await this.init();
  }
  async request(obj) {
    let result = await this.provider.request({
      method: obj.method,
      params: obj.params,
      from: this.state.connectedAccount,
    });
    console.log(result);

    return result;
  }
  async signature(message) {
    console.log(message);
    var from = this.state.connectedAccount;
    const msgParams = Web3Utils.utf8ToHex(message + "");
    var params = [msgParams, from];
    var method = "personal_sign";
    console.log(from, params, method);
    let result = await this.request({
      method: method,
      params: params,
    });
    return result;
  }
  async getCurrentChainId() {
    return await this.request({
      method: "net_version",
      params: [],
    });
  }
  async addNetwork(chainInfo) {
    if (!chainInfo) return;
    try {
      let chain = {
        chainId: chainInfo.chainId,
        chainName: chainInfo.chainName,
        nativeCurrency: chainInfo.nativeCurrency,
        rpcUrls: chainInfo.rpcUrls,
      };
      chainInfo.blockExplorerUrls && (chain.blockExplorerUrls = chainInfo.blockExplorerUrls);
      chainInfo.iconUrls && (chain.iconUrls = chainInfo.iconUrls);
      await this.request({
        method: "wallet_addEthereumChain",
        params: [chain],
      });
    } catch (addError) {
      console.log(addError);
    }
  }
  async switchNetwork(chainInfo) {
    if (!chainInfo) return;
    try {
      await this.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainInfo.chainId }],
      });
    } catch (switchError) {
      console.log(switchError);
      if (switchError.code === 4902) {
        await this.addNetwork(JSON.parse(JSON.stringify(chainInfo)));
      } else {
        console.log(switchError);
      }
    }
  }
  getChainById(chainId) {
    return getChainByChainId(parseInt(chainId));
  }
}

export default new Wallet();
