import DappConfig from "./network";

export const NODE_ENV = process.env.NODE_ENV || "development";

export const BASE_URL = "https://af.uniarts.network";

export const PREFIX = "/api/v1";

export const isProd = NODE_ENV === "production" ? true : true; //条件非真时 false：访问测试接口, true: 访问线上接口

// HTTP_API 默认配置
export const HTTP_DEFAULT_CONFIG = {
  prefix: PREFIX,
  // 开发环境下模拟生产环境，方便调试
  baseURL:
    NODE_ENV === "production" ? BASE_URL : isProd ? BASE_URL : "https://dapp.uniarts.network", // baseUrl
  isProd: isProd,
  debug: NODE_ENV !== "production",
};

export const CHAIN_DEFAULT_CONFIG = window.NODE_CONFIG || {};

export const DAPP_CONFIG = DappConfig;

// export const RPC_DEFAULT_CONFIG = rpcConfig;
