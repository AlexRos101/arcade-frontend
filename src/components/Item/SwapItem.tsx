import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import CustomInput from './CustomInput'

interface SwapItemProps {
  avatar?: string
  label?: string
  avatarWidth?: string
  avatarHeight?: string
  fontSize?: string
  className?: string
  fontColor?: string
  style?: React.CSSProperties
  isInput?: boolean
  coinValue?: string
  coinName?: string
  onChange?: (value: string) => void
}

const SwapItem: React.FC<SwapItemProps>  = (props) => {
  return (
    <div className="flex-row">
      <div className="flex-row mr-35 r-flex-row">
        {props.avatar && <img src={props.avatar} width={props.avatarWidth} height={props.avatarHeight} style={{ marginRight: '10px', marginTop: 'auto', marginBottom: 'auto' }} alt=""/>}
        <Grid item>
          <Typography style={{ fontSize: props.fontSize, color: (props.fontColor?props.fontColor:'rgb(183, 176, 145)') }}>{props.label}</Typography>
        </Grid>
      </div>
      {
        props.isInput ?
        (<CustomInput
          placeholder={(<div className='flex-row r-flex-row'><div>{props.coinName}</div><div style={{ marginLeft: 'auto' }}>000</div></div>)}
          className="swap-input r-mt-px-10 ml-auto"
          style={{ marginTop: 'auto', marginBottom: 'auto', width: '220px' }}
          onChange={props.onChange}
        />) :
        (<div className="flex-row r-flex-row swap-label r-mt-px-10 ml-auto" style={{ width: '200px', paddingLeft: '11px', paddingRight: '11px' }}>
          <p className="ml-0">{props.coinName}</p>
          <p className="ml-auto r-ml-auto">{props.coinValue}</p>
        </div>)
      }
    </div>
  )
}

export default SwapItem
