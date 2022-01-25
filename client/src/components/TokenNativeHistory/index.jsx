import { useGetNativeHiistoryQuery } from "../../services/api";
import TokenSingleHistoryDetails from "../TokenSingleHistoryDetails";

const TokenNativeHistory = () => {
  const { data, isError, isLoading, isSuccess } = useGetNativeHiistoryQuery();
  const tokenHistory = data?.vaults[0]?.nativeHistory;
  const amount = data?.vaults[0]?.StartingAmount;
  const props = {
    isLoading,
    isError,
    isSuccess,
    name: "Eth",
    amount,
    tokenHistory,
  };
  return (
    <>
      <TokenSingleHistoryDetails {...props} />
    </>
  );
};

export default TokenNativeHistory;
