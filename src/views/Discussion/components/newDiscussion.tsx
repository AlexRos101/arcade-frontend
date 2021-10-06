import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import AvatarIcon from 'assets/img/avatar.svg'
import Card from 'components/Card'
import DetailLink from './detailLink'
import AddDiscussionForm from './addDiscussion'

import { Stuff } from 'global/interface'

interface Props {
  staff: Stuff
  link?: boolean
}

const NewDiscussion: React.FC<Props> = (props) => {
  const staff = props.staff

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
