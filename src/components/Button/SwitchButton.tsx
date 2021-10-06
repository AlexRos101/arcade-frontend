import React from "react"
import { styled } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 66,
    height: 27,
    padding: 2,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      color: '#A5A5A5',
      '&.Mui-checked': {
        transform: 'translateX(27px)',
        color: '#30C5A8',
        '& + .MuiSwitch-track': {
          backgroundColor: '#FDFCF8',
          border: '1px solid #30C5A8',
          opacity: 1
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
        color:
          theme.palette.type === 'light'
            ? '#A5A5A5'
            : '#A5A5A5',
      },
      '&.MuiSwitch-track': {
        
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 31,
      height: 20,
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
  }))
interface Props {
    value: boolean,
    onChange: any,
    text: string, 
}

const SwitchButton: React.FC<Props>= (props) => {
    return (
        <div  
         style={{
          display:'flex', 
          flexDirection: 'row', 
          }}>
            <IOSSwitch sx={{ m: 0 }} value={props.value} onChange={props.onChange}/>
            <p style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '13px',
                lineHeight: '16px',
                color: '#B7B091',
                whiteSpace: 'nowrap',
                margin: '6px 0px',
                }}>
                    {props.text}
            </p>
        </div>
    )
}

export default SwitchButton;