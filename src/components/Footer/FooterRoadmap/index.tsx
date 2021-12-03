import React, { memo } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

import RoadmapEntry from './RoadmapEntry'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useAppDispatch } from '../../../state'
import { setTermOfUse, setPrivacyPolicy } from 'state/show'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(0.5, 0),
    width: '100%',
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 1.5),
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1.5),
  },
  '@media (max-width: 1080px)': {
    block: {
      marginLeft: '0',
      marginBottom: '5vh',
    },
  },
}))

const FooterRoadmap = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { account } = useArcadeContext()

  const onClickTermOfUse = () => {
    dispatch(setTermOfUse(true))
  }

  const onClickPrivacyPolicy = () => {
    dispatch(setPrivacyPolicy(true))
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={3} className="r-wd-50">
          <div className={classes.block}>
            <Typography variant="subtitle1" className={classes.title}>
              Play Game
            </Typography>
            <Link href="/">
              <RoadmapEntry title="MarsDoge" />
            </Link>
          </div>
        </Grid>
        <Grid item md={3} className="r-wd-50">
          <div className={classes.block}>
            <Typography variant="subtitle1" className={classes.title}>
              Arcade Market
            </Typography>
            <Link href="/sell">
              <RoadmapEntry title="Sell Customized Item" />
            </Link>
            { account !== '' && 
              (<Link href="/listing">
                <RoadmapEntry title="View Your Listings" />
              </Link>)
            }
          </div>
        </Grid>
        <Grid item md={3} className="r-wd-50">
          <div className={classes.block}>
            <Typography variant="subtitle1" className={classes.title}>
              Community
            </Typography>
            <Link href="/discussion">
              <RoadmapEntry title="Discussions" />
            </Link>
            <Link href="https://t.me/ArcadeTokenOfficial">
              <RoadmapEntry title="Telegram Chat" />
            </Link>
          </div>
        </Grid>
        <Grid item md={3} className="r-wd-50">
          <div className={classes.block}>
            <Typography variant="subtitle1" className={classes.title}>
              Company
            </Typography>
            <Link href="#" onClick={onClickTermOfUse}>
              <RoadmapEntry title="Term of Use" />
            </Link>
            <Link href="#" onClick={onClickPrivacyPolicy}>
              <RoadmapEntry title="Privacy Policy" />
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default memo(FooterRoadmap)
