import React, { useCallback, useState } from 'react'
import { Toggle } from 'components/Toggle'
import WltSwitchButton from 'components/Button/WltSwitchButton'

interface Props {
  image: any
  text: string
  onClick?: () => unknown
}

const WalletItem: React.FC<Props> = (props) => {
  const [state, setState] = useState(false)
  const switchHandler = useCallback(() => {
    setState(!state)
  }, [state])

  if (state == false) {
    return (
      <div className="wallet-item flex-row r-flex-row">
        {props.image}
        <p>{props.text}</p>
        <WltSwitchButton value={state} onChange={switchHandler} />
      </div>
    )
  } else {
    return (
      <div className="wallet-item flex-row r-flex-row wallet-enabled">
        {props.image}
        <p>{props.text}</p>
        <WltSwitchButton value={state} onChange={switchHandler} />
      </div>
    )
  }
  
}

export default WalletItem