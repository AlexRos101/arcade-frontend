import { useContext } from 'react'
import { ArcadeContext, ArcadeContextValue } from 'contexts/ArcadeContext'

export const useArcadeContext = () => {
  const context = useContext(ArcadeContext) as ArcadeContextValue
  if (!context) {
    throw new Error(
      'Make sure to only call useArcadeContext within a  <ArcadeProvider>'
    )
  }
  return context
}