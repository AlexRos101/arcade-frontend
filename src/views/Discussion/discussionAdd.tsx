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

import NewDiscussion from './components/newDiscussion'
import AddNote from './components/addNote'
import { getStuff } from 'hooks/api'

interface ParamTypes {
  stuffId: string
}

const DiscussionAdd = () => {
  const [staff, setStaff] = useState<any>({})
  const [staffIsSet, setStaffIsSet] = useState(false)
  const { stuffId } = useParams<ParamTypes>()

  useEffect(() => {
    if (staffIsSet == false) {
      setStaffIsSet(true)
      getStuff(Number(stuffId)).then(data => {
        setStaff(data)
      })
    }
    
  })
  return (
    <Page>
      <Header>
        <HeaderLabel>Add a Discussion Thread</HeaderLabel>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8}>    
          <NewDiscussion key={staff.title} staff={staff} link={false}/>       
        </Grid>
        <Grid item sm={12} md={4}>
          <AddNote />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DiscussionAdd