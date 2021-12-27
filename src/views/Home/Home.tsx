import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import fscreen from 'fscreen'
import { ThemeProvider } from '@material-ui/core/styles'

import { greenTheme, pinkTheme } from 'styles/theme'

import { Typography, Button } from '@material-ui/core'
import Page from 'components/Layout/Page'
import { ReactComponent as AstronautBuy } from 'assets/img/astronautbuy.svg'
import Info from '@material-ui/icons/Info'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import { ReactComponent as Ticket } from 'assets/img/ticket.svg'
import { ReactComponent as FullScreen } from 'assets/img/fullscreen.svg'
import Logo from 'assets/img/logo-circle.png'

import HeaderLabel from 'components/Label/HeaderLabel'
import { homeTheme } from 'styles/theme'
import HowToPlay from 'components/Modal/HowToPlay'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useAppDispatch } from 'state'
import { setWalletMenu, setPointSwap } from 'state/show'
import { getValidationCheck } from 'hooks/gameapi'
import { arcadeAlert } from 'utils/arcadealert'

declare let window: any

const Home: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { account, fullscreen, setFullScreenMode } = useArcadeContext()
  const [showHowToPlay, setShowHowToPlay] = useState(false)


  const onClickArcadeMarket = () => {
    history.push('/market')
  }

  const onClickBuyArcadeDoge = () => {
    window.location.href = `https://pancakeswap.finance/swap?outputCurrency=${process.env.REACT_APP_ARCADEDOGE_ADDRESS}`
  }

  const onOpenConvertGameToken = () => {
    if (!account) {
      dispatch(setWalletMenu(true))
    } else {
      getValidationCheck(account)
      .then((result) => {
        if (result.result === 0) {
          dispatch(setPointSwap(true))
        } else {
          arcadeAlert("No matching game account found!")
        }
      })
    }
  }

  const requestFullScreen = (element: any, fullscreen: boolean) => {
    if (fullscreen === true) {
      fscreen.requestFullscreen(element)
    } else {
      fscreen.exitFullscreen()
    }
  }

  const onClickFullScreen = () => {
    setFullScreenMode(!fullscreen)
    requestFullScreen(document.body, !fullscreen)
  }

  fscreen.onfullscreenchange = () => {
    console.log(fscreen.fullscreenEnabled)
    if (fullscreen && !fscreen.fullscreenElement) {
      setFullScreenMode(false)
    }
  }

  return (
    <Page className="no-width-limit">
      <div className={`iframe-template ${fullscreen ? 'fullscreen' : ''}`}>
        <div className='replace-iframe' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ width: '120px', height: '120px'}} />
        </div>
        {/* <iframe title="Game Frame" id="game_panel" src={process.env.REACT_APP_GAME_URL}/> */}
        <div className="rect btn-fullscreen" onClick={onClickFullScreen} id="fullscreen_btn">
          <FullScreen />
        </div>
        {/*
          (<div className="rect rect-1" />
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
          <div className="rect rect-13" />)
        
        {!account ? <ConnectWallet className="iframe-connect" /> : ''}
        */}
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
            <Typography variant="subtitle1">Buy $ARC</Typography>
          </Button>
          <ThemeProvider theme={greenTheme}>
            <Button
              className="mg-8 btn-wd-limit"
              variant="contained"
              color="primary"
              onClick={onClickArcadeMarket}
              startIcon={<ShoppingCart />}
            >
              Browse Arcade Market
            </Button>
          </ThemeProvider>
          {/* <ThemeProvider theme={pinkTheme}>
            <Button
              className="mg-8 btn-wd-limit"
              variant="contained"
              color="primary"
              onClick={onOpenConvertGameToken}
              startIcon={<Ticket />}
            >
              Convert Game Tokens
            </Button>
          </ThemeProvider> */}
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
