import React, { useContext, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import { Typography, Button } from '@material-ui/core'

import { useGlobalState } from 'state-pool'
import * as Wallet from '../../global/wallet'
import * as API from '../../hooks/api'

import { GameItem } from 'global/interface'
import { ArcadeContext, ArcadeContextValue } from 'contexts/ArcadeContext'
import { useERC721, useExchange } from 'hooks/useContract'

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
  const { account, web3 } = useContext(ArcadeContext) as ArcadeContextValue
  const NFT = useERC721(web3, process.env.REACT_APP_NFT_ADDRESS as string)
  const EXCHANGE = useExchange(web3, process.env.REACT_APP_EXCHANGE_ADDRESS as string)
  const [, setIsLoading] = useGlobalState('isLoading')
  const [, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')
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
    setIsLoading(true)

    if (!(await Wallet.isConnected())) {
      setIsLoading(false)
      setShowConnectWalletModal(true)
      return
    }

    NFT.methods
      .freeze(process.env.REACT_APP_EXCHANGE_ADDRESS, props.item.token_id)
      .send({ from: account })
      .then((res: any) => {
        document.location.reload()
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const removeSellRequest = async () => {
    setIsLoading(true)

    if (!(await Wallet.isConnected())) {
      setIsLoading(false)
      setShowConnectWalletModal(true)
      return
    }

    EXCHANGE.methods
      .CancelSellRequest(props.item.contract_address, props.item.token_id)
      .send({ from: account })
      .then((res: any) => {
        const checkDBStatus = async () => {
          console.log('ddd')
          const item = (await API.getItemById(props.item.id)).data
          if (!item.is_visible) {
            setIsLoading(false)
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
        setIsLoading(false)
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
