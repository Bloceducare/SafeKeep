import Moralis from "moralis/dist/moralis.min.js";
import { currrentChainId } from "./networkConfig";
/**
 *
 * @param {string} add  - address of the token
 * @returns {object} - name, symbol, decimals, address
 *
 */

const tokenDetails = async (add) => {
  let chain = `0x${Number(currrentChainId()).toString(16)}`;
  if (localStorage[`safekeep@${add}`]) {
    const info = JSON.parse(localStorage[`safekeep@${add}`]);
    return await info;
  }
  let dt = await Moralis.Web3API.token.getTokenMetadata({
    chain,
    addresses: add,
  });

  let result = {
    name: dt[0]?.name ?? null,
    symbol: dt[0]?.symbol ?? null,
    decimals: dt[0]?.decimals ?? null,
    address: add,
    logo: dt[0]?.logo ?? null,
    thumbnail: dt[0]?.thumbnail ?? null,
  };

  localStorage.setItem(`safekeep@${add}`, JSON.stringify(result));

  return result;
};

export default tokenDetails;
