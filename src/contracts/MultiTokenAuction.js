import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import MultiTokenAuctionABI from "@/contracts/abi/MultiTokenAuction.json";
import store from "@/store";

class MultiTokenAuction {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    // this.address = DAPP_CONFIG.contracts.Auction;
    // this.contract = new this.web3.eth.Contract(AuctionABI, this.address.toString());
  }

  async creatAuction(
    addressV2,
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
    const contractAddress = addressV2;
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
}

export default new MultiTokenAuction();
