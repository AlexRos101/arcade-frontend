import { InputHTMLAttributes } from 'react'
import { ScaleTypes } from 'utils/constants/types'

export type ToggleTheme = {
  handleBackground: string
}

export interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  scale?: ScaleTypes
  checked?: boolean
}

export interface HandleProps {
  scale: ScaleTypes
  checked?: boolean
}

export interface InputProps {
  scale: ScaleTypes
}

export const scaleKeys = {
  handleBorderRadius: 'handleBorderRadius',
  handleHeight: 'handleHeight',
  handleWidth: 'handleWidth',
  handleLeft: 'handleLeft',
  handleTop: 'handleTop',
  checkedLeft: 'checkedLeft',
  toggleHeight: 'toggleHeight',
  toggleWidth: 'toggleWidth',
} as const

export type ScaleKeys = typeof scaleKeys[keyof typeof scaleKeys]
