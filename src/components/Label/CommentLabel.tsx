import React from 'react'

const CommentLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <p className="comment-label" {...props}>
      {children}
    </p>
  )
}

export default CommentLabel
