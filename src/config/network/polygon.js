"use strict";
module.exports = {
  contracts: {
    TokenLocker: "0x507BDe03A87a6aA134d16634545E3D79c11c137D",
    VoteMiningV1: "0x9F98B18d56Af67409c36C4c23D349ea3B5035c05",
    VoteMining: "0x4FA3DECEFcd83EdAe0828FdE49221C448961016b",
    Auction: "0xCE7c240079CC64bA531612dADfD086841427855C",
    TrustMarketplace: "0xCe37caCC1c616c6736Da974116b37102C3431f21",
    Collection: "0xb4873626519754185FF5a8A368D442230645e524",
  },
  nfts: {
    UniartsNFT: {
      address: "0x2A14626662DC305d048156F33D414DA046148081",
      symbol: "UANFT",
    },
  },
  voteTokens: {
    UART: {
      symbol: "UART",
      decimals: 12,
      address: "0xf244E91A46A9cdd48da295cA5d0B27894f8032B1",
    },
    WETH: {
      symbol: "wETH",
      decimals: 18,
      address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    },
    // USDT: {
    //   symbol: "USDT",
    //   decimals: 6,
    //   address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    // },
  },
  tokens: {
    UART: {
      symbol: "UART",
      decimals: 12,
      address: "0x3c2915050347dCb122Aa5F7A148a5eED29Cccfa8",
    },
    USDT: {
      symbol: "USDT",
      decimals: 6,
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    },
    WETH: {
      symbol: "wETH",
      decimals: 18,
      address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    },
  },
  network: {
    chainId: "0x" + new Number(137).toString(16), // A 0x-prefixed hexadecimal string
    chainName: "Polygon",
    headerChainName: "ploygon",
    nativeCurrency: {
      name: "Matic Token",
      symbol: "MATIC", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc-mainnet.matic.network",
      "https://matic-mainnet.chainstacklabs.com",
      "https://rpc-mainnet.maticvigil.com",
      "https://rpc-mainnet.matic.quiknode.pro",
      "https://matic-mainnet-full-rpc.bwarelabs.com",
    ],
    blockExplorerUrls: ["https://polygonscan.com"],
    iconUrls: ["https://polygon.technology/media-kit/matic-token-icon.png"],
  },
  api: {
    prefix: "/api/v1",
    baseURL: "https://af.uniarts.network",
    debug: process.env.NODE_ENV !== "production",
  },
};
