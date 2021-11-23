import React from 'react';
import ReactDOM from 'react-dom';
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import { Provider } from './Providers';


ReactDOM.render(
<React.StrictMode>
<Provider>
<App />
</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

