import React from 'react'

const ErrorLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="error-label" {...props}>
      {children}
    </div>
  )
}

export default ErrorLabel
