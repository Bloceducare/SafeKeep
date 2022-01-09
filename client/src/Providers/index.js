import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { store } from "../state";
import { MoralisDappProvider } from "./MoralisProvider/DappProvider";

export const Provider = ({ children }) => {
  console.log(process.env.REACT_APP_APP_ID, process.env.REACT_APP_SERVER_URL);
  return (
    <ReduxProvider store={store}>
      <MoralisProvider
        appId={"8pkiKciyAZcHOqm2N2W3BLX0nybzuqpT6kwE1Rkz"}
        serverUrl={"https://lrg5bcd6k7us.usemoralis.com:2053/server"}
      >
        <MoralisDappProvider>
          <Router>{children}</Router>
        </MoralisDappProvider>
      </MoralisProvider>
    </ReduxProvider>
  );
};
