import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'

import NewDiscussion from './components/NewDiscussion'
import AddNote from './components/AddNote'
import { getStuff } from 'hooks/api'

import { Stuff } from 'global/interface'

interface ParamTypes {
  stuffId: string
}

const DiscussionAdd: React.FC = () => {
  const [staff, setStaff] = useState<Stuff>({ id: -1, title: '' })
  const [staffIsSet, setStaffIsSet] = useState(false)
  const { stuffId } = useParams<ParamTypes>()

  useEffect(() => {
    if (staffIsSet === false) {
      setStaffIsSet(true)
      getStuff(Number(stuffId)).then((res) => {
        if (res.result) {
          setStaff(res.data)
        }
      })
    }
  }, [staffIsSet, stuffId])
  return (
    <Page className="styled-rule">
      <Header>
        <HeaderLabel>Add a Discussion Thread</HeaderLabel>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8} className="r-wd-100 r-no-grid-flex">
          <NewDiscussion key={staff.title} staff={staff} link={false} />
        </Grid>
        <Grid item sm={12} md={4}>
          <AddNote />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DiscussionAdd
