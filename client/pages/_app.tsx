import { ReactNode, useEffect } from "react";
import "./global.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import SSRProvider from 'react-bootstrap/SSRProvider';
import ProviderIndex from "../Providers";
import DashboardLayout from "@components/DashboardLayout";
import { AuthenticatedHe, UnAuthenticatedHeader } from "@components/Header";
import PrivateRoute from "@components/Authprovider";

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
const normalGetLayout: GetLayout = (page: ReactNode): ReactNode => {
  
return (
  <>
  <UnAuthenticatedHeader>
      {page}
  </UnAuthenticatedHeader>
  </>)
};



function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const getLayout = Component.getLayout ? normalGetLayout: defaultGetLayout;

    // Add your protected routes here
    const publicRoutes = ['/', '/about', 'road-map'];

  return (
    <>
      <ProviderIndex>  
        <SSRProvider>
          <PrivateRoute publicRoutes={publicRoutes}>
          {getLayout(<Component {...pageProps} />)}
          </PrivateRoute>
        </SSRProvider>
      </ProviderIndex>
    </>
  );
}

export default MyApp;
