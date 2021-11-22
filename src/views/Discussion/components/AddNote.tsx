import React, { useCallback } from 'react'

import { Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { OutlinedCard } from 'components/Card'
import DiscussionRule from 'components/Modal/DiscussionRule'
import { useAppDispatch } from 'state'
import { setDiscussionRule } from 'state/show'
import { useShow } from 'state/show/hook'

const useStyles = makeStyles({
  searchCardTitle: {
    color: '#9D9468',
  },
  searchCardBody: {
    color: '#5E5630',
  },
})

const AddNote: React.FC = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { discussionRule } = useShow()

  const handleClose = useCallback(() => {
    dispatch(setDiscussionRule(false))
  }, [dispatch])
  
  const handleOpenRules = useCallback(() => {
    dispatch(setDiscussionRule(true))
  }, [dispatch])

  /* eslint-disable */

  return (
    <OutlinedCard className="outlined-card">
      <Typography gutterBottom variant="h3" component="div" className={classes.searchCardTitle}>
        Keep discussions safe!
      </Typography>
      <Typography gutterBottom variant="subtitle1" component="div" className={classes.searchCardBody}>
        By posting a discussion thread, you agree to the{' '}
        <a href="#" onClick={handleOpenRules} className={classes.searchCardBody}>
          Arcade Discussion Rules & Regulation.
        </a>
      </Typography>
      <DiscussionRule onClose={handleClose} open={discussionRule} />
    </OutlinedCard>
  )

  /* eslint-enable */

}

export default AddNote
