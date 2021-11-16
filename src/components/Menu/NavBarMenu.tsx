import React, { memo, useContext, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Button, Hidden } from '@material-ui/core'

import { useGlobalState } from 'state-pool'
import * as WalletUtils from '../../global/wallet'
import * as CONST from '../../global/const'

import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

import { makeStyles } from '@material-ui/core'
import { ReactComponent as Astronaut } from 'assets/img/astronaut.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import SelectWalletModal from 'components/Modal/SelectWallet'
import { ArcadeContext } from 'contexts/ArcadeContext'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  '@media (max-width: 1080px)': {},
}))

const gameMenu = [
  {
    content: 'MargsDoge',
    href: '/',
    label: 'Hot Releases',
  },
]

const marketMenu = [
  {
    content: 'MargsDoge',
    href: '/market/doge',
    label: 'Hot Releases',
  },
]

/* eslint-disable */

declare let window: any

/* eslint-enable */

const NavBarMenu = () => {
  const history = useHistory()

  const [hiddenMenu, setHiddenMenu] = useGlobalState('hiddenMenu')
  const classes = useStyles()

  const context = useContext(ArcadeContext)
  const [openConnectWalletMenu, setOpenConnectWalletMenu] = useGlobalState('openConnectWalletMenu')
  const [initialized, setInitialized] = useState(false)

  const onConnectWalletHandler = async () => {
    // await connect()
    // initAddress()
    setOpenConnectWalletMenu(true)
  }

  const onWalletConnectHandler = async () => {
    await WalletUtils.connect(CONST.WALLET_TYPE.WALLETCONNECT);
  }

  const onDisconnectHandler = () => {
    WalletUtils.disconnect()
  }

  const onPlayGameHandler = useCallback(() => {
    setHiddenMenu('hidden-menu')
    history.push('/')
  }, [history, setHiddenMenu])

  const onPressMenu = useCallback(() => {
    setHiddenMenu('')
  }, [setHiddenMenu])

  const onCloseMenu = useCallback(() => {
    setHiddenMenu('hidden-menu')
  }, [setHiddenMenu])

  const shortenString = useCallback((source: string) => {
    if (source.length <= 12) return source

    return '********' + source.substring(source.length - 6, source.length)
  }, [])

  const onClickDiscussions = useCallback(() => {
    setHiddenMenu('hidden-menu')
    history.push('/discussion')
  }, [history, setHiddenMenu])

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    if (window.ethereum !== undefined) {
      window.ethereum.on('accountsChanged', context?.updateConnect)
      window.ethereum.on('chainChanged', context?.updateConnect)
    }
  }, [initialized, context?.updateConnect])

  return (
    <div>
      <IconButton edge="start" className="menu-expand" color="inherit" aria-label="menu" onClick={onPressMenu}>
        <MenuIcon />
      </IconButton>
      <div className={`menu-back ${hiddenMenu}`} onClick={onCloseMenu}/>
      <div className={`${classes.root} menu-inspect ${hiddenMenu}`}>
        <div className="menu">
          <SubMenu text="Games" menuData={gameMenu} />
          <MenuItem text="Discussions" onClick={onClickDiscussions} />
          <SubMenu text="ArcadeMarket" menuData={marketMenu} />
        </div>
        {context?.account === '' || context?.account === undefined ? (
          <div style={{ position: 'relative', }} className="r-wd-100">
            <Hidden xsDown>
              <Button
                variant="contained"
                color="primary"
                onClick={onConnectWalletHandler}
                className="menu-btn"
                startIcon={<Wallet />}
              >
                <Typography variant="subtitle1">Connect Wallet</Typography>
              </Button>
              <SelectWalletModal open={openConnectWalletMenu} connectedWallet={Number(context?.connectType)}/>
            </Hidden>
            <Hidden smUp>
              <Button
                variant="contained"
                color="primary"
                onClick={onWalletConnectHandler}
                className="menu-btn"
                startIcon={<Wallet />}
              >
                <Typography variant="subtitle1">Connect Wallet</Typography>
              </Button>
            </Hidden> 
          </div> ) : (
          <div style={{ position: 'relative' }} className="r-wd-100">
            <Hidden xsDown>
              <Button
                variant="outlined"
                color="primary"
                onClick={onConnectWalletHandler}
                className="menu-btn btn-note"
                startIcon={<Wallet />}
              >
                <Typography variant="subtitle1">{shortenString(context?.account)}</Typography>
              </Button>
              <SelectWalletModal open={openConnectWalletMenu} connectedWallet={context.connectType}/>
            </Hidden>
            <Hidden smUp>
              <Button
                variant="outlined"
                color="primary"
                onClick={onDisconnectHandler}
                className="menu-btn btn-note"
                startIcon={<Wallet />}
              >
                <Typography variant="subtitle1">{shortenString(context?.account)}</Typography>
              </Button>
            </Hidden>
          </div>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={onPlayGameHandler}
          className="menu-btn"
          startIcon={<Astronaut />}
        >
          <Typography variant="subtitle1">Play Game</Typography>
        </Button>
        <IconButton aria-label="close" className="menu-close" onClick={onCloseMenu}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default memo(NavBarMenu)
