import React, { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
}))

const FooterContact = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="body1" color="inherit">
        ArcadeToken © 2021.
      </Typography>
      <Typography variant="body1" color="inherit">
        All Rights Reserved.
      </Typography>
    </div>
  )
}

export default memo(FooterContact)
