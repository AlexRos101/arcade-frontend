import React from 'react'
import Triangle from 'assets/img/triangle.svg'
import Metamask from 'assets/img/metamask.svg'
import Walletconnect from 'assets/img/walletconnect.svg'
import WalletItem from 'components/Menu/WalletItem'

interface Props {
  open: boolean
}

const SelectWalletModal: React.FC<Props> = (props) => {
  if (props.open === true) {
    return (
      <div className="wallet-select-modal">
        <div id="back" />
        <div id="content">
          <img src={Triangle} alt="triangle" id="triangle"/>
          <div className="modal-content">
            <p id='title'>Choose a Wallet</p>
            <WalletItem 
              image={<img src={Metamask} alt='' />}
              text={`Metamask`}/>
            <WalletItem 
              image={<img src={Walletconnect} alt='' />}
              text={`Wallet Connect`}/>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default SelectWalletModal
