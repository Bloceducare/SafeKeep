import "bootstrap/dist/css/bootstrap.css";
import "./global.css";
import type { AppProps } from 'next/app'
import ProviderIndex from "../Providers/index"

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <ProviderIndex>
  <Component {...pageProps} />
  </ProviderIndex>
  </>
}

export default MyApp
