import React from "react"
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
import ModalNavLabel from 'components/Label/ModalnavLabel'
import ModalHeaderLabel from "components/Label/ModalHeaderLabel"
import ModalContent from "components/Label/ModalContent"
import PriceLayout from "components/Layout/PriceLayout"
import PriceHeaderLabel from "components/Label/PriceHeaderLabel"
import PriceLabel from "components/Label/PriceLabel"
import PriceDexLabel from "components/Label/PriceDexLabel"

const DialogContent = withStyles((theme) => ({
root: {
    padding: theme.spacing(2),
},
}))(MuiDialogContent);

interface Props {
    open: boolean
    color: string
    tokenId: string
    price: number
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
    return (
        <Dialog className="card-dialog" onClose={props.onClose} maxWidth="lg" aria-labelledby="customized-dialog-title" open={props.open} PaperProps={{ style: { borderRadius: 7 } }}>
            <DialogContent className="modal-card-content flex-row" dividers>
                <div className="expanded-card-img" style={{ background: props.color }} />
                <div className="expanded-card-content">
                    <ModalNavLabel>ArcadeDoge Skin</ModalNavLabel>
                    <MarketModalRow>
                        <ModalHeaderLabel>Skin #{props.tokenId}</ModalHeaderLabel>
                    </MarketModalRow>
                    <MarketModalRow>
                        <ModalContent>Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de normandie goat squirty cheese danish fontina red leicester. <br />Cauliflower cheese cheeseburger.</ModalContent>
                    </MarketModalRow>
                    <MarketModalRow>
                        <PriceLayout>
                            <PriceHeaderLabel>Current Price</PriceHeaderLabel>
                            <div className="price-row">
                                <div className="price-sector">
                                    <img className="mr-5 mh-auto" src={avatar} alt="avatar" style={{width: '30px', height: '30px'}}/>
                                    <PriceLabel>{props.price}</PriceLabel>
                                    <PriceDexLabel>(US$15.00)</PriceDexLabel>
                                </div>
                                <div className="price-sector">
                                    <img className="mr-5 mh-auto" src={doge} alt="avatar" style={{width: '30px', height: '30px'}}/>
                                    <PriceLabel>9</PriceLabel>
                                    <PriceDexLabel>(US$15.00)</PriceDexLabel>
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
                            startIcon={<img className="mh-auto" src={avatar} alt="avatar" style={{width: '20px', height: '20px'}} />}>
                            Buy in ArcadeDoge
                        </Button>
                        <Button
                            className="ml-15 modal-buy-usd-btn"
                            variant="contained"
                            color="secondary"
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
        </Dialog>
    )
}

export default CardModal