import React, { useState, useEffect, useCallback } from 'react'
import { Grid } from '@material-ui/core'

import Card from 'components/Card'
import RocketIcon from 'assets/img/rocket.svg'
import RocketBlueIcon from 'assets/img/rocket-blue.svg'
import ChartIcon from 'assets/img/bxs-chart.svg'
import IconLabel from 'components/Label/IconLabel'
import { useGlobalState } from 'state-pool'
import { setLikes, getLikes, getDiscussion } from 'hooks/api'
import ReactTimeAgo from 'react-time-ago'
import Badge from 'components/badge'

import { Discussion } from 'global/interface'

interface Props {
  discussion: Discussion
}

const DiscussionContent: React.FC<Props> = (props) => {
  const [discussion, setDiscussion] = useState(props.discussion)
  const [account] = useGlobalState('account')
  const [isLike, setIsLike] = useState(0)
  const [dscIsSet, setDscIsSet] = useState(false)

  /* eslint-disable */

  const [showConnectWalletModal, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')

  /* eslint-enable */

  useEffect(() => {
    if (isLike != 0) return
    if (props.discussion.id == -1 || props.discussion.id == undefined) return
    if (account == '') return

    setIsLike(3)

    getLikes(props.discussion.id, -1, account).then((response) => {
      if (response.data.length == 0) {
        setIsLike(1)
      } else {
        setIsLike(2)
      }
    })
  }, [props, isLike, account])

  useEffect(() => {
    if (dscIsSet == true) return
    if (props.discussion.id == -1 || props.discussion.id == undefined) return

    setDscIsSet(true)

    getDiscussion(props.discussion.id, account).then((response) => {
      setDiscussion(response)
    })
  }, [props, discussion, dscIsSet])

  const onHandleLikes = useCallback(() => {
    if (account != '') {
      if (isLike == 1) {
        setLikes(discussion.id, -1, account, true).then((response) => {
          if (response.data == true) {
            setIsLike(2)
            setDscIsSet(false)
          }
        })
      } else if (isLike == 2) {
        console.log(discussion)
        setLikes(discussion.id, -1, account, false).then((response) => {
          if (response.data == true) {
            setIsLike(1)
            setDscIsSet(false)
          }
        })
      }
    } else {
      setShowConnectWalletModal(true)
    }
  }, [isLike, account, discussion])

  return (
    <Card>
      <Grid container alignItems="center" justifyContent="space-between" direction="row" className="dsc-content-header">
        <p style={{ marginTop: 0 }}>
          {discussion.is_hot == undefined || discussion.is_hot == false ? (
            ''
          ) : (
            <Badge type="danger" content="Hot Discussion" style={{ marginLeft: '0px', marginBottom: '10px' }} />
          )}
          {discussion.content}
        </p>
      </Grid>
      <Grid container alignItems="center" justifyContent="space-between" direction="row" className="mt-5">
        <div className="flex-row r-flex-row r-comment-count-row r-wd-100">
          <a href="#" onClick={onHandleLikes} style={{ textDecoration: 'none' }}>
            {isLike == 2 && account != '' ? (
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
          />
        </div>
        <div className="flex-row r-flex-row">
          <IconLabel
            label={discussion.user_type == 1 ? 'anonymous' : discussion.user}
            fontSize="16px"
            style={{ color: '#B7B091', marginRight: '2rem' }}
          />
          {discussion.updated_at != undefined ? (
            <IconLabel
              label={<ReactTimeAgo date={new Date(discussion.updated_at)} locale="en-US" />}
              fontSize="16px"
              style={{ color: '#B7B091' }}
            />
          ) : (
            ''
          )}
        </div>
      </Grid>
    </Card>
  )
}

export default DiscussionContent
