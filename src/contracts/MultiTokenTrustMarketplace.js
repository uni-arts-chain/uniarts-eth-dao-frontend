import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import { DAPP_CONFIG } from "@/config";
import MultiTokenTrustMarketplaceABI from "@/contracts/abi/MultiTokenTrustMarketplace.json";
import store from "@/store";

class MultiTokenTrustMarketplace {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DAPP_CONFIG.contracts.MultiTokenTrustMarketplace;
    // 初始化合约
    this.contract = new this.web3.eth.Contract(
      MultiTokenTrustMarketplaceABI,
      this.address.toString()
    );
  }

  async createOrder(tokenName, nftAddress, id, amount, price, callback) {
    const endDate = Number((new Date().getTime() / 1000 + 60 * 60 * 24 * 7).toFixed(0));
    const tx = this.contract.methods.createOrder(tokenName, nftAddress, id, amount, price, endDate);
    const gasPrice = await this.gasPrice();
    const sender = store.state.user.info.address;
    const gasLimit = await tx.estimateGas({
      value: 0,
      from: sender,
      to: this.address,
    });
    return tx.send(
      {
        from: sender,
        gasPrice: gasPrice,
        gas: Math.round(gasLimit * 1.1),
      },
      callback
    );
  }

  async cancelOrder(nftAddress, orderId, callback) {
    const tx = this.contract.methods.cancelOrder(nftAddress, orderId);
    const gasPrice = await this.gasPrice();
    const sender = store.state.user.info.address;
    console.log(sender);
    console.log(nftAddress);
    console.log(orderId);
    const gasLimit = await tx.estimateGas({
      value: 0,
      from: sender,
      to: this.address,
    });
    return tx.send(
      {
        from: sender,
        gasPrice: gasPrice,
        gas: Math.round(gasLimit * 1.1),
      },
      callback
    );
  }

  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
}

export default new MultiTokenTrustMarketplace();
