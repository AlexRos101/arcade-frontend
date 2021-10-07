import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Grid, ThemeProvider } from '@material-ui/core'

import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import DiscussionHeaderLabel from 'components/Label/DiscussionHeaderLabel'
import CommentItem from './components/commentItem'

import DiscussionContent from './components/discussionContent'
import SearchBox from './components/searchBox'
import AddComment from './components/addComment'
import * as Wallet from 'global/wallet'
import { useGlobalState } from 'state-pool'
import { getStuff, getDiscussion } from 'hooks/api'
import { greenTheme } from 'styles/theme'
import { Discussion, Comment, Stuff } from 'global/interface'

interface ParamTypes {
  staffId: string
  discussionId: string
}

const DiscussionDetail: React.FC = () => {
  const [staff, setStaff] = useState<Stuff>({ id: -1, title: '' })
  const [staffIsSet, setStaffIsSet] = useState(false)

  const [discussion, setDiscussion] = useState<Discussion>({
    id: -1,
    likes: 0,
    stuff_id: -1,
    user: '',
    user_type: -1,
    content: '',
    is_hot: false,
  })
  const [dscIsSet, setDscIsSet] = useState(false)

  const [comments, setComments] = useState([])

  const { staffId, discussionId } = useParams<ParamTypes>()

  const [showAddComments, setShowAddComments] = useState(false)

  const [commentState, setCommentState] = useGlobalState('commentState')
  const [account] = useGlobalState('account')
  const [commentOn, setCommentOn] = useState(false)

  useEffect(() => {
    if (staffIsSet == false) {
      setStaffIsSet(true)
      getStuff(Number(staffId)).then((data) => {
        setStaff(data)
      })
    }
  })

  const refresh = async () => {
    if ((await Wallet.isConnected()) && (account == '' || account == undefined)) {
      return
    }

    setDscIsSet(true)

    getDiscussion(Number(discussionId), account).then((data) => {
      setDiscussion(data)
      let hotValue = -1
      let hotItem = null

      for (let i = 0; i < data.comments.length; i++) {
        const tempComment = data.comments[i] as Comment
        if (tempComment.likes > hotValue) {
          hotValue = tempComment.likes
          hotItem = tempComment
        }
      }
      if (hotItem != null) {
        data.comments.unshift(hotItem)
      }

      setComments(data.comments)
    })
  }
  useEffect(() => {
    if (dscIsSet == false) {
      refresh()
    }
  })

  useEffect(() => {
    if (commentState == 2) {
      if (commentOn == false) {
        setShowAddComments(false)
      } else {
        setCommentOn(false)
        setCommentState(0)
      }
    }
  })

  const onAddComment = useCallback(() => {
    setCommentState(2)
    setShowAddComments(true)
    setCommentOn(true)
  }, [commentOn, showAddComments, commentState])

  return (
    <Page className="styled-search">
      <Header>
        <DiscussionHeaderLabel>{staff.title}</DiscussionHeaderLabel>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8}>
          <DiscussionContent discussion={discussion} />
          <AddComment visible={showAddComments} discussion={discussion} onReset={() => setDscIsSet(false)} />
          {showAddComments == false ? (
            <ThemeProvider theme={greenTheme}>
              <Button
                variant="contained"
                color="primary"
                onClick={onAddComment}
                className="r-wd-100"
                style={{ marginTop: '2vh', marginBottom: '2vh', paddingLeft: '2vw', paddingRight: '2vw' }}
              >
                Add Comment
              </Button>
            </ThemeProvider>
          ) : (
            ''
          )}
          {comments.map((comment: Comment, index: number) => {
            if (index == 0) {
              return <CommentItem key={index} comment={comment} badge="Hot Comment" />
            } else {
              return <CommentItem key={index} comment={comment} />
            }
          })}
        </Grid>
        <Grid item sm={12} md={4}>
          <SearchBox />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DiscussionDetail
