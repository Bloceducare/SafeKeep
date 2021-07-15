import { createContext } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "8c7e5f2b4151492cb90848faa879264d" // required
      }
    }
  };
  const providerOptions = {
    portis: {
      package: Portis, // required
      options: {
        id: "PORTIS_ID" // required
      }
    }
  };