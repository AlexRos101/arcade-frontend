import React from 'react'

const PriceLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="price-layout mg-0" {...props}>
      {children}
    </div>
  )
}

export default PriceLayout
