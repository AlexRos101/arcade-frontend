import React, { useEffect, useState, useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import { Typography, Button } from '@material-ui/core'
import Web3 from 'web3'
import * as Wallet from '../../global/wallet'
import * as API from '../../hooks/api'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { GameItem } from 'global/interface'
import MainLoading from 'components/MainLoading'
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

const ListSellModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { account, web3 } = useArcadeContext()
  const nft = useNFT()
  const exchange = useExchange()
  const [firstStepClassName, setFirstStepClassName] = useState('item')
  const [secondStepClassName, setSecondStepClassName] = useState('item-disabled')
  const [selectedItem, setSelectedItem] = useState<GameItem>({ id: -1, name: '', token_id: 0 })
  const [showLoading, setShowLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (web3 === undefined) return
    if (props.open) setShowLoading(true)

    if (!(await Wallet.isConnected())) {
      setShowLoading(false)
      return
    }

    nft.methods
      .getApproved(props.item.token_id)
      .call()
      .then((res: string) => {
        if (res === process.env.REACT_APP_EXCHANGE_ADDRESS) {
          setShowLoading(false)
          setFirstStepClassName('item-processed')
          setSecondStepClassName('item')
        } else {
          setShowLoading(false)
          setFirstStepClassName('item')
          setSecondStepClassName('item-disabled')
        }
      })
      .catch(() => {
        setShowLoading(false)
        setFirstStepClassName('item')
        setSecondStepClassName('item-disabled')
      })
  }, [props.item.token_id, props.open, nft, web3])

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

    nft.methods
      .approve(process.env.REACT_APP_EXCHANGE_ADDRESS, props.item.token_id)
      .send({ from: account })
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

  const sellRequest = async () => {
    if (web3 === undefined) return
    dispatch(setIsLoading(true))

    if (!(await Wallet.isConnected())) {
      dispatch(setIsLoading(false))
      dispatch(setConnectWallet(true))
      return
    }

    Wallet.sendTransaction( exchange.methods
      .SellRequest(
        props.item.contract_address,
        props.item.token_id,
        Web3.utils.toWei(props.item.arcadedoge_price + '', 'ether'),
      ), account)
      .then((res: any) => {
        const checkDBStatus = async () => {
          const res = await API.getItemById(props.item.id)
          if (!res.result) {
            setTimeout(checkDBStatus, 500)
            return
          }
          const item = res.data
          if (item.is_visible) {
            document.location.reload()
          } else {
            setTimeout(checkDBStatus, 500)
          }
        }

        checkDBStatus()
      })
      .catch((err: any) => {
        console.log(err)
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
      <MainLoading show={showLoading} />
      <DialogContent className="modal-order-content" dividers>
        <div {...props} style={{ padding: '2vh 0' }}>
          <p className="approval-header" style={{}}>
            List {props.item.name} on Market
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
                  <p id="content">Approve your nft token</p>
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
                  <p id="header">List</p>
                  <p id="content">List on market</p>
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }} className="mh-auto r-mw-auto r-mt-5">
                <Button variant="contained" color="primary" onClick={sellRequest}>
                  <Typography variant="subtitle1">List</Typography>
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

export default ListSellModal
