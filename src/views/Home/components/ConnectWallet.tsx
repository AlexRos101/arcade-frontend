import React from 'react'
import RowLabel from 'components/Label/RowLabel'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'

import { useGlobalState } from 'state-pool'
import * as CONST from 'global/const'

import { Typography, Button, Hidden } from '@material-ui/core'
import { useArcadeContext } from 'hooks/useArcadeContext'

const ConnectWallet: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const context = useArcadeContext()
  const [, setOpenConnectWalletMenu] = useGlobalState('openConnectWalletMenu')

  const onConnectWalletHandler = async () => {
    setOpenConnectWalletMenu(true)
  }

  const onWalletConnectHandler = async () => {
    connectWallet(CONST.WALLET_TYPE.WALLETCONNECT)
  }

  return (
    <div {...props}>
      <div className="mw-auto mb-5" style={{ width: 'fit-content', maxWidth: 'max-content' }}>
        <IframeLogo id="connectLogo" />
      </div>
      <RowLabel style={{ textAlign: 'center' }}>Connect wallet to start playing!</RowLabel>
      <div className="mw-auto mt-5" style={{ width: 'fit-content', maxWidth: 'max-content' }}>
        <Hidden xsDown>
          <Button variant="contained" color="primary" onClick={onConnectWalletHandler} startIcon={<Wallet />}>
            <Typography variant="subtitle1">Connect Wallet{children}</Typography>
          </Button>
        </Hidden>
        <Hidden smUp>
          <Button variant="contained" color="primary" onClick={onWalletConnectHandler} startIcon={<Wallet />}>
            <Typography variant="subtitle1">Connect Wallet{children}</Typography>
          </Button>
        </Hidden>
      </div>
    </div>
  )
}

export default ConnectWallet
