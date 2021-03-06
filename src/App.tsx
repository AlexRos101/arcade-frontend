import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'

import { ArcadeProvider } from 'Providers'
import theme from './styles/theme'
import Menu from './components/Menu'
import Footer from './components/Footer'
import PageLoader from './components/Loader/PageLoader'
import ConnectWalletModal from 'components/Modal/ConnectWallet'
import { RefreshContextProvider } from 'contexts/RefreshContext'

const Home = lazy(() => import('./views/Home'))
const Market = lazy(() => import('./views/Market'))
const MarketDoge = lazy(() => import('views/Market/Doge'))
const MarketOther = lazy(() => import('views/Market/Other'))
const Listing = lazy(() => import('./views/Listing'))
const Sell = lazy(() => import('./views/Sell'))
const Discussion = lazy(() => import('./views/Discussion'))
const DiscussionStaff = lazy(() => import('./views/Discussion/DiscussionStaff'))
const DiscussionDetail = lazy(() => import('./views/Discussion/DiscussionDetail'))
const DiscussionSearch = lazy(() => import('./views/Discussion/DiscussionSearch'))
const DiscussionAdd = lazy(() => import('./views/Discussion/DiscussionAdd'))

const App: React.FunctionComponent = () => {
 
  return (
    <MuiThemeProvider theme={theme}>
      <ArcadeProvider>
        <ThemeProvider theme={theme}>
          <RefreshContextProvider>
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
          </RefreshContextProvider>
        </ThemeProvider>
      </ArcadeProvider>
    </MuiThemeProvider>
  )
}

export default App
