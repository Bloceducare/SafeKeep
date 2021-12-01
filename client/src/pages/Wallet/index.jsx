import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BtnDiv } from "./style";
import Deposit from "./Components/Deposit";
import Assets from "./Components/Assets";
import CustomButton from "../../components/Button";
import { modal } from "./selectors";
import { showDepositWithdrawalModal } from "../../state/ui";

function Wallet() {
  const dispatch = useDispatch();
  const showHideModal = useSelector(modal);
  const [operationType, setOperationType] = useState("Deposit");

  const handleModal = (type) => {
    setOperationType(type);
    dispatch(showDepositWithdrawalModal());
  };
  return (
    <>
      <BtnDiv>
        <CustomButton text="Deposit" onClick={() => handleModal("Deposit")} />

        <CustomButton
          text="Withdraw"
          outline
          onClick={() => handleModal("Widthdraw")}
        />
      </BtnDiv>
      <Assets />
      <Deposit operationType={operationType} showModal={showHideModal} />
      {/* <Switch>
<Route  path="/dashboard/wallet/assets" component={Assets} />
<Route  path="/dashboard/wallet/deposit" component={Deposit} />
</Switch> */}
    </>
  );
}

export default Wallet;
