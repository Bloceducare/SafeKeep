import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import {c2, tokenValueTxt} from '../utils/formatter'
import { getWrappedNative } from "../utils/networkConfig";

const useTokenPrice = (options={}) => {
  const { token } = useMoralisWeb3Api();
  const {chain, address} ={}= options
  const { isInitialized } = useMoralis();
  const [tokenPrice, setTokenPrice] = useState();

  useEffect(() => {
    if ( !isInitialized) return null;
    if(!options.chain && !options?.address ) return null;
    if (isInitialized)
      fetchTokenPrice(options)
        .then((price) => {
          console.log('pricing in promise', price)
      
          // // usdPrice is a number, format() returns a string
          // price.usdPrice = c2.format(price.usdPrice);
         
          // const { value, decimals, symbol } = price.nativePrice;
          // // nativePrice is an Object
          // // {value: string, decimals: number, name: string, symbol: string},
          // // tokenValueTxt returns a string
          // price.nativePrice = tokenValueTxt(value, decimals, symbol);
          // setTokenPrice(price);
        })
        .catch((e) => alert(e.message, 'show face'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, chain, address, tokenPrice]);

  const fetchTokenPrice = async (options) => {
    const { chain, address } = options
    return await token
      .getTokenPrice({ chain:'bsc', address:'0x5344c20fd242545f31723689662ac12b9556fc3d' })
      // .then((result) => console.log('result', result))
      // .catch((e) => alert(e.message));
  };
  return { fetchTokenPrice, tokenPrice };
};

export default useTokenPrice;