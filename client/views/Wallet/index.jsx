import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BtnDiv } from "./style";
import DepositWithdrawal from "./Components/DepositWithdrawal";
import Assets from "./Components/Assets";
import CustomButton from "../../components/Button";
import { modal, vault } from "./selectors";
import {
  showDepositWithdrawalModal,
  // showCreateVaultModal,
} from "@state/ui";
import { Row, Col, Tab, Nav } from "react-bootstrap";
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
        <CustomButton text="Deposit" onClick={() => handleModal("Deposit")} />
        <CustomButton
          text="Withdraw"
          outline
          onClick={() => handleModal("Widthdraw")}
        />
      </BtnDiv>
      <Row className="p-3 mb-5" style={{ background: "#050913" }}>
        <Col lg="5" md="5" sm="5">
          <p>Total Balance</p>
          <h5>USD {calcTotal(data?.tokens, "amount")} </h5>
        </Col>
        <Col lg="5" md="5" sm="5">
          <p>Available Balance</p>
          <h5>
            USD{" "}
            {(
              calcTotal(data?.tokens, "amount") -
              calcTotal(data.tokens, "allocated")
            ).toFixed(4)}
          </h5>
        </Col>
      </Row>

      <WalletContent />
    </>
  );
}

export const WalletContent = () => {
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col className="text-center">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first" className="text-center">
                  Tokens
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="second" className="text-center">
                  History
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Tab.Content>
          <Tab.Pane eventKey="first">
            <Assets />
          </Tab.Pane>

          <Tab.Pane eventKey="second">
            <div className="mt-5">
              <TokensHistory />
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
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
