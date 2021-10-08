import React from 'react'
import { styled } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 43,
    height: 18,
    padding: 2,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      color: '#A5A5A5',
      '&.Mui-checked': {
        transform: 'translateX(18px)',
        color: '#1571FF',
        '& + .MuiSwitch-track': {
          backgroundColor: '#C5DAF9',
          border: '1px solid #8FB4EC',
          opacity: 1,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.type === 'light' ? '#A5A5A5' : '#A5A5A5',
      },
      '&.MuiSwitch-track': {},
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 17,
      height: 11,
      margin: 2,
      borderRadius: 11,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#FDFCF8',
      border: '1px solid #D0CCB7',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }),
)
interface Props {
  value: boolean
  onChange?: () => unknown
}

const WltSwitchButton: React.FC<Props> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <IOSSwitch sx={{ m: 0 }} checked={props.value} onChange={props.onChange} />
    </div>
  )
}

export default WltSwitchButton
