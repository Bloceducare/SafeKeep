import { useEffect, useState } from "react";
// import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const useTokenPrice = (options = {}) => {
  // const { token } = useMoralisWeb3Api();
  // const { isInitialized } = useMoralis();
  const [tokenPrice, setTokenPrice] = useState();

  useEffect(() => {
    // if (!isInitialized) return null;

    return fetchTokenPrice(options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTokenPrice = async (options) => {
    const { chainId, token_address } = options;
    // return await token
    //   .getTokenPrice({ chain: chainId, address: token_address })
    //   .then((result) => setTokenPrice(result?.usdPrice))
    //   .catch((e) => {});
    return setTokenPrice(0);
  };

  return { fetchTokenPrice, tokenPrice };
};

export default useTokenPrice;
