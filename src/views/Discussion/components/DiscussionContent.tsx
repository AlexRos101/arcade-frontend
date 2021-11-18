import React, { useCallback, useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import Card from 'components/Card'
import RocketIcon from 'assets/img/rocket.svg'
import RocketBlueIcon from 'assets/img/rocket-blue.svg'
import ChartIcon from 'assets/img/bxs-chart.svg'
import IconLabel from 'components/Label/IconLabel'
import { setLikes, getLikes, getDiscussion } from 'hooks/api'
import ReactTimeAgo from 'react-time-ago'
import Badge from 'components/Badge'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { Discussion } from 'global/interface'
import { useAppDispatch } from 'state'
import { setConnectWallet } from 'state/show'

interface Props {
  discussion: Discussion
}

const DiscussionContent: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { account } = useArcadeContext()
  const [discussion, setDiscussion] = useState(props.discussion)
  const [isLike, setIsLike] = useState(0)
  const [dscIsSet, setDscIsSet] = useState(0)

  useEffect(() => {
    if (isLike !== 0) return
    if (props.discussion.id === -1 || props.discussion.id === undefined) return
    if (!account) return

    setIsLike(3)

    account &&  getLikes(props.discussion.id, -1, account).then((response) => {
      if (response.data.length === 0) {
        setIsLike(1)
      } else {
        setIsLike(2)
      }
    })
  }, [props, isLike, account])

  useEffect(() => {
    if (dscIsSet !== 0) return
    if (props.discussion.id === -1 || props.discussion.id === undefined) return

    setDscIsSet(1)

    account && getDiscussion(props.discussion.id, account).then((response) => {
      setDiscussion(response.data)
      setDscIsSet(2)
    })
  }, [props, discussion, dscIsSet, account])

  const onHandleLikes = useCallback(() => {
    if (account) {
      if (dscIsSet !== 2) return
      setDscIsSet(1)
      if (isLike === 1) {
        setLikes(discussion.id, -1, account, true).then((response) => {
          if (response.data === true) {
            setIsLike(2)
            setDscIsSet(0)
          }
        })
      } else if (isLike === 2) {
        setLikes(discussion.id, -1, account, false).then((response) => {
          if (response.data === true) {
            setIsLike(1)
            setDscIsSet(0)
          }
        })
      }
    } else {
      dispatch(setConnectWallet(true))
    }
  }, [isLike, account, discussion, dscIsSet, dispatch])

  /* eslint-disable */

  return (
    <Card>
      <Grid container alignItems="center" justifyContent="space-between" direction="row" className="dsc-content-header">
        <p style={{ marginTop: 0, overflowWrap: 'anywhere' }}>
          {discussion.is_hot === undefined || discussion.is_hot === false ? (
            ''
          ) : (
            <Badge type="danger" content="Hot Discussion" style={{ marginLeft: '0px', marginBottom: '10px' }} />
          )}
          {discussion.content}
        </p>
      </Grid>
      <Grid container alignItems="center" justifyContent="space-between" direction="row" className="mt-5">
        <div className="flex-row r-flex-row r-comment-count-row r-wd-100">
          <a onClick={onHandleLikes} style={{ textDecoration: 'none' }}>
            {isLike === 2 && account !== '' ? (
              <IconLabel
                avatar={RocketBlueIcon}
                label={discussion.likes}
                avatarWidth="25"
                avatarHeight="25"
                fontSize="16px"
                style={{ color: '#B7B091', marginRight: '2rem' }}
              />
            ) : (
              <IconLabel
                avatar={RocketIcon}
                label={discussion.likes}
                avatarWidth="23"
                avatarHeight="23"
                fontSize="16px"
                style={{ color: '#1571FF', marginRight: '2rem' }}
              />
            )}
          </a>
          <IconLabel
            avatar={ChartIcon}
            label={discussion.comment_cnt}
            avatarWidth="25"
            avatarHeight="25"
            fontSize="16px"
            style={{ color: '#B7B091' }}
            className="r-ml-auto"
          />
        </div>
        <div className="flex-row r-flex-row r-wd-100">
          <IconLabel
            label={discussion.user_type === 1 ? 'anonymous' : discussion.user}
            fontSize="16px"
            style={{ color: '#B7B091', marginRight: '2rem' }}
          />
          {discussion.updated_at !== undefined ? (
            <IconLabel
              label={<ReactTimeAgo date={new Date(discussion.updated_at)} locale="en-US" />}
              fontSize="16px"
              style={{ color: '#B7B091' }}
              className="r-ml-auto"
            />
          ) : (
            ''
          )}
        </div>
      </Grid>
    </Card>
  )

  /* eslint-enable */
}

export default DiscussionContent
