import React, { memo } from 'react'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

import Reddit from '../../assets/img/reddit.svg'
import Facebook from '../../assets/img/facebook.svg'
import Twitter from '../../assets/img/twitter.svg'
import Telegram from '../../assets/img/telegram.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0.5, 0),
    marginBottom: theme.spacing(2),
    marginLeft: 'auto',
    width: 'fit-content',
  },
  container: {
    flexDirection: 'row',
    '& > *': {
      margin: theme.spacing(0, 1, 0, 0),
    },
  },
  '@media (max-width: 1080px)': {
    root: {
      marginLeft: '0',
    },
  },
}))

const FooterFollowUs = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">Follow Us</Typography>
      <div className={classes.container}>
        <Link href="https://www.facebook.com/ArcadeToken">
          <img src={Facebook} alt="Facebook" />
        </Link>
        <Link href="https://www.reddit.com/r/ArcadeToken/">
          <img src={Reddit} alt="Reddit" />
        </Link>
        <Link href="https://t.me/ArcadeTokenOfficial">
          <img src={Telegram} alt="Telegram" />
        </Link>
        <Link href="https://twitter.com/_ArcadeToken">
          <img src={Twitter} alt="Twitter" />
        </Link>
      </div>
    </div>
  )
}

export default memo(FooterFollowUs)
