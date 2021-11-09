import React from 'react'
import RowLabel from 'components/Label/RowLabel'
import { withStyles } from '@material-ui/core/styles'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import { Typography, Button, Hidden } from '@material-ui/core'

import { useGlobalState } from 'state-pool'
import * as WalletUtils from '../../global/wallet'
import * as CONST from 'global/const'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

interface Props {
  contents: string
}

const ConnectWalletModal: React.FC<Props> = (props) => {
  const [account, setAccount] = useGlobalState('account')
  const [showConnectWalletModal, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')
  const [, setOpenConnectWalletMenu] = useGlobalState('openConnectWalletMenu')

  const onConnectWalletHandler = async () => {
    setShowConnectWalletModal(false)
    setOpenConnectWalletMenu(true)
  }

  const onWalletConnectHandler = async () => {
    await WalletUtils.connect(CONST.WALLET_TYPE.WALLETCONNECT);
    initAddress()
  }

  const initAddress = async () => {
    const address = await WalletUtils.getCurrentWallet()
    if (address !== account) setAccount(address === null ? '' : address)
  }

  return (
    <Dialog
      className="card-dialog"
      maxWidth="sm"
      onClose={() => setShowConnectWalletModal(false)}
      aria-labelledby="customized-dialog-title"
      open={showConnectWalletModal}
      PaperProps={{ style: { borderRadius: 7 } }}
    >
      <DialogContent className="modal-wallet-content" dividers>
        <div {...props}>
          <div className="mw-auto mb-5" style={{ width: 'fit-content', maxWidth: 'max-content' }}>
            <IframeLogo id="connectLogo" />
          </div>
          <RowLabel style={{ textAlign: 'center' }}>{props.contents}</RowLabel>
          <div className="mw-auto mt-5" style={{ width: 'fit-content', maxWidth: 'max-content' }}>
            <Hidden xsDown>
              <Button variant="contained" color="primary" onClick={onConnectWalletHandler} startIcon={<Wallet />}>
                <Typography variant="subtitle1">Connect Wallet</Typography>
              </Button>
            </Hidden>
            <Hidden smUp>
              <Button variant="contained" color="primary" onClick={onWalletConnectHandler} startIcon={<Wallet />}>
                <Typography variant="subtitle1">Connect Wallet</Typography>
              </Button>
            </Hidden>
            
          </div>
        </div>
      </DialogContent>
      <IconButton aria-label="close" className="modal-close" onClick={() => setShowConnectWalletModal(false)}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default ConnectWalletModal
