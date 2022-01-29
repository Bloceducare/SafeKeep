import { NoTokenImage } from "../../pages/Wallet/Components/DepositWithdrawal/NotokenImage";
import TokenHistoryPanel from "../TokenHistoryPanel";
import { useHistory } from "react-router-dom";
import { tokenValue } from "../../utils/formatter";
import { Col, Nav, Tab, Row } from "react-bootstrap";
import { currentNetworkConfig } from "../../utils/networkConfig";

const TokenSingleHistoryDetails = ({
  name = "ETH",
  tokenHistory = [],
  isError,
  isLoading = null,
  isSuccess = false,
  isNative = false,
  amount,
  price = 0,
  decimals = 18,
}) => {
  const history = useHistory();
  const goBack = () => history.goBack();


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
      <button onClick={goBack}>Back</button>
      <div className="d-flex justify-content-center  align-items-center flex-column text-center">
        <NoTokenImage className="p-5 mb-4" />
        <div className="fs-3 mb-3">
          {tokenValue(amount) ?? 0} {isNative ? currentNetworkConfig()?.currencyName : name}
          <p className="fs-5">~ $ {(amount/10**Number(decimals)) * price.toFixed(2)}</p>
        
        </div>
        {!!isLoading && "Loading"}
        {!!isError && "Error occurred while fetching data"}
      </div>
      {_fullData}
    </>
  );
};

export default TokenSingleHistoryDetails;
