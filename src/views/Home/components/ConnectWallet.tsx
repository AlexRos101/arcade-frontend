import React from 'react'
import RowLabel from 'components/Label/RowLabel'
import {ReactComponent as IframeLogo} from 'assets/img/iframelogo.svg'
import { ReactComponent as Wallet } from 'assets/img/wallet.svg'

import {store, useGlobalState} from 'state-pool'
import { connect } from 'global/wallet'

import {
    Typography,
    Button,
    Hidden
  } from '@material-ui/core'

const ConnectWallet: React.FC<React.HTMLAttributes<HTMLDivElement>>= ({ children, ...props }) =>{
    const [account, setAccount] = useGlobalState('account')

    const onConnectWalletHandler = async () => {
        setAccount(await connect())
    }
      
    return (
        <div {...props}>
            <div className='mw-auto mb-5' style={{width:'fit-content'}}>
                <IframeLogo id="connectLogo" />
            </div>
            <RowLabel style={{textAlign: 'center',}}>Connect wallet to start playing!</RowLabel>
            <div className='mw-auto mt-5' style={{width:'fit-content'}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onConnectWalletHandler}
                    startIcon={<Wallet />}>
                    <Typography variant="subtitle1">
                        Connect Wallet
                    </Typography>
                </Button>
            </div>
        </div>
    )
}

export default ConnectWallet