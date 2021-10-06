import React from 'react'

import Link from '@material-ui/core/Link'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'

const ExpandButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="market-expand" {...props}>
      <Link className="market-expand-link">
        <ArrowForwardIos fontSize="small" style={{ margin: 'auto' }} />
        <p>{children}</p>
      </Link>
    </div>
  )
}

export default ExpandButton
