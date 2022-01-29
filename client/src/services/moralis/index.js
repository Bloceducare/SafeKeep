import Moralis from "moralis/dist/moralis.min.js";
import { currrentChainId } from "../../utils/networkConfig";

export const tokenPrice = async (args) => {
  const defaultOptions = {
    chain: currrentChainId(),
  };
  if (!args?.address) return;
  const combined = { ...defaultOptions, ...args };
  const result = await Moralis.Web3API.token.getTokenPrice(combined);
  return result;
};
