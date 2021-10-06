import React, {useCallback, useState, useEffect} from 'react'
import styled from 'styled-components'
import 'assets/css/loading.css'
import {store, useGlobalState} from 'state-pool'

store.setState('isLoading', false)

const Loading = () => {

    const [isLoading, setIsLoading] = useGlobalState('isLoading')
    console.log(isLoading)
    if (isLoading === true) {
        return (
            <div id="loader-wrapper">
                <div className="loader-section" />
                <div id="loader" >
                    <div id="content" />
                </div>
                
            </div>
        )
    }

    return (
        <div />
    )
    
}

export default Loading