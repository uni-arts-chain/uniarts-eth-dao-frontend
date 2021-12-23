import Web3 from "web3";
import { BigNumber } from "@/plugins/bignumber";
import Wallet from "@/plugins/wallet";
import DappConfig from "@/config/dapp";
import TokenLockerABI from "@/contracts/abi/TokenLocker";

class TokenLocker {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DappConfig.config?.contracts?.TokenLocker;
    // 初始化合约
    this.contract = new this.web3.eth.Contract(TokenLockerABI, this.address?.toString());
  }

  init() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DappConfig.config?.contracts?.TokenLocker;
    // 初始化合约
    this.contract = new this.web3.eth.Contract(TokenLockerABI, this.address?.toString());
  }

  // 查询锁仓
  async queryLockPosition(i) {
    const contract = this.contract.methods.locks(Wallet.connectedAccount, i.toString());
    const response = await contract.call();
    // 确定精度
    response.amount = BigNumber(response.amount)
      .shiftedBy(-DappConfig.config.tokens.UART.decimals)
      .toString();
    return response;
  }
  // 空投次数
  queryLockNum() {
    return this.contract.methods.numLocks(Wallet.connectedAccount).call();
  }
}

export default new TokenLocker();
