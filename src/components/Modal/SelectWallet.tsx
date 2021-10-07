import React from 'react'
import Triangle from 'assets/img/triangle.svg'

interface Props {
  open: boolean
}

const SelectWalletModal: React.FC<Props> = (props) => {
  if (props.open === true) {
    return (
      <div className="wallet-select-modal">
        <img src={Triangle} alt="triangle" />
      </div>
    )
  }
  return null
}

export default SelectWalletModal
