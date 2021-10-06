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

import Staff from './components/staff'
import SearchBox from './components/searchBox'
import { getStuff } from 'hooks/api'

interface ParamTypes {
  staffId: string
}

const DiscussionStaff = () => {
  const [staff, setStaff] = useState<any>({})
  const [staffIsSet, setStaffIsSet] = useState(false)
  const { staffId } = useParams<ParamTypes>()

  useEffect(() => {
    if (staffIsSet == false) {
      setStaffIsSet(true)
      getStuff(Number(staffId)).then(data => {
        setStaff(data)
      })
    }
    
  })
  return (
    <Page>
      <Header>
        <HeaderLabel>Community Discussiona</HeaderLabel>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8}>    
          <Staff key={staff.title} staff={staff} link={false}/>       
        </Grid>
        <Grid item sm={12} md={4}>
          <SearchBox />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DiscussionStaff