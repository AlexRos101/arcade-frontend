import React from 'react'

const HeaderContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="wd-100" {...props}>
      {children}
    </div>
  )
}

export default HeaderContainer
