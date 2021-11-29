import React, { useEffect, useState, useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import { Typography, Button } from '@material-ui/core'
import axios from 'axios'
import Web3 from 'web3'
import * as Wallet from '../../global/wallet'
import * as API from '../../hooks/api'

import { GameItem } from 'global/interface'
import { useArcadeDoge, useExchange } from 'hooks/useContract'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useAppDispatch } from 'state'
import { setConnectWallet, setIsLoading } from 'state/show'
import { arcadeAlert } from 'utils/arcadealert'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

interface Props {
  item: GameItem
  open: boolean
  onClose: () => void
}

const BuyModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { account, web3 } = useArcadeContext()
  const arcadeDoge = useArcadeDoge()
  const exchange = useExchange()

  const [firstStepClassName, setFirstStepClassName] = useState('item')
  const [secondStepClassName, setSecondStepClassName] = useState('item-disabled')
  const [selectedItem, setSelectedItem] = useState<GameItem>({ id: -1, name: '', token_id: 0 })

  const refresh = useCallback(async () => {
    if (!account) return
    if (!(await Wallet.isConnected())) {
      dispatch(setIsLoading(false))
      return
    }

    arcadeDoge.methods
      .allowance(account, process.env.REACT_APP_EXCHANGE_ADDRESS)
      .call()
      .then((res: string) => {
        if (Number.parseFloat(Web3.utils.fromWei(res)) >= Number(props.item.arcadedoge_price)) {
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
  }, [account, props.item.arcadedoge_price, dispatch, arcadeDoge])

  useEffect(() => {
    if (props.item === selectedItem) return
    setSelectedItem(props.item)
    refresh()
  }, [props.item, selectedItem, refresh])

  const approve = async () => {
    if (web3 === undefined) return

    dispatch(setIsLoading(true))

    if (!(await Wallet.isConnected())) {
      dispatch(setIsLoading(false))
      dispatch(setConnectWallet(true))
      return
    }

    arcadeDoge.methods
      .approve(process.env.REACT_APP_EXCHANGE_ADDRESS, Web3.utils.toWei(props.item.arcadedoge_price + '', 'ether'))
      .send({ from: account })
      .then((res: any) => {
        dispatch(setIsLoading(false))
        setFirstStepClassName('item-processed')
        setSecondStepClassName('item')
      })
      .catch((err: any) => {
        console.log(err)
        dispatch(setIsLoading(false))
        setFirstStepClassName('item')
        setSecondStepClassName('item-disabled')
      })
  }

  const buy = async () => {
    if (web3 === undefined) return
    dispatch(setIsLoading(true))

    if (!(await Wallet.isConnected())) {
      dispatch(setIsLoading(false))
      dispatch(setConnectWallet(true))
      return
    }

    let gasData: any = null
    try {
      gasData = await axios.get(process.env.REACT_APP_GAS_URL as string);

      if (gasData.data !== undefined) {
        gasData = gasData.data;
      }
    } catch (err) {
        console.log(err);
        arcadeAlert("Get Gas value failed!")
        return;
    }

    exchange.methods
      .exchange(
        props.item.contract_address,
        props.item.token_id,
        props.item.owner,
        Web3.utils.toWei(props.item.arcadedoge_price + '', 'ether'),
        account,
      )
      .estimateGas({ from: account })
      .then(async (gasAmount: any) => { 
        exchange.methods
        .exchange(
          props.item.contract_address,
          props.item.token_id,
          props.item.owner,
          Web3.utils.toWei(props.item.arcadedoge_price + '', 'ether'),
          account,
        )
        .send({ from: account, gas: gasAmount, gasPrice: parseInt(gasData.result, 16).toString() })
        .then((res: any) => {
          const checkDBStatus = async () => {
            const item = (await API.getItemById(props.item.id)).data
            if (account && item.owner === Web3.utils.toChecksumAddress(account)) {
              window.location.href = '/listing'
            } else {
              setTimeout(checkDBStatus, 500)
            }
          }

          checkDBStatus()
        })
        .catch((err: any) => {
          dispatch(setIsLoading(false))
        })
      })
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
            Buy {props.item.name} on Market
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
                  <p id="content">Approve your Arcade token</p>
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
                  <p id="content">Buy item with Arcade</p>
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }} className="mh-auto r-mw-auto r-mt-5">
                <Button variant="contained" color="primary" onClick={buy}>
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

export default BuyModal
