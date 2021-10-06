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
import ERC20 from '../../contracts/ERC20.json'
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


const BuyModal: React.FC<Props> = (props) =>{
    const [account, setAccount] = useGlobalState('account')
    const [isLoading, setIsLoading] = useGlobalState('isLoading')
    const [showConnectWalletModal, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')
    const [firstStepClassName, setFirstStepClassName] = useState('item')
    const [secondStepClassName, setSecondStepClassName] = useState('item-disabled')
    const [selectedItem, setSelectedItem] = useState(null)

    const onConnectWalletHandler = async () => {
        connect()
    }

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
        const ARCADEDOGE = new web3.eth.Contract(ERC20 as AbiItem[], process.env.REACT_APP_ARCADEDOGE_ADDRESS)

        ARCADEDOGE.methods.allowance(account, process.env.REACT_APP_EXCHANGE_ADDRESS).call()
        .then((res: any) => {
            if (Number.parseFloat(web3.utils.fromWei(res)) >= props.item.arcadedoge_price) {
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
        const ARCADEDOGE = new web3.eth.Contract(ERC20 as AbiItem[], process.env.REACT_APP_ARCADEDOGE_ADDRESS)

        ARCADEDOGE.methods.approve(
            process.env.REACT_APP_EXCHANGE_ADDRESS, 
            Web3.utils.toWei(props.item.arcadedoge_price + '', 'ether')).send({from: account})
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

    const buy = async () => {
        setIsLoading(true);

        if (!await (Wallet.isConnected())) {
            setIsLoading(false)
            setShowConnectWalletModal(true)
            return
        }

        const provider = await Wallet.getCurrentProvider()

        const web3 = new Web3(provider)
        const exchange = new web3.eth.Contract(EXCHANGE as AbiItem[], process.env.REACT_APP_EXCHANGE_ADDRESS)

        exchange.methods.exchange(
            props.item.contract_address, 
            props.item.token_id,
            props.item.owner,
            Web3.utils.toWei(props.item.arcadedoge_price + '', 'ether'),
            account).send({from: account})
        .then((res: any) => {
            const checkDBStatus = async () => {
                const item = (await API.getItemById(props.item.id)).data
                if (item.owner == account) {
                    window.location.href="/listing"
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
                    <p className="approval-header" style={{textAlign: 'center', maxWidth: '300px'}}>Buy {props.item.name} on Market</p>

                    <div className={firstStepClassName}>
                        <div className="item-disabler" />
                        <div className='flex-row r-flex-row mt-5 step-item mw-auto' style={{width:'fit-content'}}>
                            <div className='circle-number mr-15'>
                                <p style={{padding: '7px 0px', width: 'fit-content'}}>1</p>
                            </div>
                            <div className='mr-15'>
                                <p id="header">Approve</p>
                                <p id="content">Approve your ArcadeDoge token</p>
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
                                <p id="header">Buy</p>
                                <p id="content">Buy item with Arcadedoge</p>
                            </div>
                            <div style={{marginLeft:'auto'}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={buy}>
                                    <Typography variant="subtitle1">
                                        Buy
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

export default BuyModal