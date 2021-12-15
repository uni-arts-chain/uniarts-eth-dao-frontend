import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import MultiTokenAuctionABI from "@/contracts/abi/MultiTokenAuction.json";
import store from "@/store";

class MultiTokenAuction {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
  }

  async creatAuction(
    contractAddress,
    payTokenName,
    openBlock,
    expiryBlock,
    minIncrement,
    nftAddress,
    tokenId,
    amount,
    minBid,
    fixedPrice,
    callback
  ) {
    const contract = new this.web3.eth.Contract(MultiTokenAuctionABI, contractAddress);
    const matchId = `user-${new Date().getTime()}`;
    const expiryExtension = 30;
    const tx = contract.methods.createAuction(
      matchId,
      payTokenName,
      openBlock,
      expiryBlock,
      expiryExtension,
      minIncrement,
      [[nftAddress, tokenId, amount, minBid, fixedPrice]]
    );
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

  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
}

export default new MultiTokenAuction();
