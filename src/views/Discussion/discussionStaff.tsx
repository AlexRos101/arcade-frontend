import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import MainLoading from 'components/mainLoading'
import Staff from './components/staff'
import SearchBox from './components/searchBox'
import { getStuff } from 'hooks/api'

import { Stuff } from 'global/interface'

interface ParamTypes {
  staffId: string
}

const DiscussionStaff: React.FC = () => {
  const [staff, setStaff] = useState<Stuff>({ id: -1, title: '' })
  const [staffIsSet, setStaffIsSet] = useState(false)
  const { staffId } = useParams<ParamTypes>()
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    if (staffIsSet === false) {
      setStaffIsSet(true)
      getStuff(Number(staffId)).then((data) => {
        setStaff(data)
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
          <Staff key={staff.title} staff={staff} link={false} />
        </Grid>
        <Grid item sm={12} md={4}>
          <SearchBox />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DiscussionStaff
