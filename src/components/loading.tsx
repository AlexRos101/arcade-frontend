import React from 'react'
import 'assets/css/loading.css'
import { store, useGlobalState } from 'state-pool'

store.setState('isLoading', false)

const Loading: React.FC = () => {
  const [isLoading] = useGlobalState('isLoading')
  if (isLoading === true) {
    return (
      <div id="loader-wrapper">
        <div className="loader-section" />
        <div id="loader">
          <div id="content" />
        </div>
      </div>
    )
  }

  return <div />
}

export default Loading
