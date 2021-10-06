import React, { useState } from "react"
import {store, useGlobalState} from 'state-pool'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { createTheme, ThemeProvider  } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Button } from '@material-ui/core'
import avatar from 'assets/img/avatar.png'
import doge from 'assets/img/doge.svg'

import MarketModalRow from "./MarketModalRow"
import ModalNavLabel from 'views/Market/components/ModalnavLabel'
import ModalHeaderLabel from "views/Market/components/ModalHeaderLabel"
import ModalContent from "views/Market/components/ModalContent"
import PriceLayout from "components/Layout/PriceLayout"

import PriceHeaderLabel from "./PriceHeaderLabel"
import PriceLabel from "./PriceLabel"
import PriceDexLabel from "./PriceDexLabel"

import { AbiItem } from 'web3-utils'
import * as Wallet from '../../../global/wallet'
import EXCHANGE from '../../../contracts/EXCHANGE.json'
import Web3 from "web3"
import * as API from '../../../hooks/api'
import BuyModal from "components/Modal/Buy"

const DialogContent = withStyles((theme) => ({
root: {
    padding: theme.spacing(2),
},
}))(MuiDialogContent);

interface Item {
    id: number
    token_id: number
    name: string
    description: string
    arcadedoge_price: number
    owner: string
    contract_address: string
}

interface Props {
    open: boolean
    item: Item
    category: string
    onClose: () => void
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#FCBF4A',
        contrastText: '#7E5504',
      },
      secondary: {
        main: '#FFFEFB',
        contrastText: '#7E5504',
      },
    },
  });
  

const CardModal: React.FC<Props> = (props) => {
    const [account, setAccount] = useGlobalState('account')
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useGlobalState('isLoading')
    const [showConnectWalletModal, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')

    const handleClose = () => {
        setOpen(false)
      }

    const handleOpenModal = () => {
        if (account === '')
            setOpen(false)
        else
            setOpen(true)
    }

    const buy = async () => {
        setIsLoading(true)
        
        if (!await (Wallet.isConnected())) {
            setIsLoading(false)
            setShowConnectWalletModal(true)
            return
        }

        const provider = await Wallet.getCurrentProvider()
        const address = await Wallet.getCurrentWallet()

        const web3 = new Web3(provider)
        const exchange = new web3.eth.Contract(EXCHANGE as AbiItem[], process.env.REACT_APP_EXCHANGE_ADDRESS)

        exchange.methods.exchange(
            props.item.contract_address, 
            props.item.token_id,
            props.item.owner,
            Web3.utils.toWei(props.item.arcadedoge_price + '', 'ether'),
            account).send({from: address})
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
        <Dialog className="card-dialog" onClose={props.onClose} maxWidth="lg" aria-labelledby="customized-dialog-title" open={props.open} PaperProps={{ style: { borderRadius: 7 } }}>
            <DialogContent className="modal-card-content flex-row" dividers>
                <img className="expanded-card-img" src={`${process.env.REACT_APP_THUMBNAIL_NODE}${props.item.token_id}.png`} />
                <div className="expanded-card-content">
                    <ModalNavLabel>{props.category}</ModalNavLabel>
                    <MarketModalRow>
                        <ModalHeaderLabel>{props.item.name}</ModalHeaderLabel>
                    </MarketModalRow>
                    <MarketModalRow>
                        <ModalContent>{props.item.description}</ModalContent>
                    </MarketModalRow>
                    <MarketModalRow>
                        <PriceLayout>
                            <PriceHeaderLabel>Current Price</PriceHeaderLabel>
                            <div className="price-row">
                                <div className="price-sector">
                                    <img className="mr-5 mh-auto" src={avatar} alt="avatar" style={{width: '30px', height: '30px'}}/>
                                    <PriceLabel>{props.item.arcadedoge_price}</PriceLabel>
                                    {/* <PriceDexLabel>(US$15.00)</PriceDexLabel> */}
                                </div>
                                <div className="price-sector">
                                    <img className="mr-5 mh-auto" src={doge} alt="avatar" style={{width: '30px', height: '30px'}}/>
                                    <PriceLabel>{props.item.arcadedoge_price}</PriceLabel>
                                    {/* <PriceDexLabel>(US$15.00)</PriceDexLabel> */}
                                </div>
                            </div>
                        </PriceLayout>
                    </MarketModalRow>
                    <MarketModalRow>
                    <ThemeProvider theme={theme}>
                        <Button
                            className="modal-buy-arcade-btn"
                            variant="contained"
                            color="primary"
                            disabled={account == props.item.owner? true: false}
                            onClick={handleOpenModal}
                            startIcon={<img className="mh-auto" src={avatar} alt="avatar" style={{width: '20px', height: '20px'}} />}>
                            Buy in ArcadeDoge
                        </Button>
                        <Button
                            className="ml-15 modal-buy-usd-btn"
                            variant="contained"
                            color="secondary"
                            disabled={account == props.item.owner? true: false}
                            onClick={handleOpenModal}
                            startIcon={<img className="mh-auto" src={doge} alt="avatar" style={{width: '20px', height: '20px'}} />}>
                            Buy in BUSD
                        </Button>
                    </ThemeProvider>
                    </MarketModalRow>
                </div>
            </DialogContent>
            <IconButton aria-label="close" className="modal-close" onClick={props.onClose}>
                <CloseIcon />
            </IconButton>
            <BuyModal item={props.item} open={open} onClose={() => {setOpen(false)}}/>
            {/* {account === '' ?
                (<ConnectWalletModal onClose={handleClose} open={open} contents="Oops! You're not connected yet."/>) :
                ''
            } */}
            
        </Dialog>
    )
}

export default CardModal