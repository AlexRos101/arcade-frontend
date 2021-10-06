import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, ThemeProvider, TextField, Typography, InputAdornment } from '@material-ui/core'

import AvatarIcon from 'assets/img/avatar.svg'
import Card from 'components/Card'
import DetailLink from './detailLink'
import { getAllDiscussion } from 'hooks/api'
import AddDiscussionForm from './addDiscussion'

import { greenTheme } from 'styles/theme'

interface Props {
  staff: any
  link?: boolean
}

const NewDiscussion: React.FC<Props> = (props) => {
  const history = useHistory()
  const staff = props.staff
  const [discussions, setDiscussions] = useState<any[]>([])
  const [dscIsSet, setDscIsSet] = useState(false)

  useEffect(() => {
    if (dscIsSet == false) {
      setDscIsSet(true)
      const data = staff.discussions as any
      if (data && data.length > 0) {
        setDiscussions(data)
      } else {
        getAllDiscussion(staff.id, 0, 3).then((res) => {
          setDiscussions(res)
        })
      }
    }
  })

  const onAddNewThread = () => {
    history.push(`/discussion/new/${staff.id}`)
  }

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
          <Grid item></Grid>
        </Grid>
        <AddDiscussionForm stuff={staff} />
      </Card>
      <DetailLink href={`/discussion/`} content={`Return to All Discussions`}></DetailLink>
    </div>
  )
}

export default NewDiscussion
