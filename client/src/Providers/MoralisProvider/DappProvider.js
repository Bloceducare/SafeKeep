import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";
import { checkVaultAsync } from "../../pages/Wallet/state";

function MoralisDappProvider({ children }) {
  const dispatch = useDispatch();
  const { web3 = "", Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();

  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(async function (address) {
      setWalletAddress(address[0]);
      new Promise((res, rej) => res(""))
        .then(() => localStorage.setItem("safekeepAddress", address[0]))
        .then(() => dispatch(checkVaultAsync(address[0])));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => setChainId(web3?.givenProvider?.chainId),
    [web3?.givenProvider?.chainId]
  );
  useMemo(
    () =>
      setWalletAddress(
        web3?.givenProvider?.selectedAddress || user?.get("ethAddress")
      ),
    [web3, user]
  );

  return (
    <MoralisDappContext.Provider value={{ walletAddress, chainId }}>
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
