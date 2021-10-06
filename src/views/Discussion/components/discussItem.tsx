import React from 'react'
import styled from 'styled-components'

import { Grid } from '@material-ui/core'

import Link from '@material-ui/core/Link'
import RocketIcon from 'assets/img/rocket.svg'
import ChartIcon from 'assets/img/bxs-chart.svg'
import IconLabel from 'components/Label/IconLabel'
import DisucssionLabel from 'components/Label/DiscussionLabel'
import ReactTimeAgo from 'react-time-ago'

import { Discussion } from 'global/interface'

const ItemContainer = styled.div`
  background: #faf8f2;
  padding: 1rem;
  margin-top: 1rem;
`

interface Props {
  badge?: string
  content: Discussion
}

const DiscussItem: React.FC<Props> = (props) => {
  const discussion = props.content
  return (
    <Link href={`/discussion/details/${discussion.stuff_id}/${discussion.id}`} underline="none">
      <ItemContainer>
        <Grid container alignItems="center" justifyContent="space-between" direction="row">
          <DisucssionLabel>{discussion.content}</DisucssionLabel>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-between" direction="row">
          <div className="flex-row r-flex-row">
            <IconLabel avatar={RocketIcon} label={discussion.likes} style={{ color: '#B7B091', marginRight: '1rem' }} />
            <IconLabel avatar={ChartIcon} label={discussion.comment_cnt} style={{ color: '#B7B091' }} />
          </div>
          <div className="flex-row r-flex-row">
            <IconLabel
              label={discussion.user_type == 1 ? 'anonymous' : discussion.user}
              style={{ color: '#B7B091', marginRight: '1rem' }}
            />
            <IconLabel
              label={<ReactTimeAgo date={new Date(String(discussion.updated_at))} locale="en-US" />}
              style={{ color: '#B7B091', marginRight: '1rem' }}
            />
          </div>
        </Grid>
      </ItemContainer>
    </Link>
  )
}

export default DiscussItem
