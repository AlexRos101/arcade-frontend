import React from 'react'

const ErrorLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div className="error-label"> {children}</div>
}

export default ErrorLabel
