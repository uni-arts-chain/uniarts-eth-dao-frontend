import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import DappConfig from "@/config/dapp";
import PinABI from "@/contracts/abi/Pin.json";

class Pin {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DappConfig.config?.contracts?.Pin;
    this.contract = new this.web3.eth.Contract(PinABI, this.address?.toString());
  }

  init() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DappConfig.config?.contracts?.Collection;
    this.contract = new this.web3.eth.Contract(PinABI, this.address?.toString());
  }

  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
  async pin(nftAddress, nftId, callback) {
    const sender = Wallet.connectedAccount;
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

export default new Pin();
