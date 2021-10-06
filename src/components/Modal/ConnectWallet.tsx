import React from 'react'
import RowLabel from 'components/Label/RowLabel'
import { withStyles } from '@material-ui/core/styles'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import { createTheme, ThemeProvider  } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {
    Typography,
    Button,
    Hidden
  } from '@material-ui/core'

import { store, useGlobalState } from 'state-pool'
import { connect } from 'global/wallet'

const DialogContent = withStyles((theme) => ({
root: {
    padding: theme.spacing(2),
},
}))(MuiDialogContent);
    

interface Props {
    contents: string
}


const ConnectWalletModal: React.FC<Props> = (props) =>{
    const [account, setAccount] = useGlobalState('account')
    const [showConnectWalletModal, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')

    const onConnectWalletHandler = async () => {
        connect()
    }
      
    return (
        <Dialog className="card-dialog" maxWidth="sm" aria-labelledby="customized-dialog-title" open={showConnectWalletModal} PaperProps={{ style: { borderRadius: 7 } }}>
            <DialogContent className="modal-wallet-content" dividers>
                <div {...props}>
                    <div className='mw-auto mb-5' style={{width:'fit-content'}}>
                        <IframeLogo id="connectLogo" />
                    </div>
                    <RowLabel style={{textAlign: 'center',}}>{props.contents}</RowLabel>
                    <div className='mw-auto mt-5' style={{width:'fit-content'}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onConnectWalletHandler}
                            startIcon={<Wallet />}>
                            <Typography variant="subtitle1">
                                Connect Wallet
                            </Typography>
                        </Button>
                    </div>
                </div>
            </DialogContent>
            <IconButton aria-label="close" className="modal-close" onClick={() => window.location.href = "/"}>
                <CloseIcon />
            </IconButton>
        </Dialog>
    )
}

export default ConnectWalletModal