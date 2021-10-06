import React from 'react'

const HeaderLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <p className="market-label mg-0 "> {children}</p>
}

export default HeaderLabel
