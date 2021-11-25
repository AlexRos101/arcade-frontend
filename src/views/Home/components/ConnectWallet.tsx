import React from 'react'
import RowLabel from 'components/Label/RowLabel'
import { ReactComponent as IframeLogo } from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'

import { Typography, Button, Hidden } from '@material-ui/core'
import { setWalletMenu } from 'state/show'
import { useAppDispatch } from 'state'

const ConnectWallet: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const dispatch = useAppDispatch()

  const onConnectWalletHandler = async () => {
    dispatch(setWalletMenu(true))
  }

  return (
    <div {...props}>
      <div className="mw-auto mb-5" style={{ width: 'fit-content', maxWidth: 'max-content' }}>
        <IframeLogo id="connectLogo" />
      </div>
      <RowLabel style={{ textAlign: 'center' }}>Connect wallet to start playing!</RowLabel>
      <div className="mw-auto mt-5" style={{ width: 'fit-content', maxWidth: 'max-content' }}>
        <Button variant="contained" color="primary" onClick={onConnectWalletHandler} startIcon={<Wallet />}>
          <Typography variant="subtitle1">Connect Wallet{children}</Typography>
        </Button>
      </div>
    </div>
  )
}

export default ConnectWallet
