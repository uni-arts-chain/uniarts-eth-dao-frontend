import { BigNumber } from "@/plugins/bignumber";
import Web3Utils from "web3-utils";
import { reactive } from "vue";
import store from "@/store";
import routerInstance from "@/router";
import { getChainByChainId } from "evm-chains";
class Wallet {
  constructor() {
    this.provider = window.ethereum || window.BinanceChain;
    this.state = reactive({
      connectedAccount: "",
      chainId: "",
      accountBalance: "",
      isConnected: false,
    });
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
    console.log(1);
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
  async setListener() {
    if (!this.provider) {
      throw {
        code: 100,
      };
    }
    if (this.provider.on) {
      this.provider.on("accountsChanged", (accounts) => {
        this.state.connectedAccount = accounts[0];
        if (store.state.user.info.token) {
          store.dispatch("user/Quit");
          routerInstance.push(
            "/login?back=" + location.pathname == "/" ? encodeURIComponent(location.pathname) : ""
          );
        }
      });
      this.provider.on("chainChanged", (chainId) => {
        this.state.chainId = parseInt(chainId);
        if (store.state.user.info.token) {
          store.dispatch("user/Quit");
          routerInstance.push(
            "/login?back=" + location.pathname == "/" ? encodeURIComponent(location.pathname) : ""
          );
        }
      });
    }
  }
  async connect() {
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
    console.log(obj);
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
    var params = [from, msgParams];
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
      await this.request({
        method: "wallet_addEthereumChain",
        params: [chainInfo],
      });
    } catch (addError) {
      console.loog(addError);
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
        this.addNetwork(chainInfo);
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
