import React, { SVGProps } from "react"
import styled from "styled-components"
import {
  Typography,
  Grid
} from '@material-ui/core'

interface IconLabelProps {
  avatar?: string, // React.FunctionComponent<SVGProps<SVGSVGElement>>,
  label: any,
  avatarWidth?: string,
  avatarHeight?: string,
  fontSize?: string,
  style?: React.CSSProperties
}

const IconLabel = (props : IconLabelProps) => {
  return (
    <Grid alignItems="center" direction="row" style={props.style} className="flex-row r-flex-row">
      <img src={props.avatar} width={props.avatarWidth} height={props.avatarHeight} style={{marginRight: '0.3rem'}}/>
      <Grid item>
        <Typography style={{fontSize:props.fontSize}}>
        {props.label}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default IconLabel