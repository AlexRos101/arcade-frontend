import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import avatar from '../../assets/img/avatar.png'
import logo from '../../assets/img/logo.png'

const useStyles = makeStyles(() => ({
  logo: {
    display: 'flex'
  }
}))

const Logo = () => {
  const classes = useStyles()

  return (
    <Link href="#">
      <div className={classes.logo}>
        <img
          src={avatar}
          alt="avatar" />
        <img
          src={logo}
          alt="logo" />
      </div>
    </Link>
  )
}

export default memo(Logo)