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
import * as WalletUtils from '../../global/wallet'

const DialogContent = withStyles((theme) => ({
root: {
    padding: theme.spacing(2),
},
}))(MuiDialogContent);
    

interface Props {
    open: boolean
    onClose: () => void
    title: string
}


const OrderApprovalModal: React.FC<Props> = (props) =>{
    const [account, setAccount] = useGlobalState('account')

    const onConnectWalletHandler = async () => {
        connect()
        initAddress()
    }

    const initAddress = async () => {
        const address = await WalletUtils.getCurrentWallet()
        if (address != account)
        setAccount(address == null? '': address)
    }
      
    return (
        <Dialog className="card-dialog" onClose={props.onClose} maxWidth="sm" aria-labelledby="customized-dialog-title" open={props.open} PaperProps={{ style: { borderRadius: 7 } }}>
            <DialogContent className="modal-order-content" dividers>
                <div {...props} style={{padding: '2vh 0'}}>
                    <p className="approval-header" style={{textAlign: 'center', maxWidth: '300px'}}>Complete your Order of {props.title}</p>

                    <div className="item-processed">
                        <div className="item-disabler" />
                        <div className='flex-row r-flex-row mt-5 step-item mw-auto' style={{width:'fit-content'}}>
                            <div className='circle-number mr-15'>
                                <p style={{padding: '7px 0px', width: 'fit-content'}}>1</p>
                            </div>
                            <div className='mr-15'>
                                <p id="header">Approve</p>
                                <p id="content">Approve your nft token</p>
                            </div>
                            <div style={{marginLeft:'auto'}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onConnectWalletHandler}>
                                    <Typography variant="subtitle1">
                                        Approve
                                    </Typography>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="item-disabled">
                        <div className="item-disabler" />
                        <div className='item-connect' />
                        <div className='flex-row r-flex-row step-item mw-auto' style={{width:'fit-content'}}>
                            <div className='circle-number mr-15'>
                                <p style={{padding: '7px 0px', width: 'fit-content'}}>2</p>
                            </div>
                            <div className='mr-15'>
                                <p id="header">Order</p>
                                <p id="content">Send nft order</p>
                            </div>
                            <div style={{marginLeft:'auto'}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onConnectWalletHandler}>
                                    <Typography variant="subtitle1">
                                        Start Ordering
                                    </Typography>
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

export default OrderApprovalModal