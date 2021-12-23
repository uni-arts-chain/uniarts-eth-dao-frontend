import Web3 from "web3";
import { BigNumber } from "@/plugins/bignumber";
import { toBN } from "web3-utils";
import Wallet from "@/plugins/wallet";
import DappConfig from "@/config/dapp";
import VoteMiningABIV1 from "@/contracts/abi/VoteMiningV1";
import { FormatRpcError } from "@/utils";
// import store from "@/store";

class VoteMining {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DappConfig.config?.contracts?.VoteMiningV1;
    this.contract = new this.web3.eth.Contract(VoteMiningABIV1, this.address?.toString());
    this.defaultGasPrice = 20000000000;
  }
  init() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DappConfig.config?.contracts?.VoteMiningV1;
    this.contract = new this.web3.eth.Contract(VoteMiningABIV1, this.address?.toString());
  }
  async gasPrice() {
    return await this.web3.eth.getGasPrice();
  }
  async sendTransaction(tx, sender, callback) {
    try {
      var gasPrice = await this.gasPrice();
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
    } catch (err) {
      let result = FormatRpcError(err);
      throw result
        ? {
            data: (result.message && result) || result?.data || result?.originalError,
          }
        : err;
    }
  }
  async stake(sender, nftAddr, nftId, token, amount, callback) {
    var tx = this.contract.methods.stake(nftAddr, nftId, token, toBN(amount));
    return this.sendTransaction(tx, sender, callback);
  }
  async voteBonded(sender, nftAddr, nftId, amount, callback) {
    var tx = this.contract.methods.voteBonded(nftAddr, nftId, toBN(amount));
    return this.sendTransaction(tx, sender, callback);
  }
  async unstake(sender, nftAddr, nftId, token, amount, callback) {
    var tx = this.contract.methods.unstake(nftAddr, nftId, token, toBN(amount));
    return this.sendTransaction(tx, sender, callback);
  }
  async unvoteBonded(sender, nftAddr, nftId, amount, callback) {
    var tx = this.contract.methods.unvoteBonded(nftAddr, nftId, toBN(amount));
    return this.sendTransaction(tx, sender, callback);
  }
  async unbond(sender, amount, callback) {
    var tx = this.contract.methods.unbond(toBN(amount));
    return this.sendTransaction(tx, sender, callback);
  }
  async redeemUnbonding(sender, index, callback) {
    var tx = this.contract.methods.redeemUnbonding(index);
    return this.sendTransaction(tx, sender, callback);
  }
  async getGroupId(nftId) {
    const uid = await this.getUID(nftId);
    const groupId = await this.contract.methods.nftGroup(uid).call();
    console.log("groupId: ", groupId);
    return groupId;
  }
  async getGroupStartTime(nftId) {
    const groupId = await this.getGroupId(nftId);
    const startTime = await this.contract.methods.groups(groupId).call();
    return startTime;
  }
  async getGroupHasFinished(nftId) {
    const groupId = await this.getGroupId(nftId);
    const hasFinished = await this.contract.methods.hasFinished(groupId).call();
    return hasFinished;
  }
  async getUID(nftId) {
    const nftInternalId = await this.contract.methods
      .nfts(DappConfig.config.nfts.UniartsNFT.address, nftId)
      .call();
    return nftInternalId;
  }
  async getBalances(userAddress, tokenAddress, nftId) {
    const nftInternalId = await this.contract.methods
      .nfts(DappConfig.config.nfts.UniartsNFT.address, nftId)
      .call();
    const balances = await this.contract.methods
      .balances(userAddress, tokenAddress, nftInternalId)
      .call();
    console.log(balances);
    return balances;
  }
  async getVotedBalances(userAddress, nftId) {
    const nftInternalId = await this.contract.methods
      .nfts(DappConfig.config.nfts.UniartsNFT.address, nftId)
      .call();
    const balances = await this.contract.methods.votedBalances(userAddress, nftInternalId).call();
    console.log(balances);
    return balances;
  }
  async getBondedBalance(userAddress) {
    let balances = await this.contract.methods.getBondedBalance(userAddress).call();
    return new BigNumber(balances);
  }
  async getUnbondedBalance(userAddress) {
    let balances = await this.contract.methods.unbondedBalances(userAddress).call();
    return new BigNumber(balances);
  }
  async getTotalVotedBalances(userAddress) {
    let totalVotedBalances = await this.contract.methods.totalVotedBalances(userAddress).call();
    console.log(totalVotedBalances);
    return totalVotedBalances;
  }
  async getNftVotes(nftId) {
    const nftInternalId = await this.contract.methods
      .nfts(DappConfig.config.nfts.UniartsNFT.address, nftId)
      .call();
    let nftVotes = await this.contract.methods.nftVotes(nftInternalId).call();
    return nftVotes;
  }
  async getGroupVotes(nftId) {
    const nftInternalId = await this.contract.methods
      .nfts(DappConfig.config.nfts.UniartsNFT.address, nftId)
      .call();
    const groupId = await this.contract.methods.nftGroup(nftInternalId).call();
    let groupVotes = await this.contract.methods.groupVotes(groupId).call();
    return groupVotes;
  }
  async getAvailableBalance(user, tokenAddress, nftAddress, nftId) {
    let availableBalance = await this.contract.methods
      .getAvailableBalance(user, tokenAddress, nftAddress, nftId)
      .call();
    return availableBalance;
  }
  async getUnvotableBalance(user, nftAddress, nftId) {
    let availableBalance = await this.contract.methods
      .getUnvotableBalance(user, nftAddress, nftId)
      .call();
    return availableBalance;
  }

  async collectFromLock(lockId, callback) {
    const tx = this.contract.methods.collectFromLock(lockId);
    const sender = Wallet.connectedAccount;
    return this.sendTransaction(tx, sender, callback);
  }

  async getMintRewards(nftAddress, nftId) {
    const mintRewards = await this.contract.methods.getMintRewards(nftAddress, nftId).call();
    return mintRewards;
  }

  async getRedeemableBalance(userAddress, tokenAddress) {
    const redeemableBalance = await this.contract.methods
      .getRedeemableBalance(userAddress, tokenAddress)
      .call();
    return redeemableBalance;
  }
}

export default new VoteMining();
