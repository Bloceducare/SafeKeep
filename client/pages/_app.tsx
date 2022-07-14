import "bootstrap/dist/css/bootstrap.css";
import "./global.css";
import type { AppProps } from 'next/app'
import ProviderIndex from "../Providers/index"
import SSRProvider from 'react-bootstrap/SSRProvider'

function MyApp({ Component, pageProps }: AppProps) {
  
  return <>
  <ProviderIndex>
  <SSRProvider> 
  <Component {...pageProps} />
  </SSRProvider>
  </ProviderIndex>
  </>
}

export default MyApp
