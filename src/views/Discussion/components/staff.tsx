import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, ThemeProvider, Typography } from '@material-ui/core'

import AvatarIcon from 'assets/img/avatar.svg'
import Card from 'components/Card'
import DiscussItem from './discussItem'
import DetailLink from './detailLink'
import { getAllDiscussion } from 'hooks/api'

import { greenTheme } from 'styles/theme'

import { Stuff, Discussion } from 'global/interface'

interface Props {
  staff: Stuff
  link?: boolean
}

const Staff: React.FC<Props> = (props) => {
  const history = useHistory()
  const staff = props.staff
  const [discussions, setDiscussions] = useState<Array<Discussion>>([])
  const [dscIsSet, setDscIsSet] = useState(false)

  useEffect(() => {
    if (dscIsSet == false) {
      setDscIsSet(true)
      const data = staff.discussions as Array<Discussion>
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
          <Grid item className="discussion-btn">
            <ThemeProvider theme={greenTheme}>
              <Button variant="outlined" color="primary" onClick={onAddNewThread}>
                + Add Discussion Thread
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
        {discussions.map((discussion, index) => {
          return <DiscussItem key={index} content={discussion} />
        })}
      </Card>
      {props.link == false ? (
        ''
      ) : (
        <DetailLink href={`/discussion/stuff/${staff.id}`} content={`View All ${staff.title} Discussions`}></DetailLink>
      )}
    </div>
  )
}

export default Staff
