import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import {
  Button,
  Grid,
  ThemeProvider,
  TextField,
  Typography,
  InputAdornment
} from '@material-ui/core'


import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import DiscussionHeaderLabel from 'components/Label/DiscussionHeaderLabel'
import CommentItem from './components/commentItem'

import DiscussionContent from './components/discussionContent'
import SearchBox from './components/searchBox'
import { getStuff, getDiscussion } from 'hooks/api'

import { greenTheme } from 'styles/theme'

interface ParamTypes {
  staffId: string,
  discussionId: string,
}

const DiscussionDetail = () => {
  const [staff, setStaff] = useState<any>({})
  const [staffIsSet, setStaffIsSet] = useState(false)

  const [discussion, setDiscussion] = useState<any>({})
  const [dscIsSet, setDscIsSet] = useState(false)

  const [comments, setComments] = useState([])

  const { staffId, discussionId } = useParams<ParamTypes>()

  useEffect(() => {
    if (staffIsSet == false) {
      setStaffIsSet(true)
      getStuff(Number(staffId)).then(data => {
        setStaff(data)
      })
    }
  })

  useEffect(() => {
    if (dscIsSet == false) {
      setDscIsSet(true)
      getDiscussion(Number(discussionId))
      .then(data => {
        setDiscussion(data)
        setComments(data.comments)
      })
    }
  })
  return (
    <Page>
      <Header>
        <DiscussionHeaderLabel>{staff.title}</DiscussionHeaderLabel>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8}>    
          <DiscussionContent discussion={discussion}/>
          <ThemeProvider theme={greenTheme}>
            <Button
              variant="contained"
              color="primary"
              style={{marginTop: '2vh', marginBottom: '2vh', paddingLeft:'2vw', paddingRight:'2vw'}}>
              Add Comment
            </Button>
          </ThemeProvider>
          {
            comments.map((comment: any) => {
              return (<CommentItem comment={comment}/>)
            })
          }
        </Grid>
        <Grid item sm={12} md={4}>
          <SearchBox />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DiscussionDetail