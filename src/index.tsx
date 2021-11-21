import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Loading from 'components/Loading'
import './assets/css/style.css'
import './assets/css/material-ui.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { Provider } from 'react-redux'
import store from './state'

TimeAgo.addDefaultLocale(en)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Loading />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
