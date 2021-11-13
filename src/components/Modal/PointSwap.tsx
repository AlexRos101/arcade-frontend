import React, { useCallback, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import { ThemeProvider } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import RowLabel from 'components/Label/RowLabel'
import { dialogTheme } from 'styles/theme'
import Wallet from 'assets/img/wallet.svg'
import IconLabel from 'components/Label/IconLabel'
import SwitchLabel from 'components/Label/SwitchLabel'
import SwapGameToken from './SwapGameToken'
import ARCADE from 'assets/img/avatar.png'
import STARSHARD from 'assets/img/starshard.png'
import Switch from 'assets/img/switch.svg'
import SwapItem from 'components/Item/SwapItem'
import { Token } from 'global/interface'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

interface Props {
  open: boolean
  onClose: () => void
}

const PointSwap: React.FC<Props> = (props) => {
  const [inputCoin, setInputCoin] = useState<Token>()
  const [outputCoin, setOutputCoin] = useState<Token>()
  const [swapRate, setSwapRate] = useState(0.0)
  const [openSwapToken, setOpenSwapToken] = useState(false)

  const onSwitchToken = useCallback(() => {
    const input = outputCoin, output = inputCoin, rate = 1.1
    setInputCoin(input)
    setOutputCoin(output)

    // get Swap Rate here.
    setSwapRate(rate)
  }, [setInputCoin, setOutputCoin, setSwapRate, inputCoin, outputCoin])

  const onConvert = () => {
    setOpenSwapToken(true)
  }

  useEffect(() => {
    setInputCoin({
      tokenAvartar: ARCADE,
      tokenName: '$ARCADE',
      tokenFullName: 'ArcadeDoge'
    })

    setOutputCoin({
      tokenAvartar: STARSHARD,
      tokenName: 'STARSHARD',
      tokenFullName: 'StarShard'
    })

    setSwapRate(1.1)
  }, [setInputCoin, setOutputCoin, setSwapRate])

  return (
    <Dialog
      className="card-dialog"
      onClose={props.onClose}
      maxWidth="md"
      aria-labelledby="customized-dialog-title"
      open={props.open}
      PaperProps={{ style: { borderRadius: 7 } }}
    >
      <DialogTitle className="swap-modal-title modal-dialog-title">
        <div className="flex-row">
          <RowLabel>Convert Tokens</RowLabel>
          <div className="flex-row r-flex-row r-mt-px-15" style={{ marginLeft: 'auto' }}>
            <IconLabel
              avatar={Wallet}
              label="Balance"
              avatarWidth="25"
              avatarHeight="25"
              fontSize="16px"
              fontColor="#7E5504"
              style={{ color: '#7E5504', marginRight: '8px' }}
              />
            <SwitchLabel
              avatar={ARCADE}
              label="499"
              avatarWidth="17"
              avatarHeight="17"
              fontSize="14px"
              fontColor="#7E5504"
              style={{ color: '#7E5504', marginRight: '4px' }}
              />
            <SwitchLabel
              avatar={STARSHARD}
              label="220"
              avatarWidth="17"
              avatarHeight="17"
              fontSize="14px"
              fontColor="#7E5504"
              style={{ color: '#7E5504', marginRight: '4px' }}
              />
          </div>
        </div>
      </DialogTitle>
      <DialogContent className="swap-modal-content" dividers>
        <div>
          <SwapItem
            avatar={inputCoin?.tokenAvartar}
            label={inputCoin?.tokenFullName}
            avatarWidth="30"
            avatarHeight="30"
            fontSize="28px"
            fontColor="#22303D"
            isInput={true}
            coinName={inputCoin?.tokenName}
            />

          <IconLabel
            avatar={Switch}
            label="Switch"
            avatarWidth="24"
            avatarHeight="24"
            fontSize="13px"
            style={{ color: '#B7B091', marginRight: '0', marginTop: '20px', marginBottom: '20px', marginLeft: '3px', width: 'fit-content' }}
            onClick={onSwitchToken}
            className="switch-link"
            />
          <SwapItem
            avatar={outputCoin?.tokenAvartar}
            label={outputCoin?.tokenFullName}
            avatarWidth="30"
            avatarHeight="30"
            fontSize="28px"
            fontColor="#22303D"
            isInput={false}    
            coinName={outputCoin?.tokenName}
            coinValue="000"
            />
        </div>
      </DialogContent>
      <DialogActions className="modal-dialog-action pt-20">
        <div className="flex-row display-inline">
          <ThemeProvider theme={dialogTheme}>
            <Button className="modal-btn r-mb-px-15" variant="contained" color="primary" onClick={onConvert} style={{ float: "right" }}>
              Convert
            </Button>
          </ThemeProvider>
          <p className="swap-footer-label">{inputCoin?.tokenName} to {outputCoin?.tokenName} Conversion is 1:{swapRate}</p>
        </div>
      </DialogActions>
      <IconButton aria-label="close" className="modal-close" onClick={props.onClose}>
        <CloseIcon />
      </IconButton>
      <SwapGameToken
        open={openSwapToken}
        rate={swapRate}
        onClose={() => {
          setOpenSwapToken(false)
        }}
      />
    </Dialog>
  )
}

export default PointSwap
