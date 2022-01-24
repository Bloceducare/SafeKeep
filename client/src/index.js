import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "./Providers";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
