import React from 'react'
import styled from 'styled-components'
import CommentContent from './commentContent'

interface Props {
  comment: any
  depth: number
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
      <div className="flex-row r-flex-row" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <DepthStick />
        <CommentContent comment={props.comment} />
      </div>
      {reply.map((replyItem: any) => {
        return <ReplyItem comment={replyItem} depth={props.depth + 1} />
      })}
    </div>
  )
}

export default ReplyItem
