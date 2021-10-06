import React from "react"
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

const useStyles = makeStyles({
    searchCardTitle: {
      color: '#9D9468'
    },
    searchCardBody: {
      color: '#433F2F'
    }
  })

const SearchBox = () => {
    const classes = useStyles()

    return (
        <OutlinedCard>
            <Typography
                gutterBottom
                variant="h3"
                component="div"
                className={classes.searchCardTitle}
            >
                Looking for something specific?
            </Typography>
            <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                className={classes.searchCardBody}
            >
                Try searching for it first before you create a discussion thread.
            </Typography>
            <TextField
                fullWidth
                placeholder="Search for Discussion"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                )
                }}
                variant="outlined"
            />
        </OutlinedCard>
)
}

export default SearchBox