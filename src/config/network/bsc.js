"use strict";
module.exports = {
  contracts: {
    TokenLocker: "0x8B5eEe4A93ed2929195257C16D1Ad4fb750f2d27",
    VoteMining: "0x7610844a9424f2Fcd9FdF84536CD126335137DE8",
    VoteMiningV1: "",
    Auction: "0x03028ca721E0fc26bD0279B3f2Be9473DdAa2806",
    TrustMarketplace: "0xdE55Bf6319fE45437D7E9978b316fA43f83fA7Db",
    MultiTokenTrustMarketplace: "0xA198d4814773C298266467D43dA1d12183E429Cc",
  },
  nfts: {
    UniartsNFT: {
      address: "0xB45Ab2c716f414C46c429fcCC9D85D34dB7d5b46",
      symbol: "UANFT",
    },
  },
  voteTokens: {
    UART: {
      symbol: "UART",
      decimals: 12,
      address: "0x5608D5159ab98881bc116ae7761c74Ad2eBb0448",
    },
    WETH: {
      symbol: "wETH",
      decimals: 18,
      address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    },
  },
  souvenirListTokens: {
    USDC: {
      symbol: "USDC",
      decimals: 18,
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    },
  },
  tokens: {
    UART: {
      symbol: "UART",
      decimals: 12,
      address: "0x5608D5159ab98881bc116ae7761c74Ad2eBb0448",
    },
    USDT: {
      symbol: "USDT",
      decimals: 18,
      address: "0x55d398326f99059fF775485246999027B3197955",
    },
    USDC: {
      symbol: "USDC",
      decimals: 18,
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    },
    WETH: {
      symbol: "wETH",
      decimals: 18,
      address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    },
  },
  network: {
    chainId: "0x" + new Number(56).toString(16),
    chainName: "Binance Smart Chain",
    headerChainName: "bsc",
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org",
    ],
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://bscscan.com"],
    iconUrls: [],
  },
  api: {
    prefix: "/api/v1",
    baseURL: "https://af.uniarts.network",
    debug: process.env.NODE_ENV !== "production",
  },
};
