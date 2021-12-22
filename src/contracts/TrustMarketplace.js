import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import DappConfig from "@/config/dapp";
import TrustMarketplaceABI from "@/contracts/abi/TrustMarketplace.json";

class TrustMarketplace {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DappConfig.config?.contracts?.TrustMarketplace;
    // 初始化合约
    this.contract = new this.web3.eth.Contract(TrustMarketplaceABI, this.address?.toString());
  }

  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }

  //查询订单是否存在
  orderByAssetId(nftAddress, assetId) {
    return this.contract.methods.orderByAssetId(nftAddress, assetId).call();
  }

  // 取消我的挂单
  async cancelOrder(nftAddress, assetId, callback) {
    const sender = this.web3.selectAddres;
    const gasPrice = await this.gasPrice();
    const tx = this.contract.methods.cancelOrder(nftAddress, assetId);
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

  // buyNow
  async safePlaceBid(nftAddress, assetId, priceInWei, expiresAt, callback) {
    const sender = this.web3.selectAddres;
    const gasPrice = await this.gasPrice();
    const tx = this.contract.methods.safePlaceBid(nftAddress, assetId, priceInWei, expiresAt);
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

  async createOrder(nftAddress, assetId, priceInWei, expiresAt, callback) {
    const sender = this.web3.selectAddres;
    const gasPrice = await this.gasPrice();
    const tx = this.contract.methods.createOrder(nftAddress, assetId, priceInWei, expiresAt);
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
}

export default new TrustMarketplace();
