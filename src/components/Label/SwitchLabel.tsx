import React, { ReactNode } from 'react'
import { Typography, Grid } from '@material-ui/core'
import SkeletonLoading from 'components/SkeletonLoading'

interface SwitchLabelProps {
  avatar?: string // React.FunctionComponent<SVGProps<SVGSVGElement>>,
  label: ReactNode
  avatarWidth?: string
  avatarHeight?: string
  fontSize?: string
  className?: string
  fontColor?: string
  style?: React.CSSProperties
}

const SwitchLabel: React.FC<SwitchLabelProps> = (props) => {
  return (
    <Grid alignItems="center" direction="row" style={props.style} className={`switch-label flex-row r-flex-row ${props.className}`}>
      <img src={props.avatar} width={props.avatarWidth} height={props.avatarHeight} style={{ marginRight: '5px' }} alt=""/>
      <Grid item>
        {
          props.label === 'NaN' ? 
          (
            <SkeletonLoading style={{ width: '40px', height: '31px', marginRight: '7px', marginTop: '-3px' }} show={true} />
          ) :
          (
            <Typography style={{ fontSize: props.fontSize, color: (props.fontColor?props.fontColor:'rgb(183, 176, 145)') }}>{props.label}</Typography>
          )
        }
      </Grid>
    </Grid>
  )
}

export default SwitchLabel
