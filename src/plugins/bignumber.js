import { BigNumber as bignumber } from "bignumber.js";

bignumber.config({ EXPONENTIAL_AT: 9 });

export const BigNumber = bignumber;
