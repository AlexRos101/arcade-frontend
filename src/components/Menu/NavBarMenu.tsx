import React, { memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Button, Hidden } from '@material-ui/core'

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
import { useArcadeContext } from 'hooks/useArcadeContext'
import { setWalletMenu, setHiddenMenu } from 'state/show'
import { useShow } from 'state/show/hook'
import { useAppDispatch } from 'state'

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
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const { account, updateConnect, connectType, connectWallet } = useArcadeContext()
  const { walletMenu, hiddenMenu } = useShow()
  const [initialized, setInitialized] = useState(false)

  const onConnectWalletHandler = async () => {
    dispatch(setWalletMenu(true))
  }

  const onWalletConnectHandler = async () => {
    dispatch(connectWallet(CONST.WALLET_TYPE.WALLETCONNECT))
  }

  const onDisconnectHandler = () => {
    WalletUtils.disconnect()
  }

  const onPlayGameHandler = useCallback(() => {
    dispatch(setHiddenMenu('hidden-menu'))
    history.push('/')
  }, [history, dispatch])

  const onPressMenu = useCallback(() => {
    dispatch(setHiddenMenu(''))
  }, [dispatch])

  const onCloseMenu = useCallback(() => {
    dispatch(setHiddenMenu('hidden-menu'))
  }, [dispatch])

  const shortenString = useCallback((source: string) => {
    if (source.length <= 12) return source

    return '********' + source.substring(source.length - 6, source.length)
  }, [])

  const onClickDiscussions = useCallback(() => {
    dispatch(setHiddenMenu('hidden-menu'))
    history.push('/discussion')
  }, [history, dispatch])

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    if (window.ethereum !== undefined) {
      window.ethereum.on('accountsChanged', updateConnect)
      window.ethereum.on('chainChanged', updateConnect)
    }
  }, [initialized, updateConnect])

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
        { !account ? (
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
              <SelectWalletModal open={walletMenu} connectedWallet={Number(connectType)}/>
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
                <Typography variant="subtitle1">{shortenString(account)}</Typography>
              </Button>
              <SelectWalletModal open={walletMenu} connectedWallet={connectType}/>
            </Hidden>
            <Hidden smUp>
              <Button
                variant="outlined"
                color="primary"
                onClick={onDisconnectHandler}
                className="menu-btn btn-note"
                startIcon={<Wallet />}
              >
                <Typography variant="subtitle1">{shortenString(account)}</Typography>
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
