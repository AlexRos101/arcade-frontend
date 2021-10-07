import React from 'react'
import { ScaleDefaults } from 'utils/constants/types'
import StyledToggle, { Input, Handle } from './StyledToggle'
import { ToggleProps } from './types'

const Toggle: React.FC<ToggleProps> = ({ checked, scale = ScaleDefaults.LG, ...props }) => {
  const isChecked = !!checked

  return (
    <StyledToggle checked={isChecked} scale={scale}>
      <Input checked={checked} scale={scale} {...props} type="checkbox" />
      <Handle checked={checked} scale={scale} />
    </StyledToggle>
  )
}

export default Toggle
