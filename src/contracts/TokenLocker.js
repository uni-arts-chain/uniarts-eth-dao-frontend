import Web3 from "web3";
import { BigNumber } from "@/plugins/bignumber";
import Wallet from "@/plugins/wallet";
import { DAPP_CONFIG } from "@/config";
import TokenLockerABI from "@/contracts/abi/TokenLocker";
import store from "@/store";

class TokenLocker {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DAPP_CONFIG.contracts.TokenLocker;
    // 初始化合约
    this.contract = new this.web3.eth.Contract(TokenLockerABI, this.address.toString());
  }

  // 查询锁仓
  async queryLockPosition(i) {
    const contract = this.contract.methods.locks(store.state.user.info.address, i.toString());
    const response = await contract.call();
    // 确定精度
    return new BigNumber(response.amount).shiftedBy(-DAPP_CONFIG.tokens.UART.decimals).toString();
  }
  // 空投次数
  queryLockNum() {
    return this.contract.methods.numLocks(store.state.user.info.address).call();
  }
}

export default new TokenLocker();
