import React, { memo, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'

import { useGlobalState } from 'state-pool'
import * as WalletUtils from '../../global/wallet'

import MenuItem from './menuItem'
import SubMenu from './subMenu'

import { makeStyles } from '@material-ui/core'
import { ReactComponent as Astronaut } from 'assets/img/astronaut.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import SelectWalletModal from 'components/Modal/SelectWallet'

import { connect } from 'global/wallet'

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

  const [hiddenMenu, setHiddenMenu] = useState('hidden-menu')
  const classes = useStyles()

  const [account, setAccount] = useGlobalState('account')
  const [initialized, setInitialized] = useState(false)

  const onConnectWalletHandler = async () => {
    await connect()
    initAddress()
  }
  const onPlayGameHandler = useCallback(() => {
    history.push('/')
  }, [])

  const onPressMenu = useCallback(() => {
    setHiddenMenu('')
  }, [hiddenMenu])

  const onCloseMenu = useCallback(() => {
    setHiddenMenu('hidden-menu')
  }, [hiddenMenu])

  const shortenString = useCallback((source: string) => {
    if (source.length <= 12) return source

    return '********' + source.substring(source.length - 6, source.length)
  }, [])

  const initAddress = useCallback(async () => {
    const address = await WalletUtils.getCurrentWallet()
    if (await WalletUtils.isConnected()) {
      setAccount(address === null ? '' : address)
    } else {
      setAccount('')
    }
  }, [account])

  const onClickDiscussions = useCallback(() => {
    history.push('/discussion')
  }, [])

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    initAddress()

    if (window.ethereum !== undefined) {
      window.ethereum.on('accountsChanged', initAddress)
      window.ethereum.on('chainChanged', initAddress)
    }
  })

  return (
    <div>
      <IconButton edge="start" className="menu-expand" color="inherit" aria-label="menu" onClick={onPressMenu}>
        <MenuIcon />
      </IconButton>
      <div className={`${classes.root} menu-inspect ${hiddenMenu}`}>
        <div className="menu">
          <SubMenu text="Games" menuData={gameMenu} />
          <MenuItem text="Discussions" onClick={onClickDiscussions} />
          <SubMenu text="ArcadeMarket" menuData={marketMenu} />
        </div>
        {account === '' ? (
          <div style={{ position: 'relative' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onConnectWalletHandler}
              className="menu-btn"
              startIcon={<Wallet />}
            >
              <Typography variant="subtitle1">Connect Wallet</Typography>
            </Button>
            <SelectWalletModal open={false} />   
          </div>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={onConnectWalletHandler}
            className="menu-btn btn-note"
            startIcon={<Wallet />}
          >
            <Typography variant="subtitle1">{shortenString(account)}</Typography>
          </Button>
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
