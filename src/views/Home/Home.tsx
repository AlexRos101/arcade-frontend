import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Typography,
  Button
} from '@material-ui/core'
import Page from 'components/Layout/Page'

import { makeStyles } from '@material-ui/core'
import {ReactComponent as AstronautBuy} from 'assets/img/astronautbuy.svg'
import ShoppingCart from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const Home: React.FC = () => {
    const history = useHistory()

    const onClickButton = () => {
        console.log("asdf")
    }

    const onClickBuyArcadeDoges = () => {
      history.push('/market')
    }

    return (
      <Page>
        <div className="iframe-template">
          <iframe />
          <div className="rect rect-1" />
          <div className="rect rect-2" />
          <div className="rect rect-3" />
          <div className="rect rect-4" />
          <div className="rect rect-5" />
          <div className="rect rect-6" />
          <div className="rect rect-7" />
          <div className="rect rect-8" />
          <div className="rect rect-9" />
          <div className="rect rect-10" />
          <div className="rect rect-11" />
          <div className="rect rect-12" />
        </div>
        <div className="flex-row row">
          <Button
            className="mg-8"
            variant="contained"
            color="secondary"
            onClick={onClickBuyArcadeDoges}
            startIcon={<AstronautBuy />}>
            <Typography variant="subtitle1">
              Buy ArcadeDoges
            </Typography>
          </Button>
          <Button
            className="mg-8"
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}>
            <Typography variant="subtitle1">
              Vend at ArcadeMarket
            </Typography>
          </Button>
        </div>
          
      </Page>
    )
    /* <Button
            variant="contained"
            color="secondary"
            startIcon={<AstronautBuy />}>
            Buy ArcadeDoges
            </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}>
            Vend at ArcadeMarket
            </Button> */
}

export default Home