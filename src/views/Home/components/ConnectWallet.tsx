import React from 'react'
import RowLabel from 'components/Label/RowLabel'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'

import { useGlobalState } from 'state-pool'
import * as WalletUtils from '../../../global/wallet'
import * as CONST from 'global/const'

import { Typography, Button, Hidden } from '@material-ui/core'

const ConnectWallet: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const [account, setAccount] = useGlobalState('account')

  /* eslint-disable */

  const [openConnectWalletMenu, setOpenConnectWalletMenu] = useGlobalState('openConnectWalletMenu')

  /* eslint-enable */

  const onConnectWalletHandler = async () => {
    // connect()
    // initAddress()
    setOpenConnectWalletMenu(true)
  }

  const onWalletConnctHandler = async () => {
    await WalletUtils.connect(CONST.WALLET_TYPE.WALLETCONNECT);
    initAddress()
  }

  const initAddress = async () => {
    const address = await WalletUtils.getCurrentWallet()
    if (address !== account) setAccount(address === null ? '' : address)
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
          <Button variant="contained" color="primary" onClick={onWalletConnctHandler} startIcon={<Wallet />}>
            <Typography variant="subtitle1">Connect Wallet{children}</Typography>
          </Button>
        </Hidden>
      </div>
    </div>
  )
}

export default ConnectWallet
