import Web3 from "web3";
import { BigNumber } from "@/plugins/bignumber";
import { toBN } from "web3-utils";
import Wallet from "@/plugins/wallet";
import { DAPP_CONFIG } from "@/config";
import VoteMiningABI from "@/contracts/abi/VoteMining";
// import store from "@/store";

class VoteMining {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DAPP_CONFIG.contracts.VoteMining;
    this.contract = new this.web3.eth.Contract(VoteMiningABI, this.address.toString());
    this.defaultGasPrice = 20000000000;
  }
  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
  async stake(sender, nftAddr, nftId, token, amount, callback) {
    var gasPrice = await this.gasPrice();
    var tx = this.contract.methods.stake(nftAddr, nftId, token, toBN(amount));

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
  async voteBonded(sender, nftAddr, nftId, amount, callback) {
    var gasPrice = await this.gasPrice();
    var tx = this.contract.methods.voteBonded(nftAddr, nftId, toBN(amount));

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
  async getBalances(userAddress, tokenAddress, nftId) {
    const nftInternalId = await this.contract.methods
      .nfts(DAPP_CONFIG.nfts.UniartsNFT.address, nftId)
      .call();
    const balances = await this.contract.methods
      .balances(userAddress, tokenAddress, nftInternalId)
      .call();
    console.log(balances);
    return balances;
  }
  async getVotedBalances(userAddress, nftId) {
    const nftInternalId = await this.contract.methods
      .nfts(DAPP_CONFIG.nfts.UniartsNFT.address, nftId)
      .call();
    const balances = await this.contract.methods.votedBalances(userAddress, nftInternalId).call();
    console.log(balances);
    return balances;
  }
  async getBondedBalance(userAddress) {
    let balances = await this.contract.methods.getBondedBalance(userAddress).call();
    return new BigNumber(balances);
  }
  async getTotalVotedBalances(userAddress) {
    let totalVotedBalances = await this.contract.methods.totalVotedBalances(userAddress).call();
    console.log(totalVotedBalances);
    return totalVotedBalances;
  }
  async getNftVotes(nftId) {
    const nftInternalId = await this.contract.methods
      .nfts(DAPP_CONFIG.nfts.UniartsNFT.address, nftId)
      .call();
    let nftVotes = await this.contract.methods.nftVotes(nftInternalId).call();
    return nftVotes;
  }
  async getGroupVotes(nftId) {
    const nftInternalId = await this.contract.methods
      .nfts(DAPP_CONFIG.nfts.UniartsNFT.address, nftId)
      .call();
    const groupId = await this.contract.methods.nftGroup(nftInternalId).call();
    let groupVotes = await this.contract.methods.groupVotes(groupId).call();
    return groupVotes;
  }
}

export default new VoteMining();
