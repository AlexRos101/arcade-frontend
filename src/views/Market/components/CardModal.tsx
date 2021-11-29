import React, { useEffect, useState, useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import { Button } from '@material-ui/core'
import avatar from 'assets/img/avatar.png'
import doge from 'assets/img/doge.svg'
import BigNumber from 'bignumber.js'

import MarketModalRow from './MarketModalRow'
import ModalNavLabel from 'views/Market/components/ModalnavLabel'
import ModalHeaderLabel from 'views/Market/components/ModalHeaderLabel'
import ModalContent from 'views/Market/components/ModalContent'
import PriceLayout from 'components/Layout/PriceLayout'

import PriceHeaderLabel from './PriceHeaderLabel'
import PriceLabel from './PriceLabel'

import BuyModal from 'components/Modal/Buy'
import BuyBUSDModal from 'components/Modal/BuyBUSD'

import { GameItem } from 'global/interface'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useExchange } from 'hooks/useContract'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

interface Props {
  open: boolean
  item: GameItem
  category: string
  onClose: () => void
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FCBF4A',
      contrastText: '#7E5504',
    },
    secondary: {
      main: '#FFFEFB',
      contrastText: '#7E5504',
    },
  },
})

const CardModal: React.FC<Props> = (props) => {
  const { account } = useArcadeContext()
  const exchange = useExchange()
  const [showBuyDlg, setShowBuyDlg] = useState(false)
  const [showBuyBUSDDlg, setShowBuyBUSDDlg] = useState(false)
  const [rate, setRate] = useState(new BigNumber(0))
  const [initialized, setInitialized] = useState(false)

  const getRate = useCallback(async () => {
    exchange.methods
      .getRate()
      .call()
      .then((res: string) => {
        setRate(new BigNumber(res).div(10 ** 18))

        setTimeout(getRate, 300000)
      })
      .catch(() => {
        setTimeout(getRate, 500)
      })
  }, [exchange.methods])

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    getRate()
  }, [initialized, getRate])

  return (
    <Dialog
      className="card-dialog"
      onClose={props.onClose}
      maxWidth="lg"
      aria-labelledby="customized-dialog-title"
      open={props.open}
      PaperProps={{ style: { borderRadius: 7 } }}
    >
      <DialogContent className="modal-card-content flex-row" dividers>
        <img className="expanded-card-img" src={`${process.env.REACT_APP_THUMBNAIL_NODE}${props.item.token_id}.png`} alt=""/>
        <div className="expanded-card-content">
          <ModalNavLabel>{props.category}</ModalNavLabel>
          <MarketModalRow>
            <ModalHeaderLabel>{props.item.name}</ModalHeaderLabel>
          </MarketModalRow>
          <MarketModalRow>
            <ModalContent>{props.item.description}</ModalContent>
          </MarketModalRow>
          <MarketModalRow>
            <PriceLayout>
              <PriceHeaderLabel>Current Price</PriceHeaderLabel>
              <div className="price-row">
                <div className="price-sector">
                  <img className="mr-5 mh-auto" src={avatar} alt="avatar" style={{ width: '30px', height: '30px' }} />
                  <PriceLabel>{Number(props.item.arcadedoge_price).toFixed(2)}</PriceLabel>
                  {/* <PriceDexLabel>(US$15.00)</PriceDexLabel> */}
                </div>
                <div className="price-sector">
                  <img className="mr-5 mh-auto" src={doge} alt="avatar" style={{ width: '30px', height: '30px' }} />
                  <PriceLabel>{rate.multipliedBy(Number(props.item.arcadedoge_price)).toFixed(2)}</PriceLabel>
                  {/* <PriceDexLabel>(US$15.00)</PriceDexLabel> */}
                </div>
              </div>
            </PriceLayout>
          </MarketModalRow>
          <MarketModalRow>
            <ThemeProvider theme={theme}>
              <Button
                className="modal-buy-arcade-btn"
                variant="contained"
                color="primary"
                disabled={account === props.item.owner ? true : false}
                onClick={() => setShowBuyDlg(true)}
                style={{ whiteSpace: 'nowrap' }}
                startIcon={
                  <img className="mh-auto" src={avatar} alt="avatar" style={{ width: '20px', height: '20px' }} />
                }
              >
                Buy in Arcade
              </Button>
              <Button
                className="ml-15 modal-buy-usd-btn"
                variant="contained"
                color="secondary"
                disabled={account === props.item.owner ? true : false}
                onClick={() => setShowBuyBUSDDlg(true)}
                startIcon={
                  <img className="mh-auto" src={doge} alt="avatar" style={{ width: '20px', height: '20px' }} />
                }
              >
                Buy in BUSD
              </Button>
            </ThemeProvider>
          </MarketModalRow>
        </div>
      </DialogContent>
      <IconButton aria-label="close" className="modal-close" onClick={props.onClose}>
        <CloseIcon />
      </IconButton>
      <BuyModal
        item={props.item}
        open={showBuyDlg}
        onClose={() => {
          setShowBuyDlg(false)
        }}
      />
      <BuyBUSDModal
        item={props.item}
        open={showBuyBUSDDlg}
        rate={rate}
        onClose={() => {
          setShowBuyBUSDDlg(false)
        }}
      />
      {/* {account === '' ?
                (<ConnectWalletModal onClose={handleClose} open={open} contents="Oops! You're not connected yet."/>) :
                ''
            } */}
    </Dialog>
  )
}

export default CardModal
