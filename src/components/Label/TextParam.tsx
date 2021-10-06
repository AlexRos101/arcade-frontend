import React from 'react'

const TextParam: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <p className="text-param" {...props}>
      {children}
    </p>
  )
}

export default TextParam
