import React, { useCallback } from 'react'
import { useGlobalState } from 'state-pool'
import WltSwitchButton from 'components/Button/WltSwitchButton'
import * as WalletUtils from '../../global/wallet'
import * as CONST from '../../global/const'

interface Props {
  image: any
  text: string
  connected: boolean
  walletType: number
}

const WalletItem: React.FC<Props> = (props) => {

  /* eslint-disable */

  const [account, setAccount] = useGlobalState('account')
  const [connectedWalletType, setConnectedWalletType] = useGlobalState('connectedWalletType')
  const [openConnectWalletMenu, setOpenConnectWalletMenu] = useGlobalState('openConnectWalletMenu')

  /* eslint-enable */

  const initAddress = useCallback(async () => {
    const address = await WalletUtils.getCurrentWallet()
    if (await WalletUtils.isConnected()) {
      setAccount(address === null ? '' : address)

      const walletType = WalletUtils.getWalletType()
      setConnectedWalletType(walletType)
    } else {
      setAccount('')
      setConnectedWalletType(CONST.WALLET_TYPE.NONE)
    }
  }, [setAccount, setConnectedWalletType])
  
  const switchHandler = useCallback(async () => {
    if (props.connected === false) {
      await WalletUtils.connect(props.walletType);
    } else {
      WalletUtils.disconnect();
    }
    await initAddress()
    setOpenConnectWalletMenu(false)
  }, [initAddress, props.connected, props.walletType, setOpenConnectWalletMenu])

  if (props.connected === false) {
    return (
      <div className="wallet-item flex-row r-flex-row">
        {props.image}
        <p>{props.text}</p>
        <WltSwitchButton value={props.connected} onChange={switchHandler} />
      </div>
    )
  } else {
    return (
      <div className="wallet-item flex-row r-flex-row wallet-enabled">
        {props.image}
        <p>{props.text}</p>
        <WltSwitchButton value={props.connected} onChange={switchHandler} />
      </div>
    )
  }
  
}

export default WalletItem