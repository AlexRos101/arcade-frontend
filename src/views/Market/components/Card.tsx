import React, { useState, useCallback } from 'react'
import avatar from 'assets/img/avatar.png'
import { CSSProperties } from 'styled-components'

interface Props {
  index: number
  tokenId: number
  name: string
  price: number
  onClick: (index: number) => void
  className?: string
  style?: CSSProperties
}

const Card: React.FC<Props> = (Props) => {
  const [mouseMoved, setMouseMoved] = useState(false)

  const handleClick = useCallback(() => {
    if (mouseMoved === false) {
      Props.onClick(Props.index)
    }
  }, [mouseMoved, Props])

  return (
    <div
      className={`card ${Props.className}`}
      onMouseMove={() => setMouseMoved(true)}
      onMouseDown={() => setMouseMoved(false)}
      onMouseUp={handleClick}
    >
      <img className="card-img" src={`${process.env.REACT_APP_THUMBNAIL_NODE}${Props.tokenId}.png`} />
      <div className="card-label">
        <div className="card-price flex-row frame-vc">
          <p>{Props.name}</p>
          <div className="card-price flex-row right r-flex-row">
            <img className="mr-5" src={avatar} alt="avatar" style={{ width: '20px', height: '20px' }} />
            <p>{Props.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
