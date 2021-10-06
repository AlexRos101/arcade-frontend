import React, { SVGProps } from "react"
import styled from "styled-components"
import {
  Typography,
  Grid
} from '@material-ui/core'

interface IconLabelProps {
  avatar: string, // React.FunctionComponent<SVGProps<SVGSVGElement>>,
  label: string,
  avatarWidth?: string,
  avatarHeight?: string,
  style?: React.CSSProperties
}

const IconLabel = (props : IconLabelProps) => {
  return (
    <Grid container spacing={1} alignItems="center" style={props.style}>
      <Grid item>
        <img src={props.avatar} width={props.avatarWidth} height={props.avatarHeight} />
      </Grid>
      <Grid item>
        <Typography>
        {props.label}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default IconLabel