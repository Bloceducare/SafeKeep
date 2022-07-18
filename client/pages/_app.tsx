import { ReactNode, useEffect } from "react";
import "./global.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import SSRProvider from 'react-bootstrap/SSRProvider';
import ProviderIndex from "../Providers";
import DashboardLayout from "@components/DashboardLayout";
import { AuthenticatedHe } from "@components/Header";

type GetLayout = (page: ReactNode) => ReactNode;

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

const defaultGetLayout: GetLayout = (page: ReactNode): ReactNode => (
  <>
    <AuthenticatedHe>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthenticatedHe>
  </>
);

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const getLayout = Component.getLayout ?? defaultGetLayout;

  return (
    <>
      <ProviderIndex>  
        <SSRProvider>
          {getLayout(<Component {...pageProps} />)}
        </SSRProvider>
      </ProviderIndex>
    </>
  );
}

export default MyApp;
