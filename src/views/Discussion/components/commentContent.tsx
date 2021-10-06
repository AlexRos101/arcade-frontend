import React, { useEffect, useState, useCallback } from "react"
import {
    Grid,
  } from '@material-ui/core'

import Link from '@material-ui/core/Link'

import CommentLabel from 'components/Label/CommentLabel'

import RocketIcon from 'assets/img/rocket.svg'
import ReplyIcon from 'assets/img/reply.svg'
import IconLabel from 'components/Label/IconLabel'

import { useGlobalState } from 'state-pool'

import AddReply from './addReply'

interface Props {
    comment: any
}

const CommentContent: React.FC<Props> = (props) => {
    const comment = props.comment
    const [showAddReply, setShowAddReply] = useState(false)
    const [commentState, setCommentState] = useGlobalState('commentState')
    const [replyOn, setReplyOn] = useState(false)

    useEffect(() => {
        if (commentState == 2) {
            if (replyOn == false) {
                setShowAddReply(false)
            } else {
                setReplyOn(false)
                setCommentState(0)
            }
        }
    }, [commentState, replyOn, showAddReply])

    const onAddReply = useCallback(() => {
        setCommentState(2)
        setReplyOn(true)
        setShowAddReply(true)
    }, [commentState, replyOn, showAddReply])

    return  (
        <div style={{flexGrow: 1}}>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                direction="row"
                style={{display: 'inline-block', wordBreak: 'break-word'}}
            >
                <CommentLabel>{comment.content}</CommentLabel>
            </Grid>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                direction="row">
                <div className="flex-row r-flex-row r-comment-count-row r-wd-100"> 
                    <IconLabel
                    avatar={RocketIcon}
                    label={comment.likes}
                    style={{ color: '#B7B091', marginRight: '1rem' }}
                    />
                    <Link href="#" onClick={onAddReply}>
                        <IconLabel
                        avatar={ReplyIcon}
                        label="Send a reply"
                        style={{ color: '#B7B091' }}
                        />
                    </Link>
                </div>
                <div className="flex-row r-flex-row">
                    <IconLabel
                    label={comment.user_type == 1 ? 'anonymous' : comment.user}
                    style={{ color: '#B7B091', marginRight: '1rem' }}
                    />
                    <IconLabel
                    label="5 hrs ago"
                    style={{ color: '#B7B091', marginRight: '1rem' }}
                    />
                </div>
            </Grid>
            <AddReply visible={showAddReply} comment={comment}/>
        </div>
    )
}

export default CommentContent
