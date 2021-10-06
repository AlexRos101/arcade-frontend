import React from "react"

const RowLabel: React.FC<React.HTMLAttributes<HTMLDivElement>>= ({ children, ...props }) => {
    return (
        <p className="market-sublabel mg-0 ">{children}</p>
    )
}

export default RowLabel

