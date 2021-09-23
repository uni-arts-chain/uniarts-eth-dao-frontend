import Web3 from "web3";
import BigNumber from "@/plugins/bignumber";
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
  async queryLockPosition() {
    const contract = this.contract.methods.locks(store.state.user.info.address, "0");
    const response = await contract.call();
    // 确定精度
    const amount = new BigNumber(response.amount)
      .shiftedBy(DAPP_CONFIG.tokens.UART.decimals)
      .toString();
    return amount;
  }
}

export default new TokenLocker();
