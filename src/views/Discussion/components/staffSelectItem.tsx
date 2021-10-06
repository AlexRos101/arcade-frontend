import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { FormControlLabel } from '@material-ui/core'

import { styled } from '@material-ui/core/styles'

import { Button, Grid, ThemeProvider, TextField, Typography, InputAdornment } from '@material-ui/core'

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.type === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.type === 'dark' ? '#394b59' : '#f5f8fa',
}))

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#B7B091',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,

    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#A7A071',
  },
})

interface Props {
  title: string
  index: number
  onChange?: any
  checked: boolean
}

const StaffSelectItem: React.FC<Props> = (props) => {
  const [checked, setChecked] = useState(props.checked)
  const handleChange = (event: any) => {
    setChecked(event.target.checked)
    props.onChange(event.target.checked, props.index)
  }
  return (
    <FormControlLabel
      control={
        <Checkbox
          icon={<BpIcon />}
          checkedIcon={<BpCheckedIcon />}
          style={{ transform: 'scale(1.25)' }}
          checked={checked}
          onChange={handleChange}
        />
      }
      label={<Typography className="staff-select-item">{props.title}</Typography>}
    />
  )
}

export default StaffSelectItem
