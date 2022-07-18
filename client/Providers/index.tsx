import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "@state/index";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  chain,
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const alchemyId = process.env.ALCHEMY_ID;

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [...defaultChains, chain.polygon, chain.polygonMumbai, chain.localhost],
  [alchemyProvider({ alchemyId }), publicProvider()]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "safekeep",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const ProviderIndex = ({ children }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <WagmiConfig client={client}>    
      {children}  
          </WagmiConfig>
      </ReduxProvider>
    </>
  );
};

export default ProviderIndex;
