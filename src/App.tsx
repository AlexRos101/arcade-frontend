import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'

import { store } from 'state-pool'

import theme from './styles/theme'
import Menu from './components/Menu'
import Footer from './components/Footer'
import PageLoader from './components/Loader/PageLoader'
import { InitializeGlobalVar } from 'global/gloalVar'
import { useGlobalState } from 'state-pool'
import ConnectWalletModal from 'components/Modal/ConnectWallet'
import * as CONST from './global/const'

store.setState('account', '')
store.setState('showConnectWalletModal', false)
store.setState('openConnectWalletMenu', false)
store.setState('connectedWalletType', CONST.WALLET_TYPE.NONE)
InitializeGlobalVar()

const Home = lazy(() => import('./views/Home'))
const Market = lazy(() => import('./views/Market'))
const MarketDoge = lazy(() => import('views/Market/Doge'))
const MarketOther = lazy(() => import('views/Market/Other'))
const Listing = lazy(() => import('./views/Listing'))
const Sell = lazy(() => import('./views/Sell'))
const Discussion = lazy(() => import('./views/Discussion'))
const DiscussionStaff = lazy(() => import('./views/Discussion/discussionStaff'))
const DiscussionDetail = lazy(() => import('./views/Discussion/discussionDetail'))
const DiscussionSearch = lazy(() => import('./views/Discussion/discussionSearch'))
const DiscussionAdd = lazy(() => import('./views/Discussion/discussionAdd'))

const App: React.FunctionComponent = () => {
  const [dscIsSet, setDscIsSet] = useGlobalState('dscUpdate')
  setDscIsSet(false)
  
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Router>
            <Menu />
            <Suspense fallback={<PageLoader />}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/market" exact component={Market} />
                <Route path="/market/doge" exact component={MarketDoge} />
                <Route path="/market/other" exact component={MarketOther} />
                <Route path="/listing" exact component={Listing} />
                <Route path="/sell" exact component={Sell} />
                <Route path="/item/edit/:itemTokenId" exact component={Sell} />
                <Route path="/discussion" exact component={Discussion} />
                <Route path="/discussion/new/:stuffId" exact component={DiscussionAdd} />
                <Route path="/discussion/stuff/:staffId" exact component={DiscussionStaff} />
                <Route path="/discussion/details/:staffId/:discussionId" exact component={DiscussionDetail} />
                <Route path="/discussion/search/:keyword" exact component={DiscussionSearch} />
              </Switch>
            </Suspense>
            <Footer />
          </Router>
        </StylesProvider>
        <ConnectWalletModal contents="Oops! You're not connected yet or not connected to BSC mainnet." />
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default App
