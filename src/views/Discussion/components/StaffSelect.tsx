import React, { useState, useCallback, useMemo } from 'react'

import { Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import StaffSelectItem from './StaffSelectItem'
import { OutlinedCard } from 'components/Card'

import { Stuff, Discussion } from 'global/interface'

const useStyles = makeStyles({
  searchCardTitle: {
    color: '#9D9468',
  },
  searchCardBody: {
    color: '#433F2F',
  },
})

interface Props {
  staffs: Array<Stuff>
  checkArray: Array<boolean>
  setCheckArray: (checkArray: Array<boolean>) => unknown
}

const StaffSelect: React.FC<Props> = (props) => {
  const classes = useStyles()

  const checkArray = useMemo(
    () => props.checkArray.map(check => {
      return check
    }),
    [props.checkArray]
  )

  const [initialized, setInitialized] = useState(false)

  if (checkArray.length > 0 && initialized === false) {
    setInitialized(true)
  }

  const onChange = useCallback(
    (checked: boolean, index: number) => {
      checkArray[index] = checked
      props.setCheckArray(checkArray)
      setInitialized(true)
    },
    [props, checkArray],
  )

  return (
    <OutlinedCard>
      <Typography gutterBottom variant="h3" component="div" className={classes.searchCardTitle}>
        Filter by Category:
      </Typography>
      {props.staffs.map((staff: Stuff, index: number) => {
        const discussions = staff.discussions as Array<Discussion>
        if (discussions.length === 0) {
          return ''
        }
        return <StaffSelectItem key={index} title={staff.title} index={index} checked={true} onChange={onChange} />
      })}
    </OutlinedCard>
  )
}

export default StaffSelect
