// let env = "development";
// if (process.env.NODE_ENV == "production") {
//   env = "production";
// }

// const config = require(`./${env}`);

// export default config;

import poylogon from "./poylogon";
import bsc from "./bsc";
import rinkeby from "./rinkeby";

export default { poylogon, bsc, rinkeby };
