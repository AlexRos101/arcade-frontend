import React, { SVGProps } from "react"
import styled from "styled-components"
import {
  Typography,
  Grid
} from '@material-ui/core'

import avatar from 'assets/img/avatar.svg'
import { ScaleDefaults, ScaleTypes } from 'utils/constants/types'

const ImageWrapper = styled.img<{
  scales?: ScaleTypes
}>`
  width: ${({ scales }) => {
    if (!scales || scales === ScaleDefaults.SM) {
      return '18px'
    }
    if (scales === ScaleDefaults.MD) {
      return '18px'
    }
    return '30px'
  }};
  height: ${({ scales }) => {
    if (!scales || scales === ScaleDefaults.SM) {
      return '18px'
    }
    if (scales === ScaleDefaults.MD) {
      return '18px'
    }
    return '30px'
  }};
`

const PriceWrapper = styled.div<{
  scales?: ScaleTypes,
  foreColor?: string
}>`
  color: ${({ theme, foreColor }) => foreColor ?? theme.palette.text.primary };
  font-size: ${({ theme, scales }) => {
    if (!scales || scales === ScaleDefaults.SM) {
      return `${theme.typography.body1.fontSize}px`
    }
    if (scales === ScaleDefaults.MD) {
      return `${theme.typography.subtitle1.fontSize}px`
    }
    return `${theme.typography.h4.fontSize}px`
  }};
`

interface PriceLabelProps {
  scales: ScaleTypes,
  avatar: string, // React.FunctionComponent<SVGProps<SVGSVGElement>>,
  price: number,
  pricePerUsd: number,
}

const PriceLabelDefaults = {
  scales: ScaleDefaults.SM,
  avatar,
  price: 0,
  pricePerUsd: 0,
}

const PriceLabel = (props : Partial<PriceLabelProps> = {}) => {
  const params = {...PriceLabelDefaults, ...props}

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <ImageWrapper scales={params.scales} src={params.avatar} />
      </Grid>
      <Grid item>
        <PriceWrapper scales={params.scales}>
          {params.price}
        </PriceWrapper>
      </Grid>
      {/* <Grid item>
        <PriceWrapper scales={ScaleDefaults.SM} foreColor="rgba(34, 48, 61, 0.5)">
          {`(US$${params.pricePerUsd})`}
        </PriceWrapper>
      </Grid> */}
    </Grid>
  )
}

export default PriceLabel