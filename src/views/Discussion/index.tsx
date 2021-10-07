import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import MainLoading from 'components/mainLoading'
import Staff from './components/staff'
import SearchBox from './components/searchBox'
import { getAllStuff } from 'hooks/api'

import { Stuff } from 'global/interface'

const Discussion: React.FC = () => {
  const [staffs, setStaffs] = useState([])
  const [staffIsSet, setStaffIsSet] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    if (staffIsSet == false) {
      setStaffIsSet(true)
      getAllStuff().then((data) => {
        setStaffs(data)
        setShowLoading(false)
      })
    }
  })

  return (
    <Page className="styled-search">
      <Header>
        <HeaderLabel>Community Discussion</HeaderLabel>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8} style={{ position: 'relative' }}>
          <MainLoading show={showLoading} />
          {staffs.map((staff: Stuff) => {
            return <Staff key={staff.title} staff={staff} />
          })}
        </Grid>
        <Grid item sm={12} md={4}>
          <SearchBox />
        </Grid>
      </Grid>
    </Page>
  )
}

export default Discussion
