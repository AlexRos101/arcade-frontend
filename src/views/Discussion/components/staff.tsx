import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, ThemeProvider, Typography } from '@material-ui/core'

import AvatarIcon from 'assets/img/avatar.svg'
import Card from 'components/Card'
import DiscussItem from './discussItem'
import DetailLink from './detailLink'
import { getAllDiscussion } from 'hooks/api'

import Pagination from 'components/Pagination/Pagination'
import { greenTheme } from 'styles/theme'

import { Stuff, Discussion } from 'global/interface'

interface Props {
  staff: Stuff
  link?: boolean
}

const Staff: React.FC<Props> = (props) => {
  const history = useHistory()
  const { staff } = props
  const [discussions, setDiscussions] = useState<Array<Discussion>>([])
  const [dscIsSet, setDscIsSet] = useState(false)
  const [total, setTotal] = useState(0)
  const [pageNum, setPageNum] = useState(0)

  useEffect(() => {
    if (dscIsSet === false) {
      setDscIsSet(true)
      const data = staff.discussions as Array<Discussion>
      if (data && data.length > 0) {
        let hotIndex = -1
        let hotValue = -1

        for (let i = 0; i < data.length; i++) {
          const tempDiscussion = data[i] as Discussion
          if (tempDiscussion.likes > hotValue) {
            hotIndex = i
            hotValue = tempDiscussion.likes
          }
        }

        data.sort((x: Discussion, y: Discussion) => {
          return x === data[hotIndex] ? -1 : y === data[hotIndex] ? 1 : 0
        })

        setDiscussions(data)
      } else {
        getAllDiscussion(staff.id, pageNum * 8, 8).then((response) => {
          let hotIndex = -1
          let hotValue = -1

          const res = response.data

          for (let i = 0; i < res.length; i++) {
            const tempDiscussion = res[i] as Discussion
            if (tempDiscussion.likes > hotValue) {
              hotIndex = i
              hotValue = tempDiscussion.likes
            }
          }

          res.sort((x: Discussion, y: Discussion) => {
            return x === res[hotIndex] ? -1 : y === res[hotIndex] ? 1 : 0
          })

          setDiscussions(res)
          setTotal(response.total)
        })
      }
    }
  })

  const onAddNewThread = useCallback(() => {
    history.push(`/discussion/new/${staff.id}`)
  }, [])

  const onPageChanged = useCallback(
    (pageNum: number) => {
      setPageNum(pageNum)
      setDscIsSet(false)
    },
    [pageNum, dscIsSet],
  )

  return (
    <div style={{ marginBottom: '2rem' }}>
      <Card>
        <Grid container alignItems="center" justifyContent="space-between" direction="row" className="staff-header">
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <img src={AvatarIcon} width="34px" height="34px" />
              </Grid>
              <Grid item>
                <Typography variant="h3" style={{ color: '#FF6C50' }}>
                  {staff.title}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="discussion-btn">
            <ThemeProvider theme={greenTheme}>
              <Button variant="outlined" color="primary" onClick={onAddNewThread}>
                + Add Discussion Thread
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
        {discussions.map((discussion, index) => {
          if (index === 0) {
            return <DiscussItem key={index} content={discussion} badge="Hot Discussion" />
          } else {
            return <DiscussItem key={index} content={discussion} />
          }
        })}
      </Card>
      {props.link === false ? (
        <Pagination totalPage={total} onChange={onPageChanged} />
      ) : (
        <DetailLink
          href={`/discussion/stuff/${staff.id}`}
          content={`View All ${staff.title} Discussions`}
          type={`forward`}
          style={{ marginLeft: '20px' }}
        ></DetailLink>
      )}
    </div>
  )
}

export default Staff
