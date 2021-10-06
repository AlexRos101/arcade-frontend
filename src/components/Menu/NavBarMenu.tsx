import React, { memo, useState, Suspense, lazy, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Typography,
  Button,
  Hidden
} from '@material-ui/core'

import {store, useGlobalState} from 'state-pool'
import * as WalletUtils from '../../global/wallet'

import MenuItem from './menuItem'
import SubMenu from './subMenu'

import { makeStyles } from '@material-ui/core'
import { ReactComponent as Astronaut } from 'assets/img/astronaut.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import RowLabel from 'components/Label/RowLabel'
import CloseIcon from '@material-ui/icons/Close'

import { connect } from 'global/wallet'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  "@media (max-width: 1080px)": {
    
  }
}))

const gameMenu = [
  {
    content: 'MargsDoge',
    href: '/',
    label: 'Hot Releases'
  },
]

const marketMenu = [
  {
    content: 'MargsDoge',
    href: '/market/doge',
    label: 'Hot Releases'
  },
]

declare let window: any

const NavBarMenu = () => {

  const history = useHistory()

  const [hiddenMenu, setHiddenMenu] = useState('hidden-menu')
  const classes = useStyles()

  const [account, setAccount] = useGlobalState('account')
  const [isLoading, setIsLoading] = useGlobalState('isLoading')
  const [initialized, setInitialized] = useState(false)

  const onConnectWalletHandler = async () => {
    await connect()
    initAddress()
  }
  const onPlayGameHandler = () => {
    history.push('/')
  }

  const onPressMenu = () => {
    setHiddenMenu('')
  }

  const onCloseMenu = () => {
    setHiddenMenu('hidden-menu')
  }

  const shortenString = (source: string) => {
    if (source.length <= 12)
      return source
    
    return '********' + source.substring(source.length - 6, source.length)
  }

  const initAddress = async () => {
    const address = await WalletUtils.getCurrentWallet()
    if (address != account)
    setAccount(address == null? '': address)
  }

  const onClickDiscussions = () => {
    history.push('/discussion')
  }

  const walletChanged = (accounts: any) => {
    const address = accounts[0]
    setAccount(address == null? '': address)
  }

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    initAddress()

    if (window.ethereum != null) {
      window.ethereum.on('accountsChanged', walletChanged)
    }
  })

  return (
    <div>
      <IconButton edge="start" className="menu-expand" color="inherit" aria-label="menu" onClick={onPressMenu}>
        <MenuIcon />
      </IconButton>
      <div className={`${classes.root} menu-inspect ${hiddenMenu}`}>
        <div className = "menu">
            <SubMenu text="Games" menuData={gameMenu}/>
            <MenuItem text="Discussions" onClick={onClickDiscussions}/>
            <SubMenu text="ArcadeMarket" menuData={marketMenu}/>
        </div>
        { account === '' ?
          (<Button
            variant="contained"
            color="primary"
            onClick={onConnectWalletHandler}
            className="menu-btn"
            startIcon={<Wallet />}>
            <Typography variant="subtitle1">
              Connect Wallet
            </Typography>
          </Button>) :
          (<Button
            variant="outlined"
            color="primary"
            onClick={onConnectWalletHandler}
            className="menu-btn btn-note"
            startIcon={<Wallet />}>
            <Typography variant="subtitle1">
              {shortenString(account)}
            </Typography>
          </Button>)
        }
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