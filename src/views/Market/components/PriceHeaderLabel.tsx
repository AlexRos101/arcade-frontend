import React from 'react'

const PriceHeaderLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <p className="price-header-label mg-0 ">{children}</p>
}

export default PriceHeaderLabel
