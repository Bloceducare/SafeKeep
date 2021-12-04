import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { store } from "../state";
import { appId, serverUrl } from "../env";
import { MoralisDappProvider } from "./MoralisProvider/DappProvider";

export const Provider = ({ children }) => {
  console.log(appId, serverUrl);
  return (
    <ReduxProvider store={store}>
      <MoralisProvider
        appId={"2aKGhOL0zRSPz2FhLpwrinb1Cdhdomgr4C5mXxrz"}
        serverUrl={"https://1j0s4bvecbdd.bigmoralis.com:2053/server"}
      >
        <MoralisDappProvider>
          <Router>{children}</Router>
        </MoralisDappProvider>
      </MoralisProvider>
    </ReduxProvider>
  );
};
