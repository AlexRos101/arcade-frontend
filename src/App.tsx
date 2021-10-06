import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'

import theme from './styles/theme'
import Menu from './components/Menu'
import Footer from './components/Footer'
import PageLoader from './components/Loader/PageLoader'

const Home = lazy(() => import('./views/Home'))
const Market = lazy(() => import('./views/Market'))
const Listing = lazy(() => import('./views/Listing'))
const Sell = lazy(() => import('./views/Sell'))

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Router>
            <Menu />
            <Suspense fallback={<PageLoader />}>
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/market" exact>
                  <Market />
                </Route>
                <Route path="/listing" exact>
                  <Listing />
                </Route>
                <Route path="/sell" exact>
                  <Sell />
                </Route>
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
