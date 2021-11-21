import React, { memo } from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Logo from '../Logo'
import NavBarMenu from './NavBarMenu'
import { useCommonStyles } from '../../styles/use-styles'

import { ReactComponent as Wallet } from 'assets/img/wallet.svg'
import * as CONST from 'global/const'
import { useArcadeContext } from 'hooks/useArcadeContext'

const useStyles = makeStyles(() => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFFDF4',
    boxShadow: '0px 4px 21px rgba(0, 0, 0, 0.08)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const Menu = () => {
  const classes = useStyles()
  const commonClasses = useCommonStyles()
  const { connectWallet } = useArcadeContext()

  const onConnectWalletHandler = async () => {
    connectWallet(CONST.WALLET_TYPE.WALLETCONNECT)
  }

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar className={clsx(classes.toolbar, commonClasses.containerWidth)}>
        <Wallet className="wallet-cage" onClick={onConnectWalletHandler} />
        <div className={classes.container}>
          <Logo />
        </div>
        <div className={classes.container}>
          <NavBarMenu />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default memo(Menu)
