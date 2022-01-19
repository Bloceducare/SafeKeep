import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useChain, useMoralis } from "react-moralis";
import MoralisDappContext from "./context";
import { checkVaultAsync } from "../../pages/Wallet/state";
import { supportedChains } from "../../utils/networkConfig";

function MoralisDappProvider({ children }) {
  const dispatch = useDispatch();
  const { web3 = "", Moralis, user, enableWeb3 } = useMoralis();
  const { switchNetwork } = useChain();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();

  useEffect(() => {
    Moralis.onChainChanged(async function (chain) {
      if (chain === supportedChains) {
        setChainId(chain);
      } else {
        await enableWeb3();
        await switchNetwork(0x4);
        setChainId(chain);
      }
    });

    Moralis.onAccountsChanged(async function (address) {
      setWalletAddress(address[0]);
      new Promise((res, rej) => res(""))
        .then(() => localStorage.setItem("safekeepAddress", address[0]))
        .then(() => dispatch(checkVaultAsync(address[0])));
      // .then(() => console.log("Wallet address saved", address[0], walletAddress));
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
