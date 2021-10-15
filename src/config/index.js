import DappConfig from "./network";

export const NODE_ENV = process.env.NODE_ENV || "development";

export const BASE_URL = "https://af.uniarts.network";

export const PREFIX = "/api/v1";

// HTTP_API 默认配置
export const HTTP_DEFAULT_CONFIG = {
  prefix: PREFIX,
  baseURL: NODE_ENV === "production" ? BASE_URL : "https://dapp.uniarts.network", // baseUrl
  isProd: NODE_ENV === "production", // false：访问测试接口  true: 访问线上接口
  debug: NODE_ENV === "production",
};

export const CHAIN_DEFAULT_CONFIG = window.NODE_CONFIG || {};

export const DAPP_CONFIG = DappConfig;

// export const RPC_DEFAULT_CONFIG = rpcConfig;
