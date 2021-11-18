import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Grid, ThemeProvider } from '@material-ui/core'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import DiscussionHeaderLabel from 'components/Label/DiscussionHeaderLabel'
import CommentItem from './components/CommentItem'
import MainLoading from 'components/MainLoading'
import DiscussionContent from './components/DiscussionContent'
import SearchBox from './components/SearchBox'
import AddComment from './components/AddComment'
import * as Wallet from 'global/wallet'
import { useGlobalState } from 'state-pool'
import { getStuff, getDiscussion } from 'hooks/api'
import { greenTheme } from 'styles/theme'
import { Discussion, Comment, Stuff } from 'global/interface'
import { useArcadeContext } from 'hooks/useArcadeContext'

interface ParamTypes {
  staffId: string
  discussionId: string
}

const DiscussionDetail: React.FC = () => {
  const option = {
    root: null,
    rootMargin: '20px',
    threshold: 0,
  }

  const { account } = useArcadeContext()

  const [staff, setStaff] = useState<Stuff>({ id: -1, title: '' })
  const [staffIsSet, setStaffIsSet] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

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
  const [comments, setComments] = useState<Comment[]>([])
  const { staffId, discussionId } = useParams<ParamTypes>()
  const [showAddComments, setShowAddComments] = useState(false)
  const [commentState, setCommentState] = useGlobalState('commentState')
  const [commentOn, setCommentOn] = useState(false)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(-1)
  const loader = useRef(null)

  useEffect(() => {
    if (staffIsSet === false) {
      setStaffIsSet(true)
      getStuff(Number(staffId)).then((data) => {
        setStaff(data)
      })
    }
  }, [staffIsSet, staffId])

  const appendComment = (cmts: Comment[], comment: Comment, parent: number, isAdded: boolean) => {
    if (isAdded === true) return cmts

    let i = 0
    for (i = 0; i < cmts.length ; i ++) {
      if (cmts[i].id === parent) {
        const replys = cmts[i].reply
        if (replys === undefined) {
          cmts[i].reply = []
        } else {
          let isExist = false
          for (let j = 0; j < replys.length; j ++) {
            if (replys[j].id === comment.id) {
              isExist = true
              break
            }
          }

          if (isExist === true) break
        }
        cmts[i].reply?.push(comment)
        isAdded = true
        break;
      }
    }

    if (i !== cmts.length) return cmts

    for (i = 0; i < cmts.length; i ++) {
      if (isAdded === true) break;

      const replys = cmts[i].reply
      if (replys !== undefined) {
        cmts[i].reply = appendComment(replys, comment, parent, isAdded)  
      }
    }

    return cmts
  }

  const onReset = (comment: Comment, parent: number) => {
    let tempComments = comments.slice()
    let isAdded = false
    tempComments = appendComment(tempComments, comment, parent, isAdded)
    setComments(tempComments)
  }

  const refresh = () => {
    account && getDiscussion(Number(discussionId), account, page, 4).then((res) => {
      const { data } = res
      setDiscussion(data)

      if (res.total >= 0) {
        setTotal(res.total)
      }

      if (page === 0) {
        let hotValue = -1
        let hotItem = null

        for (let i = 0; i < data.comments.length; i++) {
          const tempComment = data.comments[i] as Comment
          if (tempComment.likes > hotValue) {
            hotValue = tempComment.likes
            hotItem = tempComment
          }
        }
        if (hotItem !== null) {
          data.comments.unshift(hotItem)
        }
      }

      if (page >= res.total && loader.current) {
        const elem = loader.current
        observer.unobserve(elem)
      } else {
        setPage(page + Math.min(res.total - page, 4))
      }

      setComments([...comments, ...data.comments])
      setShowLoading(false)
    })
  }

  const initDiscussion = async () => {
    if ((await Wallet.isConnected()) && (account === '' || account === undefined)) {
      return
    }
    if (dscIsSet === true) return
    if (total !== -1 && page >= total) return

    setDscIsSet(true)
    refresh()
  }
  useEffect(() => {
    if (dscIsSet === false) {
      initDiscussion()
    }
  })

  useEffect(() => {
    if (commentState === 2) {
      if (commentOn === false) {
        setShowAddComments(false)
      } else {
        setCommentOn(false)
        setCommentState(0)
      }
    }
  }, [commentState, commentOn, setCommentState])

  useEffect(() => {
    if (loader.current) observer.observe(loader.current)
  })

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0]
      if (target.isIntersecting) {
        setDscIsSet(false)
      }
    },
    [],
  )

  const [observer] = useState<IntersectionObserver>(new IntersectionObserver(handleObserver, option))

  const onAddComment = useCallback(() => {
    setCommentState(2)
    setShowAddComments(true)
    setCommentOn(true)
  }, [setCommentState])

  return (
    <Page className="styled-search">
      <Header>
        <DiscussionHeaderLabel>{staff.title}</DiscussionHeaderLabel>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8} style={{ position: 'relative' }}>
          <MainLoading show={showLoading} />
          <DiscussionContent discussion={discussion} />
          <AddComment visible={showAddComments} discussion={discussion} onReset={() => refresh()} />
          {showAddComments === false ? (
            <ThemeProvider theme={greenTheme}>
              <div style={{ width: '100%', position: 'relative' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onAddComment}
                  className="r-sm-wd-100"
                  style={{ marginTop: '2vh', marginBottom: '2vh', paddingLeft: '2vw', paddingRight: '2vw' }}
                >
                  Add Comment
                </Button>
              </div>
            </ThemeProvider>
          ) : (
            ''
          )}
          {comments.map((comment: Comment, index: number) => {
            if (index === 0) {
              return <CommentItem key={index} comment={comment} badge="Hot Comment" onReset={onReset} />
            } else {
              return <CommentItem key={index} comment={comment} onReset={onReset} />
            }
          })}
          <div ref={loader} />
        </Grid>
        <Grid item sm={12} md={4}>
          <SearchBox />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DiscussionDetail
