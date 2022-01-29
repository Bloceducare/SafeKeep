import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "./Providers";
import "react-toastify/dist/ReactToastify.css";
import Moralis from "moralis/dist/moralis.min.js";

const serverUrl = "https://lrg5bcd6k7us.usemoralis.com:2053/server";
const appId = "8pkiKciyAZcHOqm2N2W3BLX0nybzuqpT6kwE1Rkz";
Moralis.start({ serverUrl, appId });

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
