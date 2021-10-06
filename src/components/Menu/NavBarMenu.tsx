import React, { memo } from 'react'
import {
  Button,
  Hidden
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1)
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
        <Button
          variant="contained"
          color="primary"
          onClick={onConnectWalletHandler}>
          Connect Wallet
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onPlayGameHandler}>
          Play Game
        </Button>
      </div>
    </Hidden>
  )
}

export default memo(NavBarMenu)