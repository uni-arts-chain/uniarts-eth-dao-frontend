import Web3 from "web3";
import Wallet from "@/plugins/wallet";
import { DAPP_CONFIG } from "@/config";
import CollectionABI from "@/contracts/abi/Collection.json";

class Collection {
  constructor() {
    this.web3 = new Web3(Wallet.provider);
    this.address = DAPP_CONFIG.contracts.Auction;
    this.contract = new this.web3.eth.Contract(CollectionABI, this.address.toString());
  }
}

export default new Collection();
