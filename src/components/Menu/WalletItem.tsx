import React from 'react'
import { useGlobalState } from 'state-pool'
import WltSwitchButton from 'components/Button/WltSwitchButton'
import { useArcadeContext } from 'hooks/useArcadeContext'

interface Props {
  image: any
  text: string
  connected: boolean
  walletType: number
}

const WalletItem: React.FC<Props> = (props) => {

  const { connectWallet, disconnectWallet } = useArcadeContext()
  const [, setOpenConnectWalletMenu] = useGlobalState('openConnectWalletMenu')
  
  const switchHandler = async () => {
    if (props.connected === false) {
      await connectWallet(props.walletType)
    } else {
      disconnectWallet()
    }
    setOpenConnectWalletMenu(false)
  }

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