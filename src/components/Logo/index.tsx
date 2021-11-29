import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import avatar from '../../assets/img/avatar.png'

const useStyles = makeStyles(() => ({
  logo: {
    display: 'flex',
  },
  image: {},
  '@media (max-width: 1080px)': {
    image: {
      width: 'auto',
      height: '35px',
    },
    logo: {
      height: '35px',
      width: 'auto',
    },
  },
}))

const Logo = () => {
  const classes = useStyles()

  return (
    <Link href="/" className="no-underline">
      <div className={classes.logo}>
        <img src={avatar} alt="avatar" className={classes.image} />
        <span className="logo-title">ARCADE</span>
      </div>
    </Link>
  )
}

export default memo(Logo)
