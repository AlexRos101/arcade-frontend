import React, { useState, useEffect } from 'react'
import {
    Button,
    Grid,
    ThemeProvider,
    TextField,
    Typography,
    InputAdornment
  } from '@material-ui/core'

import Card from 'components/Card'
import RocketIcon from 'assets/img/rocket.svg'
import ChartIcon from 'assets/img/bxs-chart.svg'
import IconLabel from 'components/Label/IconLabel'

interface Props {
    discussion: any
}

const DiscussionContent: React.FC<Props> = (props) => {
    const discussion = props.discussion
    return (
        <Card>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              className="dsc-content-header"
            >
                <p> {discussion.content}</p>
            </Grid>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                direction="row"
                className="mt-5"
              >
                <div className="flex-row r-flex-row r-comment-count-row r-wd-100"> 
                  <IconLabel
                  avatar={RocketIcon}
                  label={discussion.likes}
                  avatarWidth='25'
                  avatarHeight='25'
                  fontSize='16px'
                  style={{ color: '#B7B091', marginRight: '2rem' }}
                  />
                  <IconLabel
                  avatar={ChartIcon}
                  label="1230"
                  avatarWidth='25'
                  avatarHeight='25'
                  fontSize='16px'
                  style={{ color: '#B7B091' }}
                  />
                </div>
                <div className="flex-row r-flex-row">
                  <IconLabel
                  label={discussion.user_type == 1 ? 'anonymous' : discussion.user}
                  fontSize='16px'
                  style={{ color: '#B7B091', marginRight: '2rem' }}
                  />
                  <IconLabel
                  label="5 hrs ago"
                  fontSize='16px'
                  style={{ color: '#B7B091'}}
                  />
                </div>
              </Grid>
        </Card>
    )
}

export default DiscussionContent