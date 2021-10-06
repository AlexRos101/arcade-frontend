import React from "react"


import Storefront from '@material-ui/icons/Storefront'

import {
    Button
  } from '@material-ui/core'

  
import { createTheme, ThemeProvider  } from '@material-ui/core/styles'
import { ReactComponent as Sell } from "assets/img/sell.svg"

const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFCED',
        contrastText: '#308D7B',
      },
      secondary: {
        main: '#30C5A8',
        contrastText: '#FFFCED',
      },
    },
  });

const MarketHeader = () => {
    return (
        <div className="right">
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </div>
    )
}

export default MarketHeader