import React from "react"
import styled from 'styled-components'
import Storefront from '@material-ui/icons/Storefront'
import { Button } from '@material-ui/core'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'

import { marketTheme } from 'styles/theme'
import { ReactComponent as Sell } from "assets/img/sell.svg"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const MarketHeader = () => {
  const classes = useStyles()

  return (
    <div className="right">
      <ThemeProvider theme={marketTheme}>
        <div className={classes.root}>
          <Button
            className="mg-8 market-listing-btn"
            variant="contained"
            color="primary"
            startIcon={<Storefront />}>
            View Your Listings
          </Button>
          <Button
            className="mg-8 market-customizing-btn"
            variant="contained"
            color="secondary"
            startIcon={<Sell />}>
            Sell Customized Item
          </Button>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default MarketHeader