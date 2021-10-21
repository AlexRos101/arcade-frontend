import React from 'react'
import 'assets/css/loading.css'
import uploading from '../assets/lotties/uploading.json'
import Lottie from 'react-lottie-player'

interface Props {
  show: boolean
}

const Uploading: React.FC<Props> = (props) => {
  if (props.show === true) {
    return (
      <div id="loader-lotties-wrapper">
        <div id="loader-lotties">
          <Lottie loop animationData={uploading} play style={{ width: 150, height: 150 }} />
        </div>
      </div>
    )
  }

  return <div />
}

export default Uploading
