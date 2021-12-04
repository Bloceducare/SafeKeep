import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BtnDiv } from "./style";
import Deposit from "./Components/Deposit";
import Assets from "./Components/Assets";
import CustomButton from "../../components/Button";
import { modal, vault } from "./selectors";
import { showDepositWithdrawalModal, showCreateVaultModal } from "../../state/ui";

function Wallet() {
  const dispatch = useDispatch();
  const showHideModal = useSelector(modal);
  const { data } = useSelector(vault)
  const [operationType, setOperationType] = useState("Deposit");

  const handleModal = (type) => {
    if (!data.id) return;
    if (data?.id === '0') return dispatch(showCreateVaultModal())
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
    </>
  );
}

export default Wallet;
