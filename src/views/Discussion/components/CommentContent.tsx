import React, { useEffect, useState, useCallback, useContext } from 'react'
import { Grid } from '@material-ui/core'

import Link from '@material-ui/core/Link'

import CommentLabel from 'components/Label/CommentLabel'

import RocketIcon from 'assets/img/rocket.svg'
import RocketBlueIcon from 'assets/img/rocket-blue.svg'
import ReplyIcon from 'assets/img/reply.svg'
import IconLabel from 'components/Label/IconLabel'
import ReactTimeAgo from 'react-time-ago'
import * as Wallet from 'global/wallet'
import { setLikes, getComment } from 'hooks/api'
import { useGlobalState } from 'state-pool'
import { Comment } from 'global/interface'
import Badge from 'components/Badge'

import AddReply from './AddReply'
import { ArcadeContext } from 'contexts/ArcadeContext'

interface Props {
  comment: Comment
  badge?: string
  onReset: (comment: Comment, parent: number) => unknown
}

const CommentContent: React.FC<Props> = (props) => {
  const account = useContext(ArcadeContext)?.account
  const [comment, setComment] = useState(props.comment)
  const [cmtIsSet, setCmtIsSet] = useState(0)
  const [showAddReply, setShowAddReply] = useState(false)
  const [commentState, setCommentState] = useGlobalState('commentState')
  const [replyOn, setReplyOn] = useState(false)
  const [isLike, setIsLike] = useState(0)

  const [, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')

  useEffect(() => {
    if (commentState === 2) {
      if (replyOn === false) {
        setShowAddReply(false)
      } else {
        setReplyOn(false)
        setCommentState(0)
      }
    }
  }, [commentState, replyOn, showAddReply, setCommentState])

  const refreshLikeStatus = useCallback(async () => {
    if (isLike !== 0) return
    if (props.comment.id === undefined || props.comment.id === -1) return
    if (!(await Wallet.isConnected())) return

    if (props.comment.user_like !== undefined) {
      if (props.comment.user_like.length > 0) {
        setIsLike(2)
      } else {
        setIsLike(1)
      }
    }
  }, [isLike, props.comment.id, props.comment.user_like])

  useEffect(() => {
    refreshLikeStatus()
  }, [props, isLike, account, refreshLikeStatus])

  const onAddReply = useCallback(() => {
    setCommentState(2)
    setReplyOn(true)
    setShowAddReply(true)
  }, [setCommentState])

  const onReset = (newComment: Comment) => {
    props.onReset(newComment, comment.id)
  }

  const onHandleLikes = useCallback(() => {
    if (account !== '' && account !== undefined) {
      if (cmtIsSet !== 2) return
      setCmtIsSet(1)
      if (isLike === 1) {
        setLikes(comment.discussion_id, comment.id, account, true).then((response) => {
          if (response.data === true) {
            setIsLike(2)
            setCmtIsSet(0)
          }
        })
      } else if (isLike === 2) {
        setLikes(comment.discussion_id, comment.id, account, false).then((response) => {
          if (response.data === true) {
            setIsLike(1)
            setCmtIsSet(0)
          }
        })
      }
    } else {
      setShowConnectWalletModal(true)
    }
  }, [isLike, account, comment, cmtIsSet, setShowConnectWalletModal])

  useEffect(() => {
    if (cmtIsSet === 0) {
      setCmtIsSet(1)
      getComment(props.comment.id).then((response) => {
        setComment(response.data)
        setCmtIsSet(2)
      })
    }
  }, [cmtIsSet, comment, props.comment.id])

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        style={{ display: 'inline-block', wordBreak: 'break-word' }}
      >
        <CommentLabel style={{ marginTop: 0 }}>
          {props.badge === undefined ? (
            ''
          ) : (
            <Badge type="note" content={String(props.badge)} style={{ marginLeft: 0, display: 'inline' }} />
          )}
          {comment.content}
        </CommentLabel>
      </Grid>
      <Grid container alignItems="center" justifyContent="space-between" direction="row">
        <div className="flex-row r-flex-row r-comment-count-row r-wd-100">
          <Link
            onClick={onHandleLikes}
            style={{ height: 'fit-content', marginTop: 'auto', marginBottom: 'auto' }}
          >
            {isLike === 2 && account !== '' ? (
              <IconLabel
                avatar={RocketBlueIcon}
                label={comment.likes}
                avatarWidth="17"
                avatarHeight="17"
                style={{ color: '#B7B091', marginRight: '1rem', marginTop: 'auto' }}
              />
            ) : (
              <IconLabel
                avatar={RocketIcon}
                label={comment.likes}
                style={{ color: '#B7B091', marginRight: '1rem', marginTop: 'auto' }}
              />
            )}
          </Link>
          <Link onClick={onAddReply} className="r-ml-auto">
            <IconLabel 
              avatar={ReplyIcon}
              label="Send a reply"
              style={{ color: '#B7B091' }}
            />
          </Link>
        </div>
        <div className="flex-row r-flex-row r-wd-100">
          <IconLabel
            label={comment.user_type === 1 ? 'anonymous' : comment.user}
            style={{ color: '#B7B091', }}
          />
          <IconLabel
            label={<ReactTimeAgo date={new Date(String(comment.updated_at))} locale="en-US" />}
            style={{ color: '#B7B091', marginLeft: '1rem' }}
            className="r-ml-auto"
          />
        </div>
      </Grid>
      <AddReply visible={showAddReply} comment={comment} onReset={onReset} />
    </div>
  )
}

export default CommentContent
