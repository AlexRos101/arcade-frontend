import React from 'react'

const MarketModalRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div className="market-modal-row mg-0">{children}</div>
}

export default MarketModalRow
