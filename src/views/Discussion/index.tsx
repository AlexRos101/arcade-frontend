import React, { useState, useEffect } from 'react'
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
import { getAllStuff } from 'hooks/api'

const Discussion = () => {
  const [staffs, setStaffs] = useState([])
  const [staffIsSet, setStaffIsSet] = useState(false)
  useEffect(() => {
    if (staffIsSet == false) {
      setStaffIsSet(true)
      getAllStuff().then(data => {
        setStaffs(data)
      })
    }
  })
  return (
    <Page className="styled-search">
      <Header>
        <HeaderLabel>Community Discussion</HeaderLabel>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8}>    
        {
          staffs.map((staff: any) => {
            return (
              <Staff key={staff.title} staff={staff}/>
            )
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

export default Discussion