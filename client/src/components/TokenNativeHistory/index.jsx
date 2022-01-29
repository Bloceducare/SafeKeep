import { useSelector } from "react-redux";
import { useGetNativeHiistoryQuery } from "../../services/api";
import TokenSingleHistoryDetails from "../TokenSingleHistoryDetails";

const TokenNativeHistory = () => {
  const { data, isError, isLoading, isSuccess } = useGetNativeHiistoryQuery();
  const tokenHistory = data?.vaults[0]?.nativeHistory;
  const amount = data?.vaults[0]?.StartingAmount;
  const da = useSelector(state => state.vault.data.tokens)
  const nativePrice = da && da.find(i => i.isNative );
  const props = {
    isLoading,
    isError,
    isSuccess,
    name: "Eth",
    amount,
    tokenHistory,
    isNative: true,
    price:nativePrice?.price,
    decimals:nativePrice?.decimals
    
  };

  return (
    <>
      <TokenSingleHistoryDetails {...props} />
    </>
  );
};

export default TokenNativeHistory;
