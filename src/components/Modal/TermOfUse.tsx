import React from "react"
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { createTheme, ThemeProvider  } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import RowLabel from 'components/Label/RowLabel'
import TextParam from 'components/Label/TextParam'
import { Button } from '@material-ui/core'
import { dialogTheme } from "styles/theme"


const DialogContent = withStyles((theme) => ({
root: {
    padding: theme.spacing(2),
},
}))(MuiDialogContent);

interface Props {
    open: boolean
    onClose: () => void
}
  

const TermOfUse: React.FC<Props> = (props) => {
    return (
        <Dialog className="card-dialog" onClose={props.onClose} maxWidth="lg" aria-labelledby="customized-dialog-title" open={props.open} PaperProps={{ style: { borderRadius: 7 } }}>
            <DialogContent className="modal-dialog-content" dividers>
                <RowLabel>Terms of Use</RowLabel>
                <div style={{marginTop: '20px', marginBottom: '20px',}}>
                    <TextParam>Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de normandie goat squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.</TextParam>
                    <TextParam>Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer <br />smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de normandie goat squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.</TextParam>
                    <TextParam>Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer <br />smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de <br />normandie goat squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.</TextParam>
                    <TextParam>Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de normandie goat squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.</TextParam>
                    <TextParam>Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de normandie goat squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.</TextParam>
                    <TextParam>Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer <br />smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de <br />normandie goat squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.</TextParam>
                    <TextParam>Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer <br />smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de <br />normandie goat squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.</TextParam>
                </div>
                <ThemeProvider theme={dialogTheme}>
                    <Button
                        className="modal-btn"
                        variant="contained"
                        color="primary"
                        onClick={props.onClose}>
                        Got it!
                    </Button>
                </ThemeProvider>
            </DialogContent>
            <IconButton aria-label="close" className="modal-close" onClick={props.onClose}>
                <CloseIcon />
            </IconButton>
        </Dialog>
    )
}

export default TermOfUse