import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Card from 'components/Card'
import CommentContent from './commentContent'


interface Props {
    comment: any
}

const ItemContainer = styled.div`
    margin-bottom: 2vh;
`

const CommentItem: React.FC<Props> = (props) => {
    const comment = props.comment
    
    return (
        <ItemContainer>
            <Card>
                <CommentContent comment={comment}/>
                
            </Card>
        </ItemContainer>
    )
}

export default CommentItem