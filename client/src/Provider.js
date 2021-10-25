import { Provider as ReduxProvider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MoralisProvider } from "react-moralis"
import {store} from './app/store'
import {appId, serverUrl} from './env'


export const Provider =({children})=>{
    return (
        <MoralisProvider appId={'77IfzDQc5dLFD3YbNKeuNrxHGe2c5OWGoMxgfLTU'} serverUrl={'https://ioc7ccqovdu5.grandmoralis.com:2053/server'}>
     <ReduxProvider store={store}>
      <Router>
     {children}
      </Router>
      </ReduxProvider>
      </MoralisProvider>
    )
}

