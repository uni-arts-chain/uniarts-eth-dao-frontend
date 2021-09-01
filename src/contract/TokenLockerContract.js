import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import MetaMask from '@/contract/MetaMask';
import { TokenLocker, UART } from './config';
import TokenLockerJson from './contracts/TokenLocker.json';
import VueX from '@/store';

class TokenLockerContract {
  constructor() {
    this.web3 = new Web3(MetaMask.ethereum);
    this.address = TokenLocker;
    // 初始化合约
    this.contract = new this.web3.eth.Contract(TokenLockerJson.abi, this.address.toString());
  }

  // 查询锁仓
  async queryLockPosition() {
    const contract = this.contract.methods.locks(VueX.state.wallet.walletAddress, '0');
    const response = await contract.call();
    // 确定精度
    const amount = new BigNumber(response.amount).shiftedBy(UART.decimals)
      .toString();
    // 保存锁仓余额
    VueX.commit('wallet/setLockPositionAmount', amount);
    return amount;
  }
}

export default new TokenLockerContract();
