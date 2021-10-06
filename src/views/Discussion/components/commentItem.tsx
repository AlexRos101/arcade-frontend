import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Card from 'components/Card'
import CommentContent from './commentContent'
import ReplyItem from './replyItem'


interface Props {
    comment: any
}

const ItemContainer = styled.div`
    margin-bottom: 2vh;
`

const CommentItem: React.FC<Props> = (props) => {
    const comment = props.comment
    const reply = comment.reply?comment.reply:[]
    
    return (
        <ItemContainer style={{maxWidth: '100vw-32px'}}>
            <Card>
                <CommentContent comment={comment}/>
                {
                    reply.map((replyItem: any) => {
                        return (
                            <ReplyItem comment={replyItem} depth={0} />
                        )
                    })
                }
            </Card>
        </ItemContainer>
    )
}

export default CommentItem