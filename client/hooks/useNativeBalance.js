import { getNativeByChain } from "../utils/networkConfig";
import { useEffect, useState } from "react";
import { useBalance, useAccount, useToken } from "wagmi";

export const useNativeBalance = (options) => {
  const chainId = "0x4";

  const { address } = useAccount();
  const {
    data,
    isError: error,
    isLoading,
  } = useBalance({
    chain: chainId,
    addressOrName: address,
    formatUnits: "gwei",
  });
  const { data: tokenData } = useToken({ address });

  // const { account } = useMoralisWeb3Api();
  // const { Moralis } = useMoralis();
  // const { chainId, walletAddress } = useMoralisDapp();
  const [balance, setBalance] = useState({ inWei: 0, formatted: 0 });
  // const nativeName = useMemo(
  //   () => getNativeByChain(options?.chain || chainId),
  //   [options, chainId]
  // );

  // const {
  //   fetch: getBalance,
  //   data,
  //   error,
  //   isLoading,
  // } = useMoralisWeb3ApiCall(account.getNativeBalance, {
  //   chain: chainId,
  //   address: walletAddress,
  //   ...options,
  // });

  useEffect(() => {
    if (data?.balance) {
      const balances = {
        inWei: data.balance,
        // missing second argument (decimals) in FromWei function,
        formatted: data.balance,
      };
      setBalance(balances);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    getBalance: () => {},
    balance,
    nativeName: tokenData?.name,
    error,
    isLoading,
  };
};
