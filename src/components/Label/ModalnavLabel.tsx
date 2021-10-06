import React from "react"

const ModalNavLabel: React.FC<React.HTMLAttributes<HTMLDivElement>>= ({ children, ...props }) => {
    return (
        <p className="modal-nav-label mg-0 ">{children}</p>
    )
}

export default ModalNavLabel