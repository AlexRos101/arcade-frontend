import React, { useEffect, useState, useCallback } from 'react'
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
import Badge from 'components/badge'

import AddReply from './addReply'

interface Props {
  comment: Comment
  badge?: string
}

const CommentContent: React.FC<Props> = (props) => {
  const [comment, setComment] = useState(props.comment)
  const [cmtIsSet, setCmtIsSet] = useState(true)
  const [showAddReply, setShowAddReply] = useState(false)
  const [commentState, setCommentState] = useGlobalState('commentState')
  const [replyOn, setReplyOn] = useState(false)

  const [account] = useGlobalState('account')
  const [isLike, setIsLike] = useState(0)

  /* eslint-disable */

  const [showConnectWalletModal, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')

  /* eslint-enable */

  useEffect(() => {
    if (commentState === 2) {
      if (replyOn === false) {
        setShowAddReply(false)
      } else {
        setReplyOn(false)
        setCommentState(0)
      }
    }
  }, [commentState, replyOn, showAddReply])

  const refreshLikeStatus = async () => {
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
  }

  useEffect(() => {
    refreshLikeStatus()
  }, [props, isLike, account])

  const onAddReply = useCallback(() => {
    setCommentState(2)
    setReplyOn(true)
    setShowAddReply(true)
  }, [commentState, replyOn, showAddReply])

  const onHandleLikes = useCallback(() => {
    if (account !== '') {
      if (isLike === 1) {
        setLikes(comment.discussion_id, comment.id, account, true).then((response) => {
          if (response.data === true) {
            setIsLike(2)
            setCmtIsSet(false)
          }
        })
      } else if (isLike === 2) {
        setLikes(comment.discussion_id, comment.id, account, false).then((response) => {
          if (response.data === true) {
            setIsLike(1)
            setCmtIsSet(false)
          }
        })
      }
    } else {
      setShowConnectWalletModal(true)
    }
  }, [isLike, account, comment])

  useEffect(() => {
    if (cmtIsSet === false) {
      setCmtIsSet(true)
      getComment(props.comment.id).then((response) => {
        setComment(response.data)
      })
    }
  }, [cmtIsSet, comment])

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        style={{ display: 'inline-block', wordBreak: 'break-word' }}
      >
        <CommentLabel style={{ display: 'flex', marginTop: 0 }}>
          {props.badge === undefined ? (
            ''
          ) : (
            <Badge type="note" content={String(props.badge)} style={{ marginLeft: 0 }} />
          )}
          {comment.content}
        </CommentLabel>
      </Grid>
      <Grid container alignItems="center" justifyContent="space-between" direction="row">
        <div className="flex-row r-flex-row r-comment-count-row r-wd-100">
          <Link
            href="#"
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
      <AddReply visible={showAddReply} comment={comment} />
    </div>
  )
}

export default CommentContent
