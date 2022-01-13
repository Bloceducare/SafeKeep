import React from "react";
import styled from "styled-components";
import Cross from "../Cross";
import SpaceBetween from "../Layout/SpaceBetween";
import PlusIcon from "../PlusIcon";
import SearchableTokenList from "../SearchableTokenList";

const tkBal = (coin) => {
  if (!coin) return;
  const bal = coin?.balance / Math.pow(10, coin?.decimals);
  return bal && bal.toFixed(4);
};

const tkValue = (coin, price) => {
  if (!price || !coin) return;
  const tokenValue =
    (Number(coin?.balance) / Math.pow(10, coin?.decimals)) * price;
  return tokenValue && tokenValue.toFixed(4);
};

const tokenPrice = 0;

const MultiSearchableTokenList = ({
  assets,
  selectedAssets = [],
  latestData,
}) => {
  const handleRemove = (idx) => {
    const newSelected = [...selectedAssets];
    newSelected.splice(idx, 1);
    latestData(newSelected);
    //  setSelectedAssets(newSelected);
  };

  const handleAdd = () => {
    latestData([...selectedAssets, { userTokenAmt: 0 }]);
    //  setSelectedAssets([...selectedAssets, { userTokenAmt: 0 }]);
  };

  return (
    <div style={{ position: "relative" }}>
      <PlusIcon onClick={handleAdd} disabled={!assets?.length} />

      {selectedAssets &&
        selectedAssets.map((item, idx) => (
          <React.Fragment key={`${item?.token_addrress}-${idx}`}>
            <div
              style={{
                position: "relative",
                margin: "0.5rem 1.5rem",
                marginTop: `${idx === 0 ? "2rem" : "1.2rem"}`,
              }}
            >

              <Cross
                onClick={() => handleRemove(idx)}
                style={{
                  top: "50%",
                  right: "-1.7rem",
                }}
                />

                <SpaceBetween>
                  <Balance>
                    Balance: <span>{tkBal(item) ? tkBal(item) : 0}</span>
                  </Balance>
                  <div>
                    <Balance>~${tkValue(item, tokenPrice) ?? 0}</Balance>
                  </div>
                </SpaceBetween>
              <SearchableTokenList
                idx={idx}
                assets={assets}
                selectedAssets={selectedAssets}
                latestAssetList={(latest) => latestData(latest)}
              />
            </div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default MultiSearchableTokenList;

export const Balance = styled.div`
  opacity: 0.7;
  font-size: 0.8rem;
`;
