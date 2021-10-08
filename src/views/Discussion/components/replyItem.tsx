import React from 'react'
import styled from 'styled-components'
import CommentContent from './commentContent'

import { Comment } from 'global/interface'

interface Props {
  comment: Comment
  depth: number
  onReset: () => unknown
}

const ReplyItem: React.FC<Props> = (props) => {
  const reply = props.comment.reply ? props.comment.reply : []

  const DepthStick = styled.div`
    border-right: solid 4px #eae5ce;
    width: calc(20px * ${props.depth});
    margin-right: 20px;
  `

  return (
    <div>
      <div className="flex-row r-flex-row" style={{ marginTop: '1rem' }}>
        <DepthStick />
        <CommentContent comment={props.comment} onReset={props.onReset} />
      </div>
      {reply.map((replyItem: Comment, index: number) => {
        return <ReplyItem key={index} comment={replyItem} depth={props.depth + 1} onReset={props.onReset} />
      })}
    </div>
  )
}

export default ReplyItem
