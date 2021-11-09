import React, { memo, useCallback } from 'react'
import { AppBar } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import FooterContact from './FooterContact'
import FooterRoadmap from './FooterRoadmap'
import FooterFollowUs from './FooterFollowUs'
import TermOfUse from 'components/Modal/TermOfUse'
import PrivacyPolicy from 'components/Modal/PrivacyPolicy'
import PointSwap from 'components/Modal/PointSwap'
import { useCommonStyles } from '../../styles/use-styles'

import { store, useGlobalState } from 'state-pool'

store.setState('openTermOfUse', false)
store.setState('openPrivacyPolicy', false)
store.setState('openPointSwap', false)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    background: `${theme.palette.text.primary}`,
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
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
    },
  },
}))

const Footer = () => {
  const classes = useStyles()
  const commonClasses = useCommonStyles()

  const [openTerm, setOpenTerm] = useGlobalState('openTermOfUse')
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useGlobalState('openPrivacyPolicy')
  const [openPointSwap, setOpenPointSwap] = useGlobalState('openPointSwap')

  const handleClose = useCallback(() => {
    setOpenTerm(false)
  }, [setOpenTerm])

  const handleClosePrivacy = useCallback(() => {
    setOpenPrivacyPolicy(false)
  }, [setOpenPrivacyPolicy])

  const handleClosePointSwap = useCallback(() => {
    setOpenPointSwap(false)
  }, [setOpenPointSwap])

  return (
    <AppBar position="static" className={classes.root} id="footer">
      <Grid container className={clsx(classes.container, commonClasses.containerWidth)}>
        <Grid item md={3}>
          <FooterContact />
        </Grid>
        <Grid container item md={6} style={{ justifyContent: 'space-between' }}>
          <FooterRoadmap />
        </Grid>
        <Grid item md={3}>
          <FooterFollowUs />
        </Grid>
      </Grid>
      <TermOfUse onClose={handleClose} open={openTerm} />
      <PrivacyPolicy onClose={handleClosePrivacy} open={openPrivacyPolicy} />
      <PointSwap onClose={handleClosePointSwap} open={openPointSwap} />
    </AppBar>
  )
}

export default memo(Footer)
