"use strict";
module.exports = {
  contracts: {
    TokenLocker: "0x59eD992BC4403FAF2a83C0D9E2213DF4d8d8Eb86",
    VoteMining: "0xD57D74eb869B0752Cda8835a55Bb0cB88BB99328",
    VoteMiningV1: "0xda8A09C7734510120871CD8bBd9031a814750598",
    Auction: "0x3415d9823EE52A8C21cd77C138c3774B44C9196D",
    TrustMarketplace: "0x061236A338FDE12f5c0d4dce33B27A4D9fD8E604",
    Pin: "0x2465BF5D1B2AEf9908A3F7EDb01F14740186EeD5",
    MultiTokenTrustMarketplace: "0x4a7Eb7C858512C5F622fF08FF9348bc4E5af7Ad0",
  },
  nfts: {
    UniartsNFT: {
      address: "0x5F48872D2F81d555c287F1dc2379B6E5fe1346C8",
      symbol: "UANFT",
    },
  },
  voteTokens: {
    UART: {
      symbol: "UART",
      decimals: 12,
      address: "0xf51D9714b74644a224E7f62E56D4A87e1f1fb2E0",
    },
    USDT: {
      symbol: "USDT",
      decimals: 18,
      address: "0xFd9CA9e22bd54260B87834966d26055620aFdbFf",
    },
  },
  souvenirListTokens: {
    WETH: {
      symbol: "wETH",
      decimals: 18,
      address: "0xcA50286362Da797303cC81276EB7D4fD536fA7cD",
    },
  },
  tokens: {
    UART: {
      symbol: "UART",
      decimals: 12,
      address: "0xf51D9714b74644a224E7f62E56D4A87e1f1fb2E0",
    },
    USDT: {
      symbol: "USDT",
      decimals: 18,
      address: "0xFd9CA9e22bd54260B87834966d26055620aFdbFf",
    },
    WETH: {
      symbol: "wETH",
      decimals: 18,
      address: "0xcA50286362Da797303cC81276EB7D4fD536fA7cD",
    },
  },
  network: {
    chainId: "0x" + new Number(4).toString(16),
    chainName: "Rinkeby",
    headerChainName: "rinkeby",
    rpcUrls: ["https://dapp.uniarts.network/api/v1/rpc"],
    nativeCurrency: {
      name: "Rinkeby Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://rinkeby.etherscan.io"],
    iconUrls: [],
  },
  api: {
    prefix: "/api/v1",
    baseURL: "https://dapp.uniarts.network",
    debug: process.env.NODE_ENV !== "production",
  },
};
