import React, { useEffect } from 'react'
import { styled } from '@material-ui/core/styles'
import Container from './Container'
import $ from 'jquery'

const StyledPage = styled(Container)({
  minHeight: 'calc(90vh - 222px)',
  paddingTop: '5vh',
  paddingBottom: '5vh'
})

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  useEffect(() => {
    if (window.location.pathname.indexOf('/market') >= 0)
      $('#footer').addClass('button-layout')
    else  
      $('#footer').removeClass('button-layout')
  })
  return (
    <>
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
