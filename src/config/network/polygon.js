"use strict";
module.exports = {
  contracts: {
    TokenLocker: "0x507BDe03A87a6aA134d16634545E3D79c11c137D",
    VoteMiningV1: "0x9F98B18d56Af67409c36C4c23D349ea3B5035c05",
    VoteMiningV2: "0x4FA3DECEFcd83EdAe0828FdE49221C448961016b",
    VoteMining: "0xf1D90c9413B60c8B637C968d978BD229F0BaEDaD",
    Auction: "0xCE7c240079CC64bA531612dADfD086841427855C",
    TrustMarketplace: "0xCe37caCC1c616c6736Da974116b37102C3431f21",
    Pin: "0xb4873626519754185FF5a8A368D442230645e524",
    MultiTokenTrustMarketplace: "0x53d5881C315e416DDcEEF2c7c516B287a4821053",
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
  },
  souvenirListTokens: {
    USDC: {
      symbol: "USDC",
      decimals: 6,
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    },
  },
  tokens: {
    UART: {
      symbol: "UART",
      decimals: 12,
      address: "0xf244E91A46A9cdd48da295cA5d0B27894f8032B1",
    },
    USDT: {
      symbol: "USDT",
      decimals: 6,
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    },
    USDC: {
      symbol: "USDC",
      decimals: 6,
      address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
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
