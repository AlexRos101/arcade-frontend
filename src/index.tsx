import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Loading from 'components/loading';
import ConnectWalletModal from 'components/Modal/ConnectWallet'
import './assets/css/style.css';
import './assets/css/material-ui.css';

ReactDOM.render(
  <React.StrictMode>
    <Loading />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
