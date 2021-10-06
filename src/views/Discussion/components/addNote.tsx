import React, { useState } from "react"
import { useHistory } from 'react-router-dom'
import {store, useGlobalState} from 'state-pool'

import {
    Button,
    Grid,
    ThemeProvider,
    TextField,
    Typography,
    InputAdornment
} from '@material-ui/core'

import {
    makeStyles
} from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'
import { OutlinedCard } from 'components/Card'
import DiscussionRule from "components/Modal/DiscussionRule"

const useStyles = makeStyles({
    searchCardTitle: {
      color: '#9D9468'
    },
    searchCardBody: {
      color: '#433F2F'
    }
  })

const AddNote = () => {
    const history = useHistory()
    const classes = useStyles()

    const [openRule, setOpenRule] = useGlobalState('openDiscussionRule')

    const handleClose = () => {
        setOpenRule(false)
    }

    const handleOpenRules = () => {
        setOpenRule(true)
    }

    return (
        <OutlinedCard className="outlined-card">
            <Typography
                gutterBottom
                variant="h3"
                component="div"
                className={classes.searchCardTitle}
            >
                Keep discussions safe!
            </Typography>
            <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                className={classes.searchCardBody}
            >
                By posting a discussion thread, you agree to the <a href="#" onClick={handleOpenRules} className={classes.searchCardBody}>ArcadeDoge Discussion Rules & Regulation.</a>
            </Typography>
            <DiscussionRule onClose={handleClose} open={openRule} />
        </OutlinedCard>
)
}

export default AddNote