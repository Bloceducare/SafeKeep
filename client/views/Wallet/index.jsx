import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BtnDiv, HeaderContainer, Column, NumberText } from "./style";
import DepositWithdrawal from "./Components/DepositWithdrawal";
import Assets from "./Components/Assets";
import CustomButton from "../../components/Button";
import { modal, vault } from "./selectors";
import {
  showDepositWithdrawalModal,
  // showCreateVaultModal,
} from "@state/ui";
// import { Row, Col, Tab, Nav } from "react-bootstrap";
import Tabs, { Tab, TabList, TabPanel, TabPanels } from "./Components/tabs";
import TokenHistoryPanel from "../../components/TokenHistoryPanel";
import { getTokensHistoryAsync } from "../Wallet/state";
// import useInfiniteScroll from "react-infinite-scroll-hook";

function Wallet() {
  const dispatch = useDispatch();
  const showHideModal = useSelector(modal);
  const { data } = useSelector(vault);
  const [operationType, setOperationType] = useState("Deposit");

  const handleModal = (type) => {
    //  console.log(data)
    if (!data.id) return;
    // if (data?.id === "0") return dispatch(showCreateVaultModal());
    setOperationType(type);
    dispatch(showDepositWithdrawalModal());
  };

  const calcTotal = (arr, amount) => {
    if (!arr) return 0;
    const show = arr.reduce((acc, asset) => {
      const am = asset[amount] / Number(10 ** asset.decimals);
      return acc + am * asset.price;
    }, 0);
    if (isNaN(show)) return "0.0000";
    return show.toFixed(4);
  };

  return (
    <>
      <DepositWithdrawal
        operationType={operationType}
        showModal={showHideModal}
      />
      <BtnDiv>
        <CustomButton
          text="Deposit"
          onClick={() => handleModal("Deposit")}
          style={{ maxWidth: "210px", width: "100%", padding: "16px 20px" }}
        />
        <CustomButton
          text="Withdraw"
          outline
          onClick={() => handleModal("Widthdraw")}
          style={{ maxWidth: "210px", width: "100%", padding: "16px 20px" }}
        />
      </BtnDiv>

      <HeaderContainer>
        <Column>
          <p style={{ marginBottom: "6px" }}>Total Balance</p>
          <NumberText>USD {calcTotal(data?.tokens, "amount")} </NumberText>
        </Column>
        <Column>
          <p style={{ marginBottom: "6px" }}>Available Balance</p>
          <NumberText>
            USD{" "}
            {(
              calcTotal(data?.tokens, "amount") -
              calcTotal(data.tokens, "allocated")
            ).toFixed(4)}{" "}
          </NumberText>
        </Column>
      </HeaderContainer>

      <WalletContent />
    </>
  );
}

export const WalletContent = () => {
  return (
    <div style={{ width: "100%" }}>
      <Tabs>
        <div
          style={{
            width: "100%",
            display: "flex",
            // "@media (max-width: 991px)": {
            //   marginTop: "10px",
            //   marginBottom: "22px",
            //   flexDirection: "row",
            // },
          }}
        >
          <TabList
            style={{
              width: "50%",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Tab>Tokens</Tab>
            <Tab>History</Tab>
          </TabList>
        </div>
        <TabPanels>
          <TabPanel>
            {" "}
            <Assets />
          </TabPanel>
          <TabPanel>
            {" "}
            <TokensHistory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Wallet;

export const TokensHistory = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.user);

  const {
    tokensHistory: { data, loaded, status },
  } = useSelector(vault);

  const getTokensHistory = () => {
    const data = {
      walletAddress: address,
      skip: 0,
    };
    dispatch(getTokensHistoryAsync(data));
  };
  const callBackTokensHistory = useCallback(getTokensHistory, [
    address,
    dispatch,
  ]);

  useEffect(() => {
    address && callBackTokensHistory();
  }, [address, callBackTokensHistory]);

  const _loading = !loaded && status === "loading" && "Loading";
  const _data = data && data?.length > 0 && (
    <div>
      {data.map((item, index) => {
        return <TokenHistoryPanel key={index} {...item} />;
      })}
    </div>
  );
  const _error = status === "rejected" && (
    <p>
      Error loading Histories{" "}
      <CustomButton onClick={getTokensHistory} text="Try again" />{" "}
    </p>
  );

  const _noHistory = loaded && data?.length === 0 && "No History yet";
  return (
    <>
      {_loading}
      {_data}
      {_noHistory}
      {_error}
    </>
  );
};
