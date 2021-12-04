import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { Modal } from "react-bootstrap";
import CustomButton from "../../../../components/Button";
import CustomInput from "../../../../components/CustomInput";
import SpaceBetween from "../../../../components/Layout/SpaceBetween";
import ModalBody from "../../../../components/Modal/ModalBody";
import ModalHeader from "../../../../components/Modal/ModalHeader";
import { useERC20Balance } from "../../../../hooks/useERC20Balance";
import ListOfToken from "./ListOfToken";
import { DepositBtn, Balance } from "./style";
import { useMoralisDapp } from "../../../../Providers/MoralisProvider/DappProvider";
import { useNativeBalance } from "../../../../hooks/useNativeBalance";
import {
  depositEtherAsync,
  depositERC20TokenAsync,
  withdrawEtherAsync,
} from "../../state";
import { modal, vault, transactionStatus } from "../../selectors";
import { ToastContainer } from "react-toastify";
import useTokenPrice from "../../../../hooks/useTokenPrice";
import { hideDepositWithdrawalModal } from "../../../../state/ui";
import Cross from "../Cross";
import PlusIcon from "../PlusIcon";
import CaretDown from "../CaretDown";
import NormalizedInput from "../NormalizedInput";

const nativeToken = (data) => {
  const { nativeName, decimal = 18, balance } = data;

  if (nativeName?.toLowerCase() === "bnb")
    return {
      balance: balance?.inWei ?? 0,
      formattedBal: balance?.formatted ?? 0,
      decimals: Number(decimal) ?? 18,
      name: nativeName,
      token_address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      logo: null,
      symbol: "BNB",
      isNative: true,
    };
  if (nativeName.toLowerCase() === "eth")
    return {
      balance: balance?.inWei,
      formattedBal: balance?.formatted,
      decimals: Number(decimal) ?? 18,
      name: nativeName,
      token_address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      logo: null,
      symbol: "Eth",
      isNative: true,
    };
  if (nativeName.toLowerCase() === "matic")
    return {
      balance: balance?.inWei,
      formattedBal: balance?.formatted,
      decimals: Number(decimal) ?? 18,
      name: nativeName,
      token_address: "",
      logo: null,
      symbol: "matic",
      isNative: true,
    };
  if (nativeName.toLowerCase() === "") return "";
  return;
};

function Deposit({ showModal = false, operationType = "Deposit" }) {
  const dispatch = useDispatch();
  const {
    data: { id },
  } = useSelector(vault);

  const txnStatus = useSelector(transactionStatus);
  const modalStatus = useSelector(modal);
  const { chainId } = useMoralisDapp();
  const { assets = [] } = useERC20Balance();
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [fetchAsset, setFetchAsset] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([{}]);
  const [tokenType, setTokenType] = useState("");
  const [nativeBal, setNativeBal] = useState(0);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [filtering, setFiltering] = useState(false);
  const native = useNativeBalance();

  const handleTokenType = (e) => {
    setTokenType(e.target.value);
  };

  const handleSelected = (tok) => {
    setDisplayOptions(false);
    const newSelected = [...selectedAssets];
    newSelected[currentIdx] = { ...tok, userTokenAmt: 0, title: tok.symbol };
    setSelectedAssets(newSelected);
    setFetchAsset(!fetchAsset);
    setFiltering(false);
  };

  const handleShOptions = (idx) => {
    setCurrentIdx(idx);
    setDisplayOptions(true);
  };

  // const handleBlur = () => {
  //   setCurrentIdx(null);
  //   setDisplayOptions(false);

  // };

  const handleChange = (e, idx) => {
    if (tokenType === "native") return setNativeBal(e?.target?.value);
    if (tokenType === "erc20Tokens") {
      const newSelected = [...selectedAssets];
      newSelected[idx].userTokenAmt = e?.target?.value;
      setSelectedAssets(newSelected);
    }
  };

  const handleRemove = (idx) => {
    const newSelected = [...selectedAssets];
    newSelected.splice(idx, 1);
    setSelectedAssets(newSelected);
  };

  const handleAdd = () => {
    setSelectedAssets([...selectedAssets, { userTokenAmt: 0 }]);
  };

  const handleFilter = (e, idx) => {
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

  const handleModal = () => {
    setNativeBal(0);
    setTokenType(null);
    dispatch(hideDepositWithdrawalModal());
  };

  const clearFields = () => {
    setNativeBal(0);
    setSelectedAssets([{ userTokenAmt: 0 }]);
  };
  useEffect(() => {
    let cancel = false;
    if (cancel) return;

    clearFields();

    return () => {
      cancel = true;
      clearFields();
    };
  }, [modalStatus, dispatch]);

  const tkValue = (coin, price) => {
    if (!price || !coin) return;
    const tokenValue =
      (Number(coin?.balance) / Math.pow(10, coin?.decimals)) * price;
    return tokenValue && tokenValue.toFixed(4);
  };

  const tkBal = (coin) => {
    if (!coin) return;
    const bal = coin?.balance / Math.pow(10, coin?.decimals);
    return bal && bal.toFixed(4);
  };

  const setMax = (tk, index) => {
    const coin = tkBal(nativeTokenObj);
    if (tokenType === "native") return setNativeBal(coin ?? 0);
    const tempAssets = [...selectedAssets];
    tempAssets[index].userTokenAmt = tkBal(tk);
    setSelectedAssets(tempAssets);
  };

  const nativeTokenObj = nativeToken(native);
  const data = { chainId, token_address: nativeTokenObj?.token_address };
  const { tokenPrice } = useTokenPrice(data);

  const verifyTokenAmt = () => {
    if (tokenType === "native") return nativeBal > 0;
    if (tokenType === "erc20Tokens")
      return selectedAssets.some((asset) => asset.userTokenAmt > 0);
  };
  const handleTransaction = (e) => {
    e.preventDefault();
    if (!verifyTokenAmt) return;
    if (operationType === "Deposit") {
      if (tokenType === "native") {
        const data = { id, amount: ethers.utils.parseEther(nativeBal) };
        return dispatch(depositEtherAsync(data));
      }

      if (tokenType === "erc20Tokens") {
        if (!selectedAssets.length) return;
        const tokenDeps = selectedAssets.map((asset) => asset.token_address);
        const _amounts = selectedAssets.map((asset) =>
          ethers.utils.parseEther(asset.userTokenAmt)
        );
        const _id = id;
        const data = { _id, tokenDeps, _amounts };
        return dispatch(depositERC20TokenAsync(data));
      }
    }
    if (operationType === "Widthdraw") {
      if (tokenType === "native") {
        const data = { id, amount: ethers.utils.parseEther(nativeBal) };
        return dispatch(withdrawEtherAsync(data));
      }
    }
  };

  const { approving, depositing, withdrawing } = txnStatus;
  const crud = approving || depositing || withdrawing;
  const transactionTextDisplay = (type) => {
    if (type === "Deposit") {
      return approving ? "Approving" : depositing ? "Depositing" : "Deposit";
    }
    if (type === "Widthdraw") {
      return approving ? "Approving" : withdrawing ? "Withdrawing" : "Withdraw";
    }
  };
  const _nativeCoin = (
    <div style={{ position: "relative" }}>
      <form onSubmit={handleTransaction}>
        <CustomInput
          name="nativeCoin"
          value={nativeBal}
          onChange={handleChange}
        />
        <CustomButton
          style={{
            marginLeft: "0.6rem",
            position: "absolute",
            right: "0.5rem",
            top: "0.4rem",
          }}
          text="Max"
          noMargin
          className="p-1 px-3 bordered"
          onClick={setMax}
          type="button"
        />

        <SpaceBetween>
          <Balance>
            Balance: <span>{tkBal(nativeTokenObj)}</span>
          </Balance>
          <div>~${tkValue(nativeTokenObj, tokenPrice) ?? 0}</div>
        </SpaceBetween>

        <DepositBtn>
          <CustomButton
            className="d-block"
            noMargin
            disabled={!verifyTokenAmt() || crud}
            text={transactionTextDisplay(operationType, crud)}
            onClick={handleTransaction}
          />
        </DepositBtn>
      </form>
    </div>
  );

  const _ERC20Bal = (
    <form onSubmit={handleTransaction}>
      <div style={{ position: "relative" }}>
        <PlusIcon onClick={handleAdd} disabled={!assets.length} />

        {selectedAssets.map((item, idx) => (
          <React.Fragment key={`${item.token_addrress}-${idx}`}>
            <div
              style={{
                position: "relative",
                margin: "0.5rem 1.5rem",
                marginTop: `${idx === 0 ? "2rem" : "1.2rem"}`,
              }}
            >
              <SpaceBetween>
                <Balance>
                  Balance: <span>{tkBal(item) ? tkBal(item) : 0}</span>
                </Balance>
                <div>
                  <Balance>~${tkValue(item, tokenPrice) ?? 0}</Balance>
                </div>
              </SpaceBetween>
              <Cross onClick={() => handleRemove(idx)} />
              <TokenNameAmtContainer>
                <div style={{ position: "relative" }}>
                  <NormalizedInput
                    onChange={(e) => handleFilter(e, idx)}
                    value={selectedAssets[idx]?.title}
                    onFocus={() => handleShOptions(idx)}
                    //  onBlur={handleBlur}
                  />
                  <CaretDown
                    onClick={() => handleShOptions(idx)}
                    selected={`${currentIdx === idx ? displayOptions : ""}`}
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <NormalizedInput
                    value={selectedAssets[idx]?.userTokenAmt}
                    onChange={(e) => handleChange(e, idx, item)}
                    style={{ textAlign: "right" }}
                  />

                  <CustomButton
                    style={{
                      margin: "0.4rem",
                    }}
                    text="Max"
                    noMargin
                    className="bordered"
                    onClick={() => setMax(item, idx)}
                    type="button"
                  />
                </div>
              </TokenNameAmtContainer>

              {currentIdx === idx && (
                <ListOfToken
                  display={displayOptions}
                  selected={handleSelected}
                  data={filtering ? filteredAssets : assets}
                  isSearching={filtering}
                />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {selectedAssets.length > 0 && (
        <DepositBtn>
          <CustomButton
            className="d-block"
            noMargin
            disabled={!verifyTokenAmt() || crud}
            text={transactionTextDisplay(operationType, crud)}
            onClick={handleTransaction}
          />
        </DepositBtn>
      )}
    </form>
  );

  const _view =
    tokenType === "native"
      ? _nativeCoin
      : tokenType === "erc20Tokens"
      ? _ERC20Bal
      : null;

  return (
    <>
      <ToastContainer />

      <Modal show={showModal} onHide={handleModal}>
        <ModalHeader title={`${operationType} Crypto`} />
        <ModalBody>
          <h6 style={{ marginTop: "1.5rem" }}>Deposit Type </h6>
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ maxWidth: "15rem", margin: "1rem 0" }}
          >
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="customRadioInline1"
                name="tokenType"
                value="native"
                onChange={handleTokenType}
                className="custom-control-input"
              />
              <label
                className="mr-3 custom-control-label"
                htmlFor="customRadioInline1"
                style={{ marginLeft: "0.5rem" }}
              >
                {nativeToken(native)?.symbol}
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="customRadioInline2"
                name="tokenType"
                value="erc20Tokens"
                onChange={handleTokenType}
                className="custom-control-input"
              />
              <label
                className="custom-control-label"
                htmlFor="customRadioInline2"
                style={{ marginLeft: "0.5rem" }}
              >
                Others
              </label>
            </div>
          </div>

          {_view}
        </ModalBody>
      </Modal>
    </>
  );
}

export default Deposit;

const TokenNameAmtContainer = styled(SpaceBetween)`
  border-radius: 0.5rem;
  border: 1px solid #e6e6e6;
`;
