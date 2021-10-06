import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Grid
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/core/styles'

import Card, { OutlinedCard } from 'components/Card'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'

const Discussion = () => {
  return (
    <Page>
      <Header>
        <HeaderLabel>Community Discussiona</HeaderLabel>
      </Header>
      <Grid container spacing={1}>
        <Grid item sm={12} md={8}>    
          <Card>
          </Card>
        </Grid>
        <Grid item sm={12} md={4}>
          <OutlinedCard>
          </OutlinedCard>
        </Grid>
      </Grid>
    </Page>
  )
}

export default Discussion