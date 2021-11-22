import React from 'react'
import 'assets/css/loading.css'
import SkeletonAnim from '../assets/lotties/skeleton.json'
import Lottie from 'react-lottie-player'

interface Props {
  show: boolean
  style?: React.CSSProperties
}

const SkeletonLoading: React.FC<Props> = (props) => {
  if (props.show === true) {
    return (
      <Lottie loop animationData={SkeletonAnim} play style={props.style}/>
   )
  }

  return <div />
}

export default SkeletonLoading
