import React from 'react'
import WltSwitchButton from 'components/Button/WltSwitchButton'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { setWalletMenu } from 'state/show'
import { useAppDispatch } from 'state'
import swal from 'sweetalert'

interface Props {
  image: any
  text: string
  connected: boolean
  walletType: number
}

const WalletItem: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { connectWallet, disconnectWallet, web3 } = useArcadeContext()
  
  const switchHandler = async () => {
    if (props.connected === false) {
      if (web3.givenProvider !== null && web3.givenProvider.isMetaMask === true) {
        await connectWallet(props.walletType)
      } else {
        swal('Oops! Metamask is not installed. Please install metamask.')
      }
      
    } else {
      disconnectWallet()
    }
    dispatch(setWalletMenu(false))
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