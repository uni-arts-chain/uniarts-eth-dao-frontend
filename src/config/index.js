export const NODE_ENV = process.env.NODE_ENV || "development";

// 开发环境下模拟生产环境，方便调试
export const isProd = NODE_ENV === "production" ? true : true; //条件非真时 false：访问测试接口, true: 访问线上接口

export const BASE_URL = isProd ? "https://af.uniarts.network" : "https://dapp.uniarts.network";

export const PREFIX = "/api/v1";

// HTTP_API 默认配置
export const HTTP_DEFAULT_CONFIG = {
  prefix: PREFIX,
  baseURL: BASE_URL,
  isProd: isProd,
  debug: NODE_ENV !== "production",
};

export const CHAIN_DEFAULT_CONFIG = window.NODE_CONFIG || {};

export const DAPP_CONFIG = require(`./network/${isProd ? "production" : "development"}`);
