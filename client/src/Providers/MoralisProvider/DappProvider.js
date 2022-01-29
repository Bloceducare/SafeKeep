import React, { useEffect, useMemo, useState } from "react";
import { useChain, useMoralis } from "react-moralis";
import MoralisDappContext from "./context";
import { supportedChains } from "../../utils/networkConfig";

function MoralisDappProvider({ children }) {
  const { web3 = "", Moralis, user, enableWeb3 } = useMoralis();
  const { switchNetwork } = useChain();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();

  const refetchData = async (address, chain) => {
    if (!address) return;
    new Promise((res, rej) => res(""))
      .then(() => localStorage.setItem("safekeepAddress", address))
      .then(() => localStorage.setItem("safeKeepCurrentChainId", Number(chain)))
      .then(() => window.location.reload());
  };

  useEffect(() => {
    Moralis.onChainChanged(async function (chain) {
      if (supportedChains.some((i) => i === chain)) {
        setChainId(chain);
        console.log(
          web3?.givenProvider?.selectedAddress || user?.get("ethAddress"),
          "wall",
          chain
        );
        refetchData(
          web3?.givenProvider?.selectedAddress || user?.get("ethAddress"),
          chain
        );
      } else {
        await enableWeb3();
        await switchNetwork(0x4);
        setChainId(chain);
        localStorage.setItem("safeKeepCurrentChainId", chain);
        //  refetchData(walletAddress);
      }
    });

    Moralis.onAccountsChanged(async function (address) {
      setWalletAddress(address[0]);
      refetchData(address[0]);
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
