import React from 'react'
import RowLabel from 'components/Label/RowLabel'
import { withStyles } from '@material-ui/core/styles'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import { Typography, Button } from '@material-ui/core'

import { useAppDispatch } from 'state'
import { setWalletMenu, setConnectWallet } from 'state/show'
import { useShow } from 'state/show/hook'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

interface Props {
  contents: string
}

const ConnectWalletModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { connWallet } =  useShow()

  const onConnectWalletHandler = async () => {
    dispatch(setConnectWallet(false))
    dispatch(setWalletMenu(true))
  }

  return (
    <Dialog
      className="card-dialog"
      maxWidth="xs"
      onClose={() => dispatch(setConnectWallet(false))}
      aria-labelledby="customized-dialog-title"
      open={connWallet}
      PaperProps={{ style: { borderRadius: 7 } }}
    >
      <DialogContent className="modal-wallet-content" dividers>
        <div {...props}>
          <div className="mw-auto mb-5" style={{ width: 'fit-content', maxWidth: 'max-content' }}>
            <IframeLogo id="connectLogo" />
          </div>
          <RowLabel style={{ textAlign: 'center' }}>{props.contents}</RowLabel>
          <div className="mw-auto mt-5" style={{ width: 'fit-content', maxWidth: 'max-content' }}>
            <Button variant="contained" color="primary" onClick={onConnectWalletHandler} startIcon={<Wallet />}>
              <Typography variant="subtitle1">Connect Wallet</Typography>
            </Button>
          </div>
        </div>
      </DialogContent>
      <IconButton aria-label="close" className="modal-close" onClick={() => dispatch(setConnectWallet(false))}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default ConnectWalletModal
