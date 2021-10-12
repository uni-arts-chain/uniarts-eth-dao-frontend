import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import { DAPP_CONFIG } from "@/config";
import CollectionABI from "@/contracts/abi/Collection.json";
import store from "@/store";

class Collection {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DAPP_CONFIG.contracts.Collection;
    this.contract = new this.web3.eth.Contract(CollectionABI, this.address.toString());
  }
  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
  async pin(nftAddress, nftId, callback) {
    const sender = store.state.user.info.address;
    const gasPrice = await this.gasPrice();
    console.log({ nftAddress, nftId, address: this.address, sender });
    const tx = this.contract.methods.pin(nftAddress, nftId);
    console.log(tx);
    const gasLimit = await tx.estimateGas({
      value: 0,
      from: sender,
      to: this.address,
    });
    console.log({
      from: sender,
      gasPrice: gasPrice,
      gas: Math.round(gasLimit * 1.1),
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

export default new Collection();
