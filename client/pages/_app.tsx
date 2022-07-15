// import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "./global.css";
import type { AppProps } from "next/app";
import ProviderIndex from "../Providers/index";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <>
      <ProviderIndex>
        <Component {...pageProps} />
      </ProviderIndex>
    </>
  );
}

export default MyApp;
