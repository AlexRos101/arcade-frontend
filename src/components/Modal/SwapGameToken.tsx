import React, { useEffect, useState, useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import { Typography, Button } from '@material-ui/core'
import BigNumber from 'bignumber.js'
import { arcadeAlert } from 'utils/arcadealert'
import Web3 from 'web3'
import * as Wallet from '../../global/wallet'
import { Token } from 'global/interface'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useArcadeDoge, useSwap } from 'hooks/useContract'
import { useAppDispatch } from 'state'
import { setConnectWallet, setIsLoading } from 'state/show'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

interface Props {
  open: boolean
  rate: number
  amount: BigNumber
  inputCoin?: Token
  outputCoin?: Token
  onClose: () => void
}

const SwapGameToken: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { account, web3 } = useArcadeContext()
  const arcadeDoge = useArcadeDoge()
  const swap = useSwap()
  const [firstStepClassName, setFirstStepClassName] = useState('item')
  const [secondStepClassName, setSecondStepClassName] = useState('item-disabled')

  const refresh = useCallback(async () => {
    // dispatch(setIsLoading(true));
    if (!account) {
      dispatch(setIsLoading(false))
      return
    }

    if (props.inputCoin && props.inputCoin?.tokenName !== "$ARC") {
      setFirstStepClassName('item-processed')
      setSecondStepClassName('item')
      return
    }

    arcadeDoge.methods
      .allowance(account, process.env.REACT_APP_SWAP_ADDRESS)
      .call()
      .then((res: string) => {
        if (props.amount.minus(parseFloat(web3.utils.fromWei(res))).toNumber() <= 0) {
          // dispatch(setIsLoading(false));
          setFirstStepClassName('item-processed')
          setSecondStepClassName('item')
        } else {
          // dispatch(setIsLoading(false));
          setFirstStepClassName('item')
          setSecondStepClassName('item-disabled')
        }
      })
      .catch(() => {
        // dispatch(setIsLoading(false));
        setFirstStepClassName('item')
        setSecondStepClassName('item-disabled')
      })
  }, [account, props.amount, props.inputCoin, dispatch, arcadeDoge, web3]) 

  useEffect(() => {
    refresh()
  }, [props.inputCoin, props.open, refresh])

  const approve = async () => {
    dispatch(setIsLoading(true))

    if (!(await Wallet.isConnected())) {
      dispatch(setIsLoading(false))
      dispatch(setConnectWallet(true))
      return
    }

    Wallet.sendTransaction(
    arcadeDoge.methods
      .approve(
        process.env.REACT_APP_SWAP_ADDRESS,
        Web3.utils.toWei(props.amount.toString() + '', 'ether'),
      ), account)
      .then((res: any) => {
        dispatch(setIsLoading(false))
        setFirstStepClassName('item-processed')
        setSecondStepClassName('item')
      })
      .catch((err: any) => {
        dispatch(setIsLoading(false))
        setFirstStepClassName('item')
        setSecondStepClassName('item-disabled')
      })
  }

  const buyGamePoint = async () => {
    dispatch(setIsLoading(true))

    if (!(await Wallet.isConnected())) {
      dispatch(setIsLoading(false))
      dispatch(setConnectWallet(true))
      return
    }

    Wallet.sendTransaction(
    swap.methods
      .buyGamePoint(
        1,
        Web3.utils.toWei(
          props.amount.toString() + '',
          'ether',
        )
      ), account)
      .then(() => {
        arcadeAlert("StarShards successfully exchanged!")
        dispatch(setIsLoading(false))
        props.onClose()
      })
      .catch(() => {
        arcadeAlert("Buy Game Point failed!")
        dispatch(setIsLoading(false))
      })
  }

  const onBuy = () => {
    if (props.inputCoin?.tokenName === "$ARC") {
      buyGamePoint()
    }
  }

  return (
    <Dialog
      className="card-dialog"
      onClose={props.onClose}
      maxWidth="sm"
      aria-labelledby="customized-dialog-title"
      open={props.open}
      PaperProps={{ style: { borderRadius: 7 } }}
    >
      <DialogContent className="modal-order-content" dividers>
        <div {...props} style={{ padding: '2vh 0' }}>
          <p className="approval-header" style={{ textAlign: 'center', maxWidth: '300px' }}>
            Swap $ARC to STARSHARD Token
          </p>

          <div className={firstStepClassName}>
            <div className="item-disabler" />
            <div className="flex-row mt-5 step-item mw-auto" style={{ width: 'fit-content' }}>
              <div className="flex-row r-flex-row">
                <div className="circle-number mr-15">
                  <p style={{ padding: '7px 0px', width: 'fit-content' }}>1</p>
                </div>
                <div className="mr-15">
                  <p id="header">Approve</p>
                  <p id="content">Approve your $ARC token</p>
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }} className="mh-auto r-mw-auto r-mt-5">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={firstStepClassName === 'item-processed' ? true : false}
                  onClick={approve}
                >
                  <Typography variant="subtitle1">Approve</Typography>
                </Button>
              </div>
            </div>
          </div>

          <div className={secondStepClassName}>
            <div className="item-disabler" />
            <div className="item-connect" />
            <div className="flex-row step-item mw-auto" style={{ width: 'fit-content' }}>
              <div className="flex-row r-flex-row">
                <div className="circle-number mr-15">
                  <p style={{ padding: '7px 0px', width: 'fit-content' }}>2</p>
                </div>
                <div className="mr-15">
                  <p id="header">Buy</p>
                  <p id="content">Buy STARSHARD with $ARC</p>
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }} className="mh-auto r-mw-auto r-mt-5">
                <Button variant="contained" color="primary" onClick={onBuy}>
                  <Typography variant="subtitle1">Buy</Typography>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <IconButton aria-label="close" className="modal-close" onClick={props.onClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default SwapGameToken
