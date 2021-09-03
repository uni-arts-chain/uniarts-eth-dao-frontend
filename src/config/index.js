export const NODE_ENV = process.env.NODE_ENV || "development";

// HTTP_API 默认配置
export const HTTP_DEFAULT_CONFIG = {
  baseURL: "/api/v1", // baseUrl
  isProd: NODE_ENV === "production" ? true : true, // false：访问测试接口  true: 访问线上接口
  debug: NODE_ENV === "production" ? false : false,
};

export const CHAIN_DEFAULT_CONFIG = window.NODE_CONFIG || {};

// export const RPC_DEFAULT_CONFIG = rpcConfig;
