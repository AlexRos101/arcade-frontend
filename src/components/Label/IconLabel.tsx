import React, { ReactNode } from 'react'
import { Typography, Grid } from '@material-ui/core'

interface IconLabelProps {
  avatar?: string // React.FunctionComponent<SVGProps<SVGSVGElement>>,
  label: ReactNode
  avatarWidth?: string
  avatarHeight?: string
  fontSize?: string
  className?: string
  fontColor?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const IconLabel: React.FC<IconLabelProps> = (props) => {
  return (
    <Grid 
      alignItems="center" 
      direction="row" 
      style={props.style} 
      className={`flex-row r-flex-row ${props.className}`}
      onClick={props.onClick !== undefined ? props.onClick : undefined}
    >
      {props.avatar && <img src={props.avatar} width={props.avatarWidth} height={props.avatarHeight} style={{ marginRight: '10px' }} alt=""/>}
      <Grid item>
        <Typography style={{ fontSize: props.fontSize, color: (props.fontColor?props.fontColor:'rgb(183, 176, 145)') }}>{props.label}</Typography>
      </Grid>
    </Grid>
  )
}

export default IconLabel
