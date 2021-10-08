import React, { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from 'state-pool'

import { Typography, Button } from '@material-ui/core'
import Page from 'components/Layout/Page'

import { ThemeProvider } from '@material-ui/core'
import { ReactComponent as AstronautBuy } from 'assets/img/astronautbuy.svg'
import Info from '@material-ui/icons/Info'
import ShoppingCart from '@material-ui/icons/ShoppingCart'

import HeaderLabel from 'components/Label/HeaderLabel'
import ConnectWallet from './components/ConnectWallet'
import { homeTheme } from 'styles/theme'
import HowToPlay from 'components/Modal/HowToPlay'
import * as WalletUtils from 'global/wallet'

const Home: React.FC = () => {
  const history = useHistory()
  const [account] = useGlobalState('account')
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [showConnectWallet, setShowConnectWallet] = useState(false)

  const onClickArcadeMarket = useCallback(() => {
    history.push('/market')
  }, [])

  const onClickBuyArcadeDoge = useCallback(() => {
    window.location.href = 'https://pancakeswap.finance/swap?outputCurrency=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
  }, [])

  const init = async () => {
    if (await WalletUtils.isConnected()) {
      setShowConnectWallet(false);
    } else {
      setShowConnectWallet(true);
    }
  }

  useEffect(() => {
    init()
  }, [account])

  return (
    <Page className="no-width-limit">
      <div className="iframe-template">
        <iframe />
        <div className="rect rect-1" />
        <div className="rect rect-2" />
        <div className="rect rect-3" />
        <div className="rect rect-4" />
        <div className="rect rect-5" />
        <div className="rect rect-6" />
        <div className="rect rect-7" />
        <div className="rect rect-8" />
        <div className="rect rect-9" />
        <div className="rect rect-10" />
        <div className="rect rect-11" />
        <div className="rect rect-12" />
        <div className="rect rect-13" />
        {showConnectWallet ? <ConnectWallet className="iframe-connect" /> : ''}
      </div>
      <div className="flex-row row iframe-row" style={{ paddingBottom: '0px' }}>
        <div className="flex-row row col-2" style={{ paddingBottom: '0px' }}>
          <HeaderLabel>MarsDoge</HeaderLabel>
        </div>
        <div className="flex-row row col-6" style={{ paddingBottom: '0px', position: 'relative' }}>
          <Button
            className="mg-8 btn-wd-limit"
            variant="contained"
            color="secondary"
            onClick={onClickBuyArcadeDoge}
            startIcon={<AstronautBuy />}
          >
            <Typography variant="subtitle1">Buy ArcadeDoges</Typography>
          </Button>
          <Button
            className="mg-8 btn-wd-limit"
            variant="contained"
            color="primary"
            onClick={onClickArcadeMarket}
            startIcon={<ShoppingCart />}
          >
            <Typography variant="subtitle1">Vend at ArcadeMarket</Typography>
          </Button>
        </div>
        <div className="flex-row row col-2" style={{ paddingBottom: '0px', position: 'relative' }}>
          <ThemeProvider theme={homeTheme}>
            <Button
              className="mg-8 btn-wd-limit"
              variant="contained"
              color="primary"
              onClick={() => setShowHowToPlay(true)}
              startIcon={<Info />}
            >
              <Typography variant="subtitle1">How to Play</Typography>
            </Button>
          </ThemeProvider>
        </div>
      </div>

      <HowToPlay open={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
    </Page>
  )
}

export default Home
