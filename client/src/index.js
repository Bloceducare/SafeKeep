import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import { Provider } from './Provider';
import {store} from './app/store'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
<React.StrictMode>
<Provider>
<App />
</Provider>
  
  </React.StrictMode>,
  document.getElementById('root')
);

