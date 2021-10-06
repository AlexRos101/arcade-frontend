import React from "react"

const MarketRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    return (
        <div className="market-row flex-row" {...props}>
            {children}
        </div>
    )
}

export default MarketRow