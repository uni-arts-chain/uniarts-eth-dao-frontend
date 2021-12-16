import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import ABI from "@/contracts/abi/IErc1155.json";
import store from "@/store";

export default class IErc1155 {
  constructor(address) {
    this.web3 = new Web3(Wallet.provider);
    this.address = address;
    this.contract = new this.web3.eth.Contract(ABI, address);
  }

  /**
   * @param operator address
   * @param callback function
   */
  async setApprovalForAll(operator, callback) {
    const sender = store.state.user.info.address;
    const gasPrice = await this.gasPrice();
    const tx = this.contract.methods.setApprovalForAll(operator, true);
    const gasLimit = await tx.estimateGas({
      value: 0,
      from: sender,
      to: this.address,
    });
    return tx.send({ from: sender, gasPrice: gasPrice, gas: Math.round(gasLimit * 1.1) }, callback);
  }

  /**
   * @param account address
   * @param operator address
   */
  async isApprovedForAll(operator) {
    const account = store.state.user.info.address;
    return await this.contract.methods.isApprovedForAll(account, operator).call();
  }

  async safeTransferFrom(to, id, amount, callback) {
    const sender = store.state.user.info.address;
    const gasPrice = await this.gasPrice();
    const tx = this.contract.methods.safeTransferFrom(sender, to, id, amount, []);
    const gasLimit = await tx.estimateGas({
      value: 0,
      from: sender,
      to: this.address,
    });
    return tx.send({ from: sender, gasPrice: gasPrice, gas: Math.round(gasLimit * 1.1) }, callback);
  }

  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
}
