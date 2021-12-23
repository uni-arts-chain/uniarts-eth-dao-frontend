/* eslint-disable no-unused-vars */
import Web3 from "web3";
import { BigNumber } from "@/plugins/bignumber";
import ABI from "@/contracts/abi/Erc721.json";
import Wallet from "@/plugins/wallet";

export class Erc721 {
  constructor(address, symbol) {
    this.web3 = new Web3(Wallet.provider);
    this.address = address;
    this.contract = new this.web3.eth.Contract(ABI, address);
    this.defaultGasPrice = 20000000000;
    this.symbol = symbol;
  }

  async balanceOf(user) {
    let balance = await this.contract.methods.balanceOf(user).call();
    return new BigNumber(balance);
  }

  async tokenByIndex(spender, index) {
    let id = await this.contract.methods.tokenOfOwnerByIndex(spender, index).call();
    return id;
  }

  async getApproved(tokenId) {
    let address = await this.contract.methods.getApproved(tokenId).call();
    return address;
  }

  async sendNft(address, tokenId, callback) {
    const sender = Wallet.connectedAccount;
    const gasPrice = await this.gasPrice();
    //第一个地址是自己钱包地址，第二个地址是用户填写的地址
    const tx = this.contract.methods.safeTransferFrom(sender, address, tokenId);
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

  async approve(sender, address, tokenId, callback) {
    var gasPrice = await this.gasPrice();
    var tx = this.contract.methods.approve(address, tokenId);
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
  }

  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
}

export default Erc721;
