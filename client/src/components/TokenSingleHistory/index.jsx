import { useState, useCallback, useEffect } from "react";
import { NoTokenImage } from "../../pages/Wallet/Components/DepositWithdrawal/NotokenImage";
import TokenHistoryPanel from "../TokenHistoryPanel";
import { useHistory, useParams } from "react-router-dom";
import { useGetTokenHistoryQuery } from "../../services/api";
import { tokenValue } from "../../utils/formatter";
import tokenDetails from "../../utils/tokenDetails";
import { useSelector } from "react-redux";
import { Col, Nav, Tab, Row } from "react-bootstrap";
// import TransactionDetailsModalComp from "../TransactionDetails";

const TokenHistory = () => {
  const history = useHistory();
  const { address } = useParams();
  const goBack = () => history.goBack();
  const [name, setName] = useState("");
  // const [showTxnDetailsModal, setTxnDetailsModal] = useState(false)
  // const [currentTxn, setCurrentTxn] = useState({})

  // const handleTxnModal = (details)=> {
  //   setCurrentTxn(details)
  //   setTxnDetailsModal(true)
  // }

  // const hideTxnModal =()=> {
  //   setTxnDetailsModal(false)
  //   setCurrentTxn({})
  // }

  const { address: currentUserAdd } = useSelector((state) => state.user);
  const { data, isError, isLoading, isSuccess } = useGetTokenHistoryQuery(
    address,
    { skip: !currentUserAdd }
  );
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

  const _allTokens =
    isSuccess &&
    tokenHistory.length > 0 &&
    tokenHistory.map((i) => (
      <TokenHistoryPanel
        key={i.id}
        className="w-100 my-3"
        {...i}
        showName={false}
        // onClick={()=> handleTxnModal(i)}
      />
    ));

  const _inTokens =
    isSuccess &&
    tokenHistory.length > 0 &&
    tokenHistory
      .filter((i) => i.type === "in")
      .map((i) => (
        <TokenHistoryPanel
          key={i.id}
          className="w-100 my-3"
          {...i}
          showName={false}
        />
      ));

  const _outTokens =
    isSuccess &&
    tokenHistory.length > 0 &&
    tokenHistory
      .filter((i) => i.type === "out")
      .map((i) => (
        <TokenHistoryPanel
          key={i.id}
          className="w-100 my-3"
          {...i}
          showName={false}
        />
      ));
  const _fullData = (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row className="my-5">
        <Col className="text-center">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first" className="text-center">
                All
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="second" className="text-center">
                In
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="third" className="text-center">
                Out
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      <Tab.Content>
        <Tab.Pane eventKey="first">{_allTokens}</Tab.Pane>

        <Tab.Pane eventKey="second">
          <div className="mt-5">{_inTokens}</div>
        </Tab.Pane>
        <Tab.Pane eventKey="third">
          <div className="mt-5">{_outTokens}</div>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );

  return (
    <>
      {/* <TransactionDetailsModalComp  showModal = {showTxnDetailsModal }  hideModal ={hideTxnModal} currentData ={currentTxn} /> */}
      <button onClick={goBack}>Back</button>
      <div className="d-flex justify-content-center  align-items-center flex-column text-center">
        <NoTokenImage className="p-5 mb-4" />
        <div className="fs-3 mb-3">
          {tokenValue(data?.vaults[0]?.tokens[0]?.amount) ?? 0} {name}
          <p className="fs-5">~ 0.00</p>
        </div>
        {!!isLoading && "Loading"}
        {!!isError && "Error occurred while fetching data"}
      </div>
      {_fullData}
    </>
  );
};

export default TokenHistory;
