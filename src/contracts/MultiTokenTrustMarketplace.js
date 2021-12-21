import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import { DAPP_CONFIG } from "@/config";
import MultiTokenTrustMarketplaceABI from "@/contracts/abi/MultiTokenTrustMarketplace.json";
import store from "@/store";
import { FormatRpcError } from "@/utils";

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

  async sendTransaction(tx, sender, callback) {
    try {
      var gasPrice = await this.gasPrice();
      var gasLimit = await tx.estimateGas({
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
    } catch (err) {
      let result = FormatRpcError(err);
      throw result
        ? {
            data: (result.message && result) || result?.data || result?.originalError,
          }
        : err;
    }
  }

  async createOrder(tokenName, nftAddress, id, amount, price, callback) {
    const endDate = Number((new Date().getTime() / 1000 + 60 * 60 * 24 * 7).toFixed(0));
    const tx = this.contract.methods.createOrder(tokenName, nftAddress, id, amount, price, endDate);
    const sender = store.state.user.info.address;
    return this.sendTransaction(tx, sender, callback);
  }

  async cancelOrder(nftAddress, orderId, callback) {
    const tx = this.contract.methods.cancelOrder(nftAddress, orderId);
    const sender = store.state.user.info.address;
    return this.sendTransaction(tx, sender, callback);
  }

  async safePlaceBid(orderId, nftAddress, assetId, assetAmount, priceInWei, expiresAt, callback) {
    const tx = this.contract.methods.safePlaceBid(
      orderId,
      nftAddress,
      assetId,
      assetAmount,
      priceInWei,
      expiresAt
    );
    const sender = store.state.user.info.address;
    return this.sendTransaction(tx, sender, callback);
  }

  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
}

export default new MultiTokenTrustMarketplace();
