import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { P } from "./style";
import { showCreateVaultModal } from "@state/ui";
import NoVault from "../NoVault";
import { vault } from "../../selectors";
import { checkVaultAsync } from "../../state";
import CustomButton from "../../../../components/Button";
import TokenPanel from "../../../../components/TokenPanel";
import Link from "next/link";
import styled from "styled-components";
// import { useMoralisDapp } from "../../../../Providers/MoralisProvider/DappProvider";
import { currentNetworkConfig } from "../../../../utils/networkConfig";
import { useAccount } from "wagmi";

const Tokens = () => {
  const tokenData = useSelector((state) => state.vault.data.tokens);

  return (
    tokenData &&
    tokenData
      .filter((item) => item.amount !== 0)
      ?.map((token, idx) => (
        <Link
          href={`/dashboard/${
            token.isNative
              ? currentNetworkConfig()?.currencyName
              : token.address
          }`}
          key={idx}
          // className="text-white"
        >
          <TokenPanel
            token={token}
            key={token.id}
            style={{
              borderBottom: "0.3px solid rgb(182 182 182 / 46%)",
              marginTop: `${idx === 0 ? "5px" : ""}`,
              paddingTop: "16px",
              paddingBottom: "24px",
              marginBottom: "24px",
            }}
          />
        </Link>
      ))
  );
};
function Assets() {
  // const { walletAddress } = useMoralisDapp();
  const { address: walletAddress } = useAccount();
  const add = useSelector((state) => state.user.address);
  const dispatch = useDispatch();
  const { data, loading, fetchError, creatingVault } = useSelector(vault);

  const handleShowModal = () => dispatch(showCreateVaultModal());
  const handleReload = () => dispatch(checkVaultAsync(walletAddress ?? add));

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
        creating={creatingVault}
        error={
          <p className="mt-3">
            Error Occurred fetching vault{" "}
            <CustomButton text="try again" onClick={handleReload} />{" "}
          </p>
        }
      />
      <Tokens />
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
  creating,
}) => {
  if (loading) return loadingC;
  if (fetchError) return error;
  if (creating) return <P>Creating...</P>;
  if (!data?.id) return noContent;
  if (data?.id) return content;
  return loadingC;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
