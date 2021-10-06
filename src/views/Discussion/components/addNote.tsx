import React, { useCallback } from 'react'
import { useGlobalState } from 'state-pool'

import { Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { OutlinedCard } from 'components/Card'
import DiscussionRule from 'components/Modal/DiscussionRule'

const useStyles = makeStyles({
  searchCardTitle: {
    color: '#9D9468',
  },
  searchCardBody: {
    color: '#433F2F',
  },
})

const AddNote: React.FC = () => {
  const classes = useStyles()

  const [openRule, setOpenRule] = useGlobalState('openDiscussionRule')

  const handleClose = useCallback(() => {
    setOpenRule(false)
  }, [openRule])

  const handleOpenRules = useCallback(() => {
    setOpenRule(true)
  }, [openRule])

  return (
    <OutlinedCard className="outlined-card">
      <Typography gutterBottom variant="h3" component="div" className={classes.searchCardTitle}>
        Keep discussions safe!
      </Typography>
      <Typography gutterBottom variant="subtitle1" component="div" className={classes.searchCardBody}>
        By posting a discussion thread, you agree to the{' '}
        <a href="#" onClick={handleOpenRules} className={classes.searchCardBody}>
          ArcadeDoge Discussion Rules & Regulation.
        </a>
      </Typography>
      <DiscussionRule onClose={handleClose} open={openRule} />
    </OutlinedCard>
  )
}

export default AddNote
