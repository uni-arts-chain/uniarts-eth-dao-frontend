import detectEthereumProvider from '@metamask/detect-provider';
import { ElMessage } from 'element-plus';
import BigNumber from 'bignumber.js';
import VueX from '@/store';

class MetaMask {
  constructor() {
    this.ethereum = window.ethereum || window.BinanceChain;
    if (!this.ethereum) {
      ElMessage.warning('Please install MetaMask!');
    }
  }

  // 初始化钱包
  async initMetaMask() {
    // 校验钱包
    const ethereum = await detectEthereumProvider();
    if (!ethereum) {
      ElMessage.warning('Please install MetaMask!');
      throw new Error('Please install MetaMask!');
    }
    // 添加钱包事件处理
    ethereum.on('connect', (handler) => console.log(handler));
    ethereum.on('disconnect', (handler) => console.log(handler));
    ethereum.on('accountsChanged', (handler) => console.log(handler));
    ethereum.on('chainChanged', (_chainId) => {
      window.location.reload();
    });
    // 判断钱包是否连接正常 || 链选择正确
    if (!ethereum.isConnected() || ethereum.chainId !== '0x4') {
      ElMessage.warning('Please choose the correct chain');
      throw new Error('didn\'t Creat Connection');
    }
    this.ethereum = ethereum;
  }

  // 登录到钱包
  async connect() {
    try {
      const res = await this.ethereum.request({ method: 'eth_requestAccounts' });
      VueX.commit('wallet/setWalletAddress', res[0]);
    } catch (error) {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        ElMessage.warning('Please connect to MetaMask.');
      } else {
        ElMessage.error(error);
      }
    }
  }

  // 查询账户余额
  async checkBalances() {
    const success = await this.ethereum.request({
      method: 'eth_getBalance',
      params: [`${VueX.state.wallet.walletAddress}`, 'latest'],
    });
    const price = new BigNumber(success).shiftedBy(-18)
      .toString();
    VueX.commit('wallet/setWalletPrice', price);
    return price;
  }
}

export default new MetaMask();
