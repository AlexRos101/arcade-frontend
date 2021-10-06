import React, { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  }
}))

const FooterContact = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography
        variant="body1"
        color="inherit">
        <p> ArcadeDoge Game © 2021. </p>
        <p> All Rights Reserved. </p>
      </Typography>
    </div>
  )
}

export default memo(FooterContact)