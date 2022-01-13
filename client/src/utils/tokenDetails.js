import { getErc20Contract } from "../config/constants/contractHelpers";

/**
 *
 * @param {string} add  - address of the token
 * @returns {object} - name, symbol, decimals, address
 *
 */

const tokenDetails = async (add) => {
  const contract = await getErc20Contract(add);

  const symbol = contract && (await contract.symbol());
  const name = contract && (await contract.name());
  const decimals = contract && (await contract.decimals());

  return {
    name,
    symbol,
    decimals,
    address:add,
  };
};

export default tokenDetails;
