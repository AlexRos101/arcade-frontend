import React from 'react'
import 'assets/css/loading.css'
import MainLoading from 'components/MainLoading'
import { useShow } from 'state/show/hook'

const Loading: React.FC = () => {
  const { isLoading } = useShow()
  if (isLoading === true) {
    return (
      <div id="loader-wrapper">
        <div className="loader-section" />
        <MainLoading show={isLoading} />
        {/* <div id="loader">
          <div id="content" />
        </div> */}
      </div>
    )
  }

  return <div />
}

export default Loading
