import React from 'react'

const CommentLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <p className="comment-label"> {children}</p>
}

export default CommentLabel
