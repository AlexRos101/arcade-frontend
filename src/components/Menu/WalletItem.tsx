import React, { useContext } from 'react'
import { useGlobalState } from 'state-pool'
import WltSwitchButton from 'components/Button/WltSwitchButton'
import { ArcadeContext } from 'contexts/ArcadeContext'

interface Props {
  image: any
  text: string
  connected: boolean
  walletType: number
}

const WalletItem: React.FC<Props> = (props) => {

  const context = useContext(ArcadeContext)
  const [, setOpenConnectWalletMenu] = useGlobalState('openConnectWalletMenu')
  
  const switchHandler = async () => {
    if (props.connected === false) {
      await context?.connectWallet(props.walletType)
    } else {
      context?.disconnectWallet()
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