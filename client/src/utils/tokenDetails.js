import { getErc20Contract } from "../config/constants/contractHelpers";

/**
 *
 * @param {string} add  - address of the token
 * @returns {object} - name, symbol, decimals, address
 *
 */

const tokenDetails = async (add) => {
  if (localStorage[`safekeep@${add}`]) {
    let info = JSON.parse(localStorage[`safekeep@${add}`]);
    return await info;
  }
  const contract = await getErc20Contract(add);
  const symbol = contract && (await contract.symbol());
  const name = contract && (await contract.name());
  const decimals = contract && (await contract.decimals());
  let result = {
    name,
    symbol,
    decimals,
    address: add,
  };

  localStorage.setItem(`safekeep@${add}`, JSON.stringify(result));

  return result;
};

export default tokenDetails;
