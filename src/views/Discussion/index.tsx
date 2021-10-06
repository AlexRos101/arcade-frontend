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
import {
  makeStyles
} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

import AvatarIcon from 'assets/img/avatar.svg'
import RocketIcon from 'assets/img/rocket.svg'
import Card, { OutlinedCard } from 'components/Card'
import IconLabel from 'components/Label/IconLabel'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import { greenTheme } from 'styles/theme'

const useStyles = makeStyles({
  searchCardTitle: {
    color: '#9D9468'
  },
  searchCardBody: {
    color: '#433F2F'
  }
})

const Discussion = () => {
  const classes = useStyles()

  return (
    <Page>
      <Header>
        <HeaderLabel>Community Discussiona</HeaderLabel>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8}>    
          <Card>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              direction="row"
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
                      ArcadeDoge General Stuff
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
            <IconLabel
              avatar={RocketIcon}
              label="3035"
              style={{ color: '#B7B091' }}
            />
          </Card>
        </Grid>
        <Grid item sm={12} md={4}>
          <OutlinedCard>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              className={classes.searchCardTitle}
            >
              Looking for something specific?
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              className={classes.searchCardBody}
            >
              Try searching for it first before you create a discussion thread.
            </Typography>
            <TextField
              fullWidth
              placeholder="Search for Discussion"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              variant="outlined"
            />
          </OutlinedCard>
        </Grid>
      </Grid>
    </Page>
  )
}

export default Discussion