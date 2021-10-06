import React, { memo } from 'react'
import { AppBar } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import FooterContact from './FooterContact'
import FooterRoadmap from './FooterRoadmap'
import FooterFollowUs from './FooterFollowUs'
import { useCommonStyles } from '../../styles/use-styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    background: `${theme.palette.text.primary}`
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: theme.palette.text.secondary,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  }
}))

const Footer = () => {
  const classes = useStyles()
  const commonClasses = useCommonStyles()

  return (
    <AppBar
      position="static"
      className={classes.root}>

      <Grid
        container
        className={clsx(classes.container, commonClasses.containerWidth)}>
        <Grid item md={4}>
          <FooterContact />
        </Grid>
        <Grid container item md={8} style={{ justifyContent: 'space-between' }} >
          {/* <Grid item md={9}> */}
            <FooterRoadmap />
          {/* </Grid> */}
          {/* <Grid item md={3}> */}
            <FooterFollowUs />
          {/* </Grid> */}
        </Grid>
      </Grid>


      {/* <Grid
        container
        className={clsx(classes.container, commonClasses.containerWidth)}>
        <Grid item sm={12} md={4}>
          <FooterContact />
        </Grid>
        <Grid item sm={12} md={4}>
          <FooterRoadmap />
        </Grid>
        <Grid item sm={12} md={4}>
          <Grid container>
            <Grid item md={12}>
              <FooterFollowUs />
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </AppBar>
  )
}

export default memo(Footer)