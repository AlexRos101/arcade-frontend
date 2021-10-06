import React, { memo, useState } from 'react'
import {
  Typography,
  Button,
  Hidden
} from '@material-ui/core'

import MenuItem from './menuItem'
import SubMenu from './subMenu'

import { makeStyles } from '@material-ui/core'
import { ReactComponent as Astronaut } from 'assets/img/astronaut.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import RowLabel from 'components/Label/RowLabel'
import CloseIcon from '@material-ui/icons/Close'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  "@media (max-width: 600px)": {
    
  }
}))

const NavBarMenu = () => {

  const [hiddenMenu, setHiddenMenu] = useState('hidden-menu')
  const classes = useStyles()

  const onConnectWalletHandler = () => {
    console.log('Connect Wallet')
  }
  const onPlayGameHandler = () => {
    console.log('Play Game')
  }

  const onPressMenu = () => {
    setHiddenMenu('')
  }

  const onCloseMenu = () => {
    setHiddenMenu('hidden-menu')
  }

  return (
    <div>
      <Hidden smUp>
        <IconButton edge="start" className="menu-expand" color="inherit" aria-label="menu" onClick={onPressMenu}>
          <MenuIcon />
        </IconButton>
      </Hidden>
      <div className={`${classes.root} menu-inspect ${hiddenMenu}`}>
        <div className = "menu">
            <MenuItem text="How to Play" />
            <MenuItem text="Community" />
            <SubMenu text="ArcadeMarket" />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={onConnectWalletHandler}
          className="menu-btn"
          startIcon={<Wallet />}>
          <Typography variant="subtitle1">
            Connect Wallet
          </Typography>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onPlayGameHandler}
          className="menu-btn"
          startIcon={<Astronaut />}>
          <Typography variant="subtitle1">
            Play Game
          </Typography>
        </Button>
        <IconButton aria-label="close" className="menu-close" onClick={onCloseMenu}>
            <CloseIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default memo(NavBarMenu)