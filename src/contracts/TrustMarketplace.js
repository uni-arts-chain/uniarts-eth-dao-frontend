import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import { DAPP_CONFIG } from "@/config";
import TrustMarketplaceABI from "@/contracts/abi/TrustMarketplace.json";
import store from "@/store";

class TrustMarketplace {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DAPP_CONFIG.contracts.TrustMarketplace;
    // 初始化合约
    this.contract = new this.web3.eth.Contract(TrustMarketplaceABI, this.address.toString());
  }
  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
  // buyNow
  async safePlaceBid(nftAddress, assetId, priceInWei, expiresAt, callback) {
    const sender = store.state.user.info.address;
    const gasPrice = await this.gasPrice();
    console.info({ nftAddress, assetId, priceInWei, expiresAt });
    console.log({ nftAddress, assetId, priceInWei, expiresAt });
    console.info(priceInWei.toString());
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
}
export default new TrustMarketplace();
