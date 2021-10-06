import React from "react"
import { useHistory } from 'react-router-dom'
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
  const history = useHistory()
  const classes = useStyles()

  const onClickViewListing = () => {
    history.push('/listing')
  }

  const onClickSellItem = () => {
    history.push('/sell')
  }

  return (
    <div className="right">
      <ThemeProvider theme={marketTheme}>
        <div className={`${classes.root} market-header-action`}>
          <Button
            className="mg-8 market-listing-btn"
            variant="contained"
            color="primary"
            onClick={onClickViewListing}
            startIcon={<Storefront />}>
            View Your Listings
          </Button>
          <Button
            className="mg-8 market-customizing-btn"
            variant="contained"
            color="secondary"
            onClick={onClickSellItem}
            startIcon={<Sell />}>
            Sell Customized Item
          </Button>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default MarketHeader