import React from 'react'
import Link from '@material-ui/core/Link'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { CSSProperties } from 'styled-components'

interface Props {
  href: string
  content: string
  type: string
  style?: CSSProperties
}

const DetailLink: React.FC<Props> = (props) => {
  if (props.type == 'forward') {
    return (
      <Link className="discuss-detail-link flex-row r-flex-row" href={props.href} style={props.style}>
        {props.content} <ArrowForwardIos fontSize="small" style={{ marginLeft: '0.5rem' }} />
      </Link>
    )
  } else {
    return (
      <Link className="discuss-detail-link flex-row r-flex-row" href={props.href} style={props.style}>
        <ArrowBackIos fontSize="small" style={{ marginRight: '0.5rem' }} /> {props.content}
      </Link>
    )
  }
}

export default DetailLink
