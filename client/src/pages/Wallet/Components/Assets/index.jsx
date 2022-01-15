import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { AddBtn, P } from "./style";
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
      ?.map((token, idx) => (
        <TokenPanel
          token={token}
          key={token.id}
          className={`${idx === 0 ? "mt-5" : ""} py-2 mb-3 pb-3`}
          style={{ borderBottom: "0.3px solid rgb(182 182 182 / 46%)" }}
        />
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
      <NoVault onClick={handleShowModal} />{" "}
    </>
  );

  const _data = <>{data?.id && <Tokens />}</>;

  return (
    <Container>
      <Show
        loading={loading}
        data={data}
        loadingC={<P>Loading...</P>}
        content={_data}
        noContent={_noVault}
        fetchError={fetchError}
        error={
          <p className="mt-3">
            Error Occurred fetching vault{" "}
            <CustomButton text="try again" onClick={handleReload} />{" "}
          </p>
        }
      />
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
