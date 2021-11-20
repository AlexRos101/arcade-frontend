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

import { useShow } from 'state/show/hook'
import { setTermOfUse, setPrivacyPolicy, setPointSwap } from 'state/show'
import { useAppDispatch } from '../../state'

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
  const dispatch = useAppDispatch()

  const { termOfUse, privacyPolicy, pointSwap } = useShow()

  const handleClose = useCallback(() => {
    dispatch(setTermOfUse(false))
  }, [dispatch])

  const handleClosePrivacy = useCallback(() => {
    dispatch(setPrivacyPolicy(false))
  }, [dispatch])

  const handleClosePointSwap = useCallback(() => {
    dispatch(setPointSwap(false))
  }, [dispatch])

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
      <TermOfUse onClose={handleClose} open={termOfUse} />
      <PrivacyPolicy onClose={handleClosePrivacy} open={privacyPolicy} />
      <PointSwap onClose={handleClosePointSwap} open={pointSwap} />
    </AppBar>
  )
}

export default memo(Footer)
