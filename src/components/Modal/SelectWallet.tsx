import React from 'react'
import { useGlobalState } from 'state-pool'
import Triangle from 'assets/img/triangle.svg'
import Metamask from 'assets/img/metamask.svg'
import Walletconnect from 'assets/img/walletconnect.svg'
import WalletItem from 'components/Menu/WalletItem'
import * as CONST from '../../global/const'

interface Props {
  open: boolean
  connectedWallet: number
}

const SelectWalletModal: React.FC<Props> = (props) => {
  const [openConnectWalletMenu, setOpenConnectWalletMenu] = useGlobalState('openConnectWalletMenu')

  if (props.open === true) {
    return (
      <div className="wallet-select-modal">
        <div id="back" onClick={() => setOpenConnectWalletMenu(false)}/>
        <div id="content">
          <img src={Triangle} alt="triangle" id="triangle"/>
          <div className="modal-content">
            <p id='title'>Choose a Wallet</p>
            <WalletItem 
              image={<img src={Metamask} alt='' />}
              text={`Metamask`}
              connected={props.connectedWallet === CONST.WALLET_TYPE.METAMASK}
              walletType={CONST.WALLET_TYPE.METAMASK}/>
            <WalletItem 
              image={<img src={Walletconnect} alt='' />}
              text={`Wallet Connect`}
              connected={props.connectedWallet === CONST.WALLET_TYPE.WALLETCONNECT}
              walletType={CONST.WALLET_TYPE.WALLETCONNECT}/>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default SelectWalletModal
