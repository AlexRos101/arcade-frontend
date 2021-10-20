import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Storefront from '@material-ui/icons/Storefront'
import { Button } from '@material-ui/core'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import { marketTheme } from 'styles/theme'
import { ReactComponent as Sell } from 'assets/img/sell.svg'
import { useGlobalState } from 'state-pool'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const MarketHeader: React.FC = () => {
  const history = useHistory()
  const classes = useStyles()
  const [account] = useGlobalState('account')

  const onClickViewListing = () => {
    history.push('/listing')
  }

  const onClickSellItem = () => {
    history.push('/sell')
  }

  useEffect(() => {
    console.log(account)
  })

  return (
    <div className="right">
      <ThemeProvider theme={marketTheme}>
        <div className={`${classes.root} market-header-action`}>
          { account !== '' && (<Button
            className=""
            variant="outlined"
            color="primary"
            onClick={onClickViewListing}
            startIcon={<Storefront />}
          >
            View Your Listings
          </Button>)
          }
          <Button variant="contained" color="secondary" onClick={onClickSellItem} startIcon={<Sell />}>
            Sell Customized Item
          </Button>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default MarketHeader
