import { useEffect, useState } from "react";
// import { useMoralis, useMoralisWeb3Api } from "react-moralis";
// import { useMoralisDapp } from "../Providers/MoralisProvider/DappProvider";
import { useAccount, useToken } from "wagmi";

export const useERC20Balance = (params) => {
  const { address } = useAccount();
  // const { account } = useMoralisWeb3Api();
  // const { isInitialized } = useMoralis();
  // const { walletAddress, chainId } = useMoralisDapp();

  const [assets, setAssets] = useState();
  useEffect(
    () => {
      // if (isInitialized) {
      //   fetchERC20Balance().then((balance) => setAssets(balance));
      // }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      // isInitialized, chainId, walletAddress
    ]
  );

  const fetchERC20Balance = async () => {
    // return await account
    //   .getTokenBalances({
    //     address: walletAddress,
    //     chain: params?.chain || chainId,
    //   })
    //   .then((result) => result);
    return 0;
  };

  return { fetchERC20Balance, assets };
};
