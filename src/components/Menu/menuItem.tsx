import React from 'react'

interface Props {
  text: string
  onClick: any
}

const MenuItem: React.FC<Props> = (props) => {
  return (
    <button type="button" className="menu-item hd-100" onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default MenuItem
