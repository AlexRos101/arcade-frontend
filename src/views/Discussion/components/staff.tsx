import React, { useState, useEffect } from 'react'
import {
    Button,
    Grid,
    ThemeProvider,
    TextField,
    Typography,
    InputAdornment
  } from '@material-ui/core'

import AvatarIcon from 'assets/img/avatar.svg'
import Card from 'components/Card'
import DiscussItem from './discussItem'
import DetailLink from './detailLink'
import { getAllDiscussion } from 'hooks/api'

import { greenTheme } from 'styles/theme'

interface Props {
  staff: any,
  link?: boolean,
}

const Staff: React.FC<Props> = (props => {
    const staff = props.staff
    const [discussions, setDiscussions] = useState<any[]>([])
    const [dscIsSet, setDscIsSet] = useState(false)

    useEffect(() => {
      if (dscIsSet == false) {
        setDscIsSet(true)
        getAllDiscussion(staff.id, 0, 3).then( (data) => {
          setDiscussions(data)
        })
      }
    })
    
    return (
      <div style={{marginBottom:'2rem'}}>
        <Card>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              className="staff-header"
            >
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <img src={AvatarIcon} width="34px" height="34px" />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h3"
                      style={{ color: '#FF6C50' }}
                    >
                      {staff.title}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <ThemeProvider theme={greenTheme}>
                  <Button
                    variant="outlined"
                    color="primary">
                    + Add Discussion Thread
                  </Button>
                </ThemeProvider>
              </Grid>
            </Grid>
            {
                discussions.map((discussion, index) => {
                    return (
                        <DiscussItem content={discussion}/>
                    )
                })
            }
        </Card>
        {
          props.link == false?
            '' :
            (<DetailLink href={`/discussion/${staff.id}`} content={`View All ${staff.title} Discussions`}></DetailLink>)
            
        }
        
      </div>
    )
})

export default Staff