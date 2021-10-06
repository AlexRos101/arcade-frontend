import React from 'react'

const ModalHeaderLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <p className="modal-header-label mg-0 ">{children}</p>
}

export default ModalHeaderLabel
