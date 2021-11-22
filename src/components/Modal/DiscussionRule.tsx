import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import { ThemeProvider } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import RowLabel from 'components/Label/RowLabel'
import TextParam from 'components/Label/TextParam'
import { Button } from '@material-ui/core'
import { dialogTheme } from 'styles/theme'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

interface Props {
  open: boolean
  onClose: () => void
}

const DiscussionRule: React.FC<Props> = (props) => {
  return (
    <Dialog
      className="card-dialog"
      onClose={props.onClose}
      maxWidth="lg"
      aria-labelledby="customized-dialog-title"
      open={props.open}
      PaperProps={{ style: { borderRadius: 7 } }}
    >
      <DialogTitle className="modal-dialog-title">
        <RowLabel>Arcade Discussions Rules & Regulations</RowLabel>
      </DialogTitle>
      <DialogContent className="modal-dialog-content" dividers>
        <div>
          <TextParam>
            Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer smelly cheese
            jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de normandie goat squirty
            cheese danish fontina red leicester. Cauliflower cheese cheeseburger.
          </TextParam>
          <TextParam>
            Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer <br />
            smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de normandie goat
            squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.
          </TextParam>
          <TextParam>
            Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer <br />
            smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de <br />
            normandie goat squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.
          </TextParam>
          <TextParam>
            Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer smelly cheese
            jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de normandie goat squirty
            cheese danish fontina red leicester. Cauliflower cheese cheeseburger.
          </TextParam>
          <TextParam>
            Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer smelly cheese
            jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de normandie goat squirty
            cheese danish fontina red leicester. Cauliflower cheese cheeseburger.
          </TextParam>
          <TextParam>
            Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer <br />
            smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de <br />
            normandie goat squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.
          </TextParam>
          <TextParam>
            Cottage cheese taleggio mascarpone. Cheesy feet chalk and cheese everyone loves paneer <br />
            smelly cheese jarlsberg blue castello feta. Hard cheese fromage frais port-salut camembert de <br />
            normandie goat squirty cheese danish fontina red leicester. Cauliflower cheese cheeseburger.
          </TextParam>
        </div>
      </DialogContent>
      <DialogActions className="modal-dialog-action">
        <ThemeProvider theme={dialogTheme}>
          <Button className="modal-btn" variant="contained" color="primary" onClick={props.onClose}>
            Got it!
          </Button>
        </ThemeProvider>
      </DialogActions>
      <IconButton aria-label="close" className="modal-close" onClick={props.onClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default DiscussionRule
