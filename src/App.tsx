import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import { store, useGlobalState } from 'state-pool'
import Web3 from 'web3'

store.setState('account', '')

import theme from './styles/theme'
import Menu from './components/Menu'
import Footer from './components/Footer'
import PageLoader from './components/Loader/PageLoader'

const Home = lazy(() => import('./views/Home'))
const Market = lazy(() => import('./views/Market'))
const MarketDoge = lazy(() => import('views/Market/Doge'))
const MarketOther = lazy(() => import('views/Market/Other'))
const Listing = lazy(() => import('./views/Listing'))
const Sell = lazy(() => import('./views/Sell'))
const Discussion = lazy(() => import('./views/Discussion'))

declare let window: any

function App() {

  const [account, setAccount] = useGlobalState('account')

  const checkConnection = async () => {
    let web3: any;
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    };

    // Check if User is already connected by retrieving the accounts
    const accounts = await web3.eth.getAccounts()
    if (accounts.length > 0) {
      setAccount(accounts[0])
    }
  }

  useEffect(() => {
    checkConnection()
  })

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Router>
            <Menu />
            <Suspense fallback={<PageLoader />}>
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/market" exact component={Market}/>
                <Route path="/market/doge" exact component={MarketDoge}/>
                <Route path="/market/other" exact component={MarketOther}/>
                <Route path="/listing" exact component={Listing}/>
                <Route path="/sell" exact component={Sell}/>
                <Route path="/discussion" exact component={Discussion}/>
              </Switch>
            </Suspense>
            <Footer />
          </Router>
        </StylesProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
