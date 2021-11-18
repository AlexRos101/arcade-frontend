import React, { useEffect, useState, useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import { Typography, Button } from '@material-ui/core'
import BigNumber from 'bignumber.js'
import Swal from 'sweetalert'
import { useGlobalState } from 'state-pool'
import Web3 from 'web3'
import * as Wallet from '../../global/wallet'
import { Token } from 'global/interface'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useArcadeDoge, useSwap } from 'hooks/useContract'

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
  const { account, web3 } = useArcadeContext()
  const arcadeDoge = useArcadeDoge()
  const swap = useSwap()
  const [, setIsLoading] = useGlobalState('isLoading')
  const [, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')
  const [firstStepClassName, setFirstStepClassName] = useState('item')
  const [secondStepClassName, setSecondStepClassName] = useState('item-disabled')

  const refresh = useCallback(async () => {
    // setIsLoading(true);
    if (!(await Wallet.isConnected())) {
      setIsLoading(false)
      return
    }

    if (props.inputCoin !== undefined && props.inputCoin?.tokenName !== "$arcadeDoge") {
      setFirstStepClassName('item-processed')
      setSecondStepClassName('item')
      return
    }

    arcadeDoge.methods
      .allowance(account, process.env.REACT_APP_SWAP_ADDRESS)
      .call()
      .then((res: string) => {
        if (props.amount.minus(parseFloat(web3.utils.fromWei(res))).toNumber() <= 0) {
          // setIsLoading(false);
          setFirstStepClassName('item-processed')
          setSecondStepClassName('item')
        } else {
          // setIsLoading(false);
          setFirstStepClassName('item')
          setSecondStepClassName('item-disabled')
        }
      })
      .catch(() => {
        // setIsLoading(false);
        setFirstStepClassName('item')
        setSecondStepClassName('item-disabled')
      })
  }, [account, props.amount, props.inputCoin, setIsLoading, arcadeDoge, web3]) 

  useEffect(() => {
    refresh()
  }, [props.inputCoin, props.open, refresh])

  const approve = async () => {
    setIsLoading(true)

    if (!(await Wallet.isConnected())) {
      setIsLoading(false)
      setShowConnectWalletModal(true)
      return
    }

    arcadeDoge.methods
      .approve(
        process.env.REACT_APP_SWAP_ADDRESS,
        Web3.utils.toWei(props.amount.toString() + '', 'ether'),
      )
      .send({ from: account })
      .then((res: any) => {
        setIsLoading(false)
        setFirstStepClassName('item-processed')
        setSecondStepClassName('item')
      })
      .catch((err: any) => {
        setIsLoading(false)
        setFirstStepClassName('item')
        setSecondStepClassName('item-disabled')
      })
  }

  const buyGamePoint = async () => {
    setIsLoading(true)

    if (!(await Wallet.isConnected())) {
      setIsLoading(false)
      setShowConnectWalletModal(true)
      return
    }

    swap.methods
      .buyGamePoint(
        1,
        Web3.utils.toWei(
          props.amount.toString() + '',
          'ether',
        )
      )
      .send({ from: account })
      .then(() => {
        Swal("Game Point bought successfully!")
        setIsLoading(false)
        props.onClose()
      })
      .catch(() => {
        Swal("Buy Game Point failed!")
        setIsLoading(false)
      })
  }

  const onBuy = () => {
    if (props.inputCoin?.tokenName === "$arcadeDoge") {
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
            Swap $arcadeDoge to STARSHARD Token
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
                  <p id="content">Approve your $arcadeDoge token</p>
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
                  <p id="content">Buy STARSHARD with $arcadeDoge</p>
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
