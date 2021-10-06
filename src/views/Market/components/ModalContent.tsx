import React from "react"

const ModalContent: React.FC<React.HTMLAttributes<HTMLDivElement>>= ({ children, ...props }) => {
    return  (
        <p className="modal-content mg-0 "> {children}</p>
    )
}

export default ModalContent