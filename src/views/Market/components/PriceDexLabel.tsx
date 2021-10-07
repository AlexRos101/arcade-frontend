import React from 'react'

const PriceDexLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <p className="price-dex-label mg-0 " {...props}>
      {children}
    </p>
  )
}

export default PriceDexLabel
