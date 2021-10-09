import React from 'react'
import { CSSProperties } from 'styled-components'

interface Props {
  type: string
  content: string
  style?: CSSProperties
}

const Badge: React.FC<Props> = (props) => {
  return (
    <a className={`badge badge-${props.type}`} style={props.style}>
      {props.content}
    </a>
  )
}

export default Badge
