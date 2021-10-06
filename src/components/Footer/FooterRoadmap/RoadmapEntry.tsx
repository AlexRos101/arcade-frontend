import React, { memo } from 'react'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  title: string
}

const useStyles = makeStyles((theme) => ({
  item: {
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1, 0),
    whiteSpace: 'nowrap',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

const FooterRoadmap = (props: Props) => {
  const classes = useStyles()

  return (
    <Typography
      variant="subtitle2"
      className={classes.item}>
      {props.title}
    </Typography>
  )
}

export default memo(FooterRoadmap)