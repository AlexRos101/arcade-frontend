import React, { memo } from 'react'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

import { DEFAULT_FOOTER_ROADMAP } from '../../../utils/constants/footer-roadmap'
import RoadmapEntry from './RoadmapEntry'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(0.5, 0)
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 1.5)
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1.5)
  }
}))

const FooterRoadmap = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <Typography
          variant="subtitle1"
          className={classes.title}>
          Play Game
        </Typography>
        <Link href="#">
          <RoadmapEntry title="How to Play" />
        </Link>
        <Link href="#">
          <RoadmapEntry title="Buy ArcadeDoges" />
        </Link>
      </div>
      <div className={classes.block}>
        <Typography
          variant="subtitle1"
          className={classes.title}>
          ArcadeMarket
        </Typography>
        <Link href="#">
          <RoadmapEntry title="Sell Customized Item" />
        </Link>
        <Link href="#">
          <RoadmapEntry title="View Your Listings" />
        </Link>
      </div>
      <div className={classes.block}>
        <Typography
          variant="subtitle1"
          className={classes.title}>
          Community
        </Typography>
        <Link href="#">
          <RoadmapEntry title="Join the Official" />
        </Link>
        <Link href="#">
          <RoadmapEntry title="Discord Server!" />
        </Link>
      </div>
      <div className={classes.block}>
        <Typography
          variant="subtitle1"
          className={classes.title}>
          Company
        </Typography>
        <Link href="#">
          <RoadmapEntry title="Term of Use" />
        </Link>
        <Link href="#">
          <RoadmapEntry title="Privacy Policy" />
        </Link>
      </div>
    </div>
  )
}

export default memo(FooterRoadmap)