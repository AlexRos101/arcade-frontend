import React, { memo } from 'react'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

import Discord from '../../assets/img/discord.svg'
import Facebook from '../../assets/img/facebook.svg'
import Twitter from '../../assets/img/twitter.svg'
import Instagram from '../../assets/img/instagram.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0.5, 0),
    marginBottom: theme.spacing(2),
  },
  container: {
    flexDirection: 'row',
    '& > *': {
      margin: theme.spacing(0, 1, 0, 0)
    }
  }
}))

const FooterFollowUs = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography
        variant="subtitle1">
        Follow Us
      </Typography>
      <div className={classes.container}>
        <Link href="https://www.reddit.com/r/ArcadeDoge">
          <img
            src={Discord}
            alt="Discord" />
        </Link>
        <Link href="https://www.facebook.com/ArcadeDoge/">
          <img
            src={Facebook}
            alt="Facebook" />
        </Link>
        <Link href="https://twitter.com/ArcadeDoge">
          <img
            src={Twitter}
            alt="Twitter" />
        </Link>
        <Link href="https://t.me/ArcadeDoge">
          <img
            src={Instagram}
            alt="Instagram" />
        </Link>
      </div>
    </div>
  )
}

export default memo(FooterFollowUs)