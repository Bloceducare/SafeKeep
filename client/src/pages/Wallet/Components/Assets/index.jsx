import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { AddBtn, AssetDiv, P } from "./style";
import { showCreateVaultModal } from "../../../../state/ui";
import NoVault from "../NoVault";
import { vault } from "../../selectors";
import { checkVaultAsync } from "../../state";
import CustomButton from "../../../../components/Button";
import TokenPanel from "../../../../components/TokenPanel";

const Tokens = () => {
  const tokenData = useSelector((state) => state.vault.data.tokens);
  return (
    tokenData &&
    tokenData
      .filter((item) => item.amount !== 0)
      ?.map((token) => <TokenPanel token={token} key={token.id} />)
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
        {/* <Col lg="2" md="2" sm="2">
          <AddBtn onClick={handleShowModal}> + </AddBtn>
        </Col> */}
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
