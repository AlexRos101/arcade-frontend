import React from "react"

const Header: React.FC<React.HTMLAttributes<HTMLDivElement>>= ({ children, ...props }) => {
    return (
        <div className="market-row flex-row market-title " {...props}> 
            {children}
        </div>
    )
}

export default Header