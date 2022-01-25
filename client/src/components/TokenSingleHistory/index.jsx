import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetTokenHistoryQuery } from "../../services/api";
import tokenDetails from "../../utils/tokenDetails";
import TokenSingleHistoryDetails from "../TokenSingleHistoryDetails";

const TokenHistory = () => {
  const { address } = useParams();
  const [name, setName] = useState("");
  const { data, isError, isLoading, isSuccess } =
    useGetTokenHistoryQuery(address);
  const tokenHistory = data?.vaults[0]?.tokens[0]?.history;
  const add = data?.vaults[0]?.tokens[0]?.id;
  const getName = async () => {
    const you = await (add && (await tokenDetails(add)));
    return setName(you?.symbol);
  };

  const getNameCallBack = useCallback(getName, [add]);

  useEffect(() => {
    getNameCallBack();
  }, [getNameCallBack]);

  const amount = data?.vaults[0]?.tokens[0]?.amount;
  const props = {
    name,
    isLoading,
    isError,
    isSuccess,
    add,
    amount,
    tokenHistory,
  };

  return (
    <>
      <TokenSingleHistoryDetails {...props} />
    </>
  );
};

export default TokenHistory;
