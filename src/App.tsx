import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import theme from './styles/theme'
import Menu from './components/Menu'
import Footer from './components/Footer'
import PageLoader from './components/Loader/PageLoader'

const Home = lazy(() => import('./views/Home'))

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Menu />
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
