import React, { memo } from 'react'
import {
  Button,
  Hidden
} from '@material-ui/core'

import MenuItem from './menuItem'
import SubMenu from './subMenu'

import { makeStyles } from '@material-ui/core'
import { ReactComponent as Astronaut } from 'assets/img/astronaut.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'


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

const NavBarMenu = () => {

  const classes = useStyles()

  const onConnectWalletHandler = () => {
    console.log('Connect Wallet')
  }
  const onPlayGameHandler = () => {
    console.log('Play Game')
  }

  return (
    <Hidden smDown>
      <div className={classes.root}>
        <div className = "menu">
            <MenuItem text="How to Play" />
            <MenuItem text="Community" />
            <SubMenu text="ArcadeMarket" />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={onConnectWalletHandler}
          startIcon={<Wallet />}>
          Connect Wallet
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onPlayGameHandler}
          startIcon={<Astronaut />}>
          Play Game
        </Button>
      </div>
    </Hidden>
  )
}

export default memo(NavBarMenu)