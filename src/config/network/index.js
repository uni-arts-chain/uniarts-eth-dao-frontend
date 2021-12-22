// let env = "development";
// if (process.env.NODE_ENV == "production") {
//   env = "production";
// }

// const config = require(`./${env}`);

// export default config;

import polygon from "./polygon";
import bsc from "./bsc";
import rinkeby from "./rinkeby";

export default { polygon, bsc, rinkeby };
