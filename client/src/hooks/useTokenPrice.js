import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import {c2, tokenValueTxt} from '../utils/formatter'

const useTokenPrice = (options) => {
  const { token } = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();
  const [tokenPrice, setTokenPrice] = useState();

//   useEffect(() => setChainId(web3.givenProvider?.chainId));
//   useMemo(() => setWalletAddress(web3.givenProvider?.selectedAddress || user?.get("ethAddress")), [web3, user]);

  useEffect(() => {
    if (isInitialized)
      fetchTokenPrice(options)
        .then((price) => {
          // usdPrice is a number, format() returns a string
          price.usdPrice = c2.format(price.usdPrice);
         
          const { value, decimals, symbol } = price.nativePrice;
          // nativePrice is an Object
          // {value: string, decimals: number, name: string, symbol: string},
          // tokenValueTxt returns a string
          price.nativePrice = tokenValueTxt(value, decimals, symbol);
          setTokenPrice(price);
        })
        .catch((e) => alert(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  const fetchTokenPrice = async (options) => {
    const { chain, address } = options;
    return await token
      .getTokenPrice({ chain:'eth', address:'0xbcaAB35233Ec7305D83C0A5b25d4d20C60B38Fb4' })
      .then((result) => console.log('result', result))
      .catch((e) => alert(e.message));
  };
  return { fetchTokenPrice, tokenPrice };
};

export default useTokenPrice;