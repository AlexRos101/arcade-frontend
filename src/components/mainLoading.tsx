import React from 'react'
import 'assets/css/loading.css'
import mainLoading from '../assets/lotties/main-loading.json'
import Lottie from 'react-lottie-player'

interface Props {
  show: boolean
}

const MainLoading: React.FC<Props> = (props) => {
  if (props.show === true) {
    return (
      <div id="loader-wrapper">
        <div id="loader-lotties">
          <Lottie loop animationData={mainLoading} play style={{ width: 150, height: 150 }} />
        </div>
      </div>
    )
  }

  return <div />
}

export default MainLoading
