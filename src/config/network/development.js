"use strict";
module.exports = {
  contracts: {
    TokenLocker: "0x59eD992BC4403FAF2a83C0D9E2213DF4d8d8Eb86",
    VoteMining: "0x78913F198185EB22e1c4a2D42c721D370946d160",
    VoteMiningV1: "0xda8A09C7734510120871CD8bBd9031a814750598",
    Auction: "0x3415d9823EE52A8C21cd77C138c3774B44C9196D",
    TrustMarketplace: "0x2679ee88Aa803e37E723a569f0C71c8758f5834a",
    Collection: "0xb0F55f7468A6F781d09D0B84cfD14C34F5566A62",
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
  },
  networks: {
    rinkeby: {
      chainId: "0x" + new Number(4).toString(16),
      chainName: "Rinkeby",
      rpcUrls: ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
      nativeCurrency: {
        name: "Rinkeby Ether",
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://rinkeby.etherscan.io"],
      iconUrls: [],
    },
  },
};
