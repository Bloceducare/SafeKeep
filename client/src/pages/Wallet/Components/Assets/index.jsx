import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { AddBtn, AssetDiv, P } from "./style";
import { showCreateVaultModal } from "../../../../state/ui";
import NoVault from "../NoVault";
import { vault } from "../../selectors";
import SpaceBetween from "../../../../components/Layout/SpaceBetween";
import { NoTokenImage } from "../Deposit/NotokenImage";
import { tokenValue } from "../../../../utils/formatter";
import { checkVaultAsync } from "../../state";
import CustomButton from "../../../../components/Button";

const Tokens = () => {
  const tokenData = useSelector((state) => state.vault.data.tokens);
  return (
    tokenData &&
    tokenData
      .filter((item) => item.amount !== 0)
      ?.map((token) => (
        <SpaceBetween className="mb-2">
          <div className="d-flex align-items-center">
            <div className="">
              <NoTokenImage />
            </div>
            <div>
              <div>
                <span>{token.name}</span>
              </div>
              <div>
                <span>$0.00</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div>
              {tokenValue(token.amount)} {token.symbol}
            </div>
            <div>Value</div>
          </div>
        </SpaceBetween>
      ))
  );
};
function Assets() {
  const dispatch = useDispatch();
  const { data, loading, fetchError } = useSelector(vault);

  const handleShowModal = () => dispatch(showCreateVaultModal());
  const handleReload = () => dispatch(checkVaultAsync());

  const _noVault = (
    <>
      <Row>
        <Col lg="5" md="5" sm="5">
          <P>Total Balance</P>
          <h5>USD 0.0000</h5>
        </Col>
        <Col lg="5" md="5" sm="5">
          <P>Available Balance</P>
          <h5>USD 0.0000</h5>
        </Col>
        <Col lg="2" md="2" sm="2">
          <AddBtn onClick={handleShowModal}> + </AddBtn>
        </Col>
      </Row>
      <NoVault onClick={handleShowModal} />{" "}
    </>
  );

  const _data = (
    <>
      <Row className="mb-3">
        <Col lg="5" md="5" sm="5">
          <P>Total Balance</P>
          <h5>USD 0.0000</h5>
        </Col>
        <Col lg="5" md="5" sm="5">
          <P>Available Balance</P>
          <h5>USD 0.0000</h5>
        </Col>
        <Col lg="2" md="2" sm="2">
          <AddBtn onClick={handleShowModal}> + </AddBtn>
        </Col>
      </Row>

      {data?.id && <Tokens />}
    </>
  );

  return (
    <Container>
      <AssetDiv>
        <Show
          loading={loading}
          data={data}
          loadingC={<P>Loading...</P>}
          content={_data}
          noContent={_noVault}
          fetchError={fetchError}
          error={
            <p>
              Error Occurred fetching vault{" "}
              <CustomButton text="try again" onClick={handleReload} />{" "}
            </p>
          }
        />
      </AssetDiv>
    </Container>
  );
}

export default Assets;

const Show = ({
  loading,
  data,
  loadingC,
  content,
  noContent,
  fetchError,
  error,
}) => {
  if (loading) return loadingC;
  if (fetchError) return error;
  if (!data?.id) return noContent;
  if (data?.id) return content;
  return loadingC;
};
