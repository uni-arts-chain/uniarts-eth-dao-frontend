import { BigNumber as bignumber } from "bignumber.js";

bignumber.config({ EXPONENTIAL_AT: [-100, 100] });

export const BigNumber = bignumber;
