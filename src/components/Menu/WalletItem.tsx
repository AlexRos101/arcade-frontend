import React from 'react'
import WltSwitchButton from 'components/Button/WltSwitchButton'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { setWalletMenu } from 'state/show'
import { useAppDispatch } from 'state'
import swal from 'sweetalert'
import * as CONST from 'global/const'

declare let window: any

interface Props {
  image: any
  text: string
  connected: boolean
  walletType: number
  disabled: boolean
}

const WalletItem: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { connectWallet, disconnectWallet, web3 } = useArcadeContext()
  
  const switchHandler = async () => {
    if (props.disabled === true) return
    if (props.connected === false) {
      if (window.ethereum || props.walletType === CONST.WALLET_TYPE.WALLETCONNECT) {
        await connectWallet(props.walletType)
      } else {
        swal('Oops! Metamask is not installed. Please install metamask.')
      }
      
    } else {
      disconnectWallet()
    }
    dispatch(setWalletMenu(false))
  }
  if (props.disabled === true) {
    return (
      <div className="wallet-item flex-row r-flex-row wallet-disabled">
        {props.image}
        <p>{props.text}</p>
        <WltSwitchButton value={props.connected} onChange={switchHandler}/>
      </div>
    )
  }
  if (props.connected === false)  {
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