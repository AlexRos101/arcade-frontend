import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import { Typography, Button } from '@material-ui/core'

import * as Wallet from '../../global/wallet'
import * as API from '../../hooks/api'

import { GameItem } from 'global/interface'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useNFT, useExchange } from 'hooks/useContract'
import { useAppDispatch } from 'state'
import { setConnectWallet, setIsLoading } from 'state/show'

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

const RemoveSellModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { account, web3 } = useArcadeContext()
  const nft = useNFT()
  const exchange = useExchange()
  const [firstStepClassName, setFirstStepClassName] = useState('item')
  const [secondStepClassName, setSecondStepClassName] = useState('item-disabled')
  const [selectedItem, setSelectedItem] = useState<GameItem>({ id: -1, name: '', token_id: 0 })

  useEffect(() => {
    if (props.item === selectedItem) return
    setSelectedItem(props.item)
    refresh()
  }, [props.item, selectedItem])

  const refresh = async () => {
    setFirstStepClassName('item')
    setSecondStepClassName('item-disabled')
  }

  const freeze = async () => {
    if (web3 === undefined) return
    dispatch(setIsLoading(true))

    if (!(await Wallet.isConnected())) {
      dispatch(setIsLoading(false))
      dispatch(setConnectWallet(true))
      return
    }

    nft.methods
      .freeze(process.env.REACT_APP_EXCHANGE_ADDRESS, props.item.token_id)
      .send({ from: account })
      .then((res: any) => {
        document.location.reload()
      })
      .catch(() => {
        dispatch(setIsLoading(false))
      })
  }

  const removeSellRequest = async () => {
    dispatch(setIsLoading(true))

    if (!(await Wallet.isConnected())) {
      dispatch(setIsLoading(false))
      dispatch(setConnectWallet(true))
      return
    }

    exchange.methods
      .CancelSellRequest(props.item.contract_address, props.item.token_id)
      .send({ from: account })
      .then((res: any) => {
        const checkDBStatus = async () => {
          console.log('ddd')
          const item = (await API.getItemById(props.item.id)).data
          if (!item.is_visible) {
            dispatch(setIsLoading(false))
            setFirstStepClassName('item-processed')
            setSecondStepClassName('item')
          } else {
            setTimeout(checkDBStatus, 500)
          }
        }

        checkDBStatus()
        console.log('ccc')
      })
      .catch((err: any) => {
        dispatch(setIsLoading(false))
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
            Remove {props.item.name} from Market
          </p>

          <div className={firstStepClassName}>
            <div className="item-disabler" />
            <div className="flex-row r-flex-row mt-5 step-item mw-auto" style={{ width: 'fit-content' }}>
              <div className="flex-row r-flex-row">
                <div className="circle-number mr-15">
                  <p style={{ padding: '7px 0px', width: 'fit-content' }}>1</p>
                </div>
                <div className="mr-15">
                  <p id="header">Remove</p>
                  <p id="content">Remove from Market</p>
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }} className="mh-auto r-mw-auto r-mt-5">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={firstStepClassName === 'item-processed' ? true : false}
                  onClick={removeSellRequest}
                >
                  <Typography variant="subtitle1">Remove</Typography>
                </Button>
              </div>
            </div>
          </div>

          <div className={secondStepClassName}>
            <div className="item-disabler" />
            <div className="item-connect" />
            <div className="flex-row r-flex-row step-item mw-auto" style={{ width: 'fit-content' }}>
              <div className="flex-row r-flex-row">
                <div className="circle-number mr-15">
                  <p style={{ padding: '7px 0px', width: 'fit-content' }}>2</p>
                </div>
                <div className="mr-15">
                  <p id="header">Freeze</p>
                  <p id="content">Freeze your nft token</p>
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }} className="mh-auto r-mw-auto r-mt-5">
                <Button variant="contained" color="primary" onClick={freeze}>
                  <Typography variant="subtitle1">Freeze</Typography>
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

export default RemoveSellModal
