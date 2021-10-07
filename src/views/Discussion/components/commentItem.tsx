import React from 'react'
import styled from 'styled-components'

import Card from 'components/Card'
import CommentContent from './commentContent'
import ReplyItem from './replyItem'

import { Comment } from 'global/interface'

interface Props {
  comment: Comment
  badge?: string
}

const ItemContainer = styled.div`
  margin-bottom: 2vh;
`

const CommentItem: React.FC<Props> = (props) => {
  const { comment } = props
  const reply = comment.reply ? comment.reply : []

  return (
    <ItemContainer style={{ maxWidth: '100vw-32px' }}>
      <Card>
        {props.badge === undefined ? (
          <CommentContent comment={comment} />
        ) : (
          <CommentContent comment={comment} badge={props.badge} />
        )}
        {reply.map((replyItem: Comment, index: number) => {
          return <ReplyItem key={index} comment={replyItem} depth={0} />
        })}
      </Card>
    </ItemContainer>
  )
}

export default CommentItem
