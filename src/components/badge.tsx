import React from 'react'
import { CSSProperties } from 'styled-components'

interface Props {
  type: string
  content: string
  style?: CSSProperties
}

const Badge: React.FC<Props> = (props) => {
  return (
    <p className={`badge badge-${props.type}`} style={props.style}>
      {props.content}
    </p>
  )
}

export default Badge
