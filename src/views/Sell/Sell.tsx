import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Typography,
  Grid
} from '@material-ui/core'
import {
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'

import Card from 'components/Card'
import Flex from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      
    }
  })
)

const Sell = () => {
  return (
    <Page>
      <Header>
        <HeaderLabel>Sell Customized Item</HeaderLabel>
      </Header>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Card elevation={1}>
            <Flex flexDirection="column">
              <Typography>Category</Typography>
            </Flex>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card height="100%" bgColor="rgba(248, 244, 225, 1)">
          </Card>
        </Grid>
      </Grid>
    </Page>
  )
}

export default Sell;