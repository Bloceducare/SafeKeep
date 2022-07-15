import React from "react";
import "./global.css";
import type { AppProps } from "next/app";
import ProviderIndex from "../Providers/index";
import DashboardLayout from "@components/DashboardLayout";
import { AuthenticatedHe, UnAuthenticatedHeader } from "@components/Header";

function MyApp({ Component, pageProps, router }: AppProps) {
  React.useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);


  if ([`/`, '/about', '/road-map'].includes(router.pathname)) 
  return <> 
            <ProviderIndex>
            <UnAuthenticatedHeader />
            <Component {...pageProps} />
            </ProviderIndex>
          </>;
  
  return (
    <>
      <ProviderIndex>
        <AuthenticatedHe />
        <DashboardLayout>
        <Component {...pageProps} />
        </DashboardLayout>
      </ProviderIndex>
    </>
  );
}

export default MyApp;
