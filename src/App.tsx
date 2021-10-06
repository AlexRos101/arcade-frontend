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
const DiscussionStaff = lazy(() => import('./views/Discussion/discussionStaff'))
const DiscussionDetail = lazy(() => import('./views/Discussion/discussionDetail'))

declare let window: any

function App() {

  const [account, setAccount] = useGlobalState('account')

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
                <Route path="/discussion/:staffId" exact component={DiscussionStaff}/>
                <Route path="/discussion/:staffId/:discussionId" exact component={DiscussionDetail}/>
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
