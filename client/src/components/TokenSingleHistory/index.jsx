import { useState, useCallback, useEffect } from "react";
import { NoTokenImage } from "../../pages/Wallet/Components/DepositWithdrawal/NotokenImage";
import TokenHistoryPanel from "../TokenHistoryPanel";
import { useHistory, useParams } from "react-router-dom";
import { useGetTokenHistoryQuery } from "../../services/api";
import { tokenValue } from "../../utils/formatter";
import tokenDetails from "../../utils/tokenDetails";
import { useSelector } from "react-redux";


const TokenHistory = () => {
  const history = useHistory();
  const { address } = useParams();
  const goBack = () => history.goBack();
  const [name, setName] = useState('');

  const {address:currentUserAdd} = useSelector(state => state.user)
  const { data, isError, isLoading, isSuccess } =
    useGetTokenHistoryQuery(address, {skip: !currentUserAdd});
    const tokenHistory = data?.vaults[0]?.tokens[0]?.history;
    const add = data?.vaults[0]?.tokens[0]?.id
    const getName = async ()=> {
    const you =await ( add && await tokenDetails(add))
   return setName(you?.symbol)
  }

  const getNameCallBack = useCallback(getName, [add]);
  
  useEffect(() => { 
    getNameCallBack()
  },[getNameCallBack])

  return (
    <>
      <button onClick={goBack}>Back</button>
      <div className="d-flex justify-content-center  align-items-center flex-column text-center">
        <NoTokenImage className="p-5 mb-4" />
        <div className="fs-3 mb-3">
          {tokenValue(data?.vaults[0]?.tokens[0]?.amount) ?? 0 } {" "}
          {name}
          <p className="fs-5">~ 0.00</p>
        </div>
        {!!isLoading && "Loading"}
        {!!isError && "Error occurred while fetching data"}

        {isSuccess &&
          tokenHistory.length > 0 &&
          tokenHistory.map((i) => (
            <TokenHistoryPanel
              key={i.id}
              className="w-100 my-2"
              {...i}
              showName={false}
            />
          ))}
      </div>
    </>
  );
};

export default TokenHistory;
