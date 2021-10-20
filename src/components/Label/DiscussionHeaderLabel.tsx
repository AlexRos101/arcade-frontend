import React from 'react'

import AvatarIcon from 'assets/img/avatar.svg'

const DiscussionHeaderLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="flex-row r-flex-row" {...props}>
      <img src={AvatarIcon} className="dicuss-header-image" alt=""/>
      <p className="discuss-header-label mg-0 " style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: '1rem' }}>
        {' '}
        {children}
      </p>
    </div>
  )
}

export default DiscussionHeaderLabel
