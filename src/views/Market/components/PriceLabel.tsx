import React from 'react'

const PriceLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <p className="price-label mg-0 " {...props}>
      {children}
    </p>
  )
}

export default PriceLabel
