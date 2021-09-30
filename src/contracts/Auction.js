import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import { DAPP_CONFIG } from "@/config";
import AuctionABI from "@/contracts/abi/Auction.json";
import EthDater from "ethereum-block-by-date";
import { toBN } from "web3-utils";
import store from "@/store";

class Auction {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DAPP_CONFIG.contracts.Auction;
    this.contract = new this.web3.eth.Contract(AuctionABI, this.address.toString());
    this.dater = new EthDater(this.web3);
  }

  async playerBid(matchId, tokenIndex, amount, callback) {
    const sender = store.state.user.info.address;
    const gasPrice = await this.gasPrice();
    const tx = this.contract.methods.player_bid(matchId, tokenIndex, toBN(amount));
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

  async playerFixedPrice(matchId, tokenIndex, callback) {
    const gasPrice = await this.gasPrice();
    const tx = this.contract.methods.player_fixed_price(matchId, tokenIndex);
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

  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
}

export default new Auction();
