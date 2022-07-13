import { useState } from "react";
import CustomButton from "../Button";
import NormalizedInput from "../../views/Wallet/Components/NormalizedInput";
import CaretDown from "../CaretDown";
import SpaceBetween from "../Layout/SpaceBetween";
import styled from "styled-components";
import ListOfToken from "../../views/Wallet/Components/DepositWithdrawal/ListOfToken";

const SearchableTokenList = ({
  assets,
  idx = 0,
  latestAssetList,
  selectedAssets,
}) => {
  const [filtering, setFiltering] = useState(false);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [displayOptions, setDisplayOptions] = useState(false);

  // const tkBal = (coin) => {
  //     if (!coin) return;
  //     const bal = coin?.balance / Math.pow(10, coin?.decimals);
  //     return bal && bal.toFixed(4);
  //   };

  const max = (tk, index) => {
    //  const newSelected = [...selectedAssets];
    //  // newSelected[index].userTokenAmt = tkBal(tk);
    //   newSelected[index] = { ...tk, userTokenAmt: tkBal(tk) };
    // latestAssetList(newSelected)
  };

  const ShOptions = (idx) => {
    setCurrentIdx(idx);
    setDisplayOptions(true);
  };

  const filter = (e) => {
    setFiltering(true);
    const typed = e.target.value?.toLowerCase();
    const filtered = assets.filter((asset) => {
      return (
        asset?.name?.toLowerCase().includes(typed) ||
        asset?.symbol?.toLowerCase().includes(typed)
      );
    });
    setFilteredAssets(filtered);
  };

  const onSelect = (asset) => {
    setFiltering(false);
    setFilteredAssets([]);
    setDisplayOptions(false);
    setCurrentIdx(null);
    const newSelected = [...selectedAssets];
    newSelected[currentIdx] = {
      ...asset,
      userTokenAmt: 0,
      title: asset.symbol,
    };
    latestAssetList(newSelected);
  };

  const handleChange = (e) => {
    const newSelected = [...selectedAssets];
    newSelected[idx].userTokenAmt = e?.target?.value;
    latestAssetList(newSelected);
  };

  //console.log("selectedAssets", selectedAssets);
  return (
    <>
      {/* <SpaceBetween>
                  <Balance>
                    Balance: <span>{tkBal(item) ? tkBal(item) : 0}</span>
                  </Balance>
                  <div>
                    <Balance>~${tkValue(item, tokenPrice) ?? 0}</Balance>
                  </div>
                </SpaceBetween> */}
      <TokenNameAmtContainer>
        <div style={{ position: "relative" }}>
          <NormalizedInput
            onChange={(e) => filter(e, idx)}
            value={selectedAssets[idx]?.title}
            onFocus={() => ShOptions(idx)}
          />
          <CaretDown onClick={() => ShOptions(idx)} />
        </div>
        <div style={{ display: "flex" }}>
          <NormalizedInput
            value={assets[idx]?.userTokenAmt}
            onChange={(e) => handleChange(e, idx, assets[idx])}
            style={{ textAlign: "right" }}
          />

          <CustomButton
            style={{
              margin: "0.4rem",
            }}
            text="Max"
            noMargin
            className="bordered"
            onClick={() => max(assets[idx], idx)}
            type="button"
          />
        </div>
      </TokenNameAmtContainer>
      {currentIdx === idx && (
        <ListOfToken
          display={displayOptions}
          selected={onSelect}
          data={filtering ? filteredAssets : assets}
          isSearching={filtering}
        />
      )}
    </>
  );
};

export default SearchableTokenList;

const TokenNameAmtContainer = styled(SpaceBetween)`
  border-radius: 0.5rem;
  border: 1px solid #e6e6e6;
`;
