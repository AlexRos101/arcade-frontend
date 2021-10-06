import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {
    Typography,
    Button,
    Hidden
  } from '@material-ui/core'

import { store, useGlobalState } from 'state-pool'
import { connect } from 'global/wallet'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import * as Wallet from '../../global/wallet'
import ERC721 from '../../contracts/ERC721.json'
import EXCHANGE from '../../contracts/EXCHANGE.json'
import * as API from '../../hooks/api'

const DialogContent = withStyles((theme) => ({
root: {
    padding: theme.spacing(2),
},
}))(MuiDialogContent);
    

interface Props {
    item: any
    open: boolean
    onClose: () => void
}


const ListSellModal: React.FC<Props> = (props) =>{
    const [account, setAccount] = useGlobalState('account')
    const [isLoading, setIsLoading] = useGlobalState('isLoading')
    const [showConnectWalletModal, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')
    const [firstStepClassName, setFirstStepClassName] = useState('item')
    const [secondStepClassName, setSecondStepClassName] = useState('item-disabled')
    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        if (props.item == selectedItem) return
        setSelectedItem(props.item)
        refresh()
    })

    const refresh = async () => {
        setIsLoading(true);

        if (!await (Wallet.isConnected())) {
            setIsLoading(false)
            return
        }

        const provider = await Wallet.getCurrentProvider()

        const web3 = new Web3(provider)
        const NFT = new web3.eth.Contract(ERC721 as AbiItem[], process.env.REACT_APP_NFT_ADDRESS)

        NFT.methods.getApproved(props.item.token_id).call()
        .then((res: any) => {
            if (res == process.env.REACT_APP_EXCHANGE_ADDRESS) {
                setIsLoading(false);
                setFirstStepClassName('item-processed');
                setSecondStepClassName('item');
            } else {
                setIsLoading(false);
                setFirstStepClassName('item');
                setSecondStepClassName('item-disabled');
            }
        })
        .catch((err: any) => {
            setIsLoading(false);
            setFirstStepClassName('item');
            setSecondStepClassName('item-disabled');
        })
    }

    const approve = async() => {
        setIsLoading(true);

        if (!await (Wallet.isConnected())) {
            setIsLoading(false)
            setShowConnectWalletModal(true)
            return
        }

        const provider = await Wallet.getCurrentProvider()

        const web3 = new Web3(provider)
        const NFT = new web3.eth.Contract(ERC721 as AbiItem[], process.env.REACT_APP_NFT_ADDRESS)

        NFT.methods.approve(process.env.REACT_APP_EXCHANGE_ADDRESS, props.item.token_id).send({from: account})
        .then((res: any) => {
            setIsLoading(false);
            setFirstStepClassName('item-processed');
            setSecondStepClassName('item');
        })
        .catch((err: any) => {
            setIsLoading(false);
            setFirstStepClassName('item');
            setSecondStepClassName('item-disabled');
        })
    }

    const sellRequest = async () => {
        setIsLoading(true);

        if (!await (Wallet.isConnected())) {
            setIsLoading(false)
            setShowConnectWalletModal(true)
            return
        }

        const provider = await Wallet.getCurrentProvider()

        const web3 = new Web3(provider)
        const exchange = new web3.eth.Contract(EXCHANGE as AbiItem[], process.env.REACT_APP_EXCHANGE_ADDRESS)

        exchange.methods.SellRequest(
            props.item.contract_address, 
            props.item.token_id,
            Web3.utils.toWei(props.item.arcadedoge_price + '', 'ether')).send({from: account})
        .then((res: any) => {
            const checkDBStatus = async () => {
                const item = (await API.getItemById(props.item.id)).data
                if (item.is_visible) {
                    document.location.reload()
                } else {
                    setTimeout(checkDBStatus, 500)
                }
            }

            checkDBStatus()
        })
        .catch((err: any) => {
            setIsLoading(false);
        })
    }
      
    return (
        <Dialog className="card-dialog" onClose={props.onClose} maxWidth="sm" aria-labelledby="customized-dialog-title" open={props.open} PaperProps={{ style: { borderRadius: 7 } }}>
            <DialogContent className="modal-order-content" dividers>
                <div {...props} style={{padding: '2vh 0'}}>
                    <p className="approval-header" style={{}}>List {props.item.name} on Market</p>

                    <div className={firstStepClassName}>
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
                                    disabled={firstStepClassName == 'item-processed'? true: false}
                                    onClick={approve}>
                                    <Typography variant="subtitle1">
                                        Approve
                                    </Typography>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={secondStepClassName}>
                        <div className="item-disabler" />
                        <div className='item-connect' />
                        <div className='flex-row r-flex-row step-item mw-auto' style={{width:'fit-content'}}>
                            <div className='circle-number mr-15'>
                                <p style={{padding: '7px 0px', width: 'fit-content'}}>2</p>
                            </div>
                            <div className='mr-15'>
                                <p id="header">List</p>
                                <p id="content">List on market</p>
                            </div>
                            <div style={{marginLeft:'auto'}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={sellRequest}>
                                    <Typography variant="subtitle1">
                                        List
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

export default ListSellModal