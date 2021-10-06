import React, { useEffect } from 'react'
import { styled } from '@material-ui/core/styles'
import Container from './Container'
import $ from 'jquery'

const StyledPage = styled(Container)({
  paddingTop: '5vh',
  paddingBottom: 'calc(5vh + 160px)',
})

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  useEffect(() => {
    if (window.location.pathname.indexOf('/market') >= 0)
      $('#footer').addClass('button-layout')
    else  
      $('#footer').removeClass('button-layout')

    if (window.location.pathname == '/discussion' ||
        window.location.pathname.indexOf('/discussion/stuff') >= 0 ||
        window.location.pathname.indexOf('/discussion/details') >= 0 ||
        window.location.pathname.indexOf('/discussion/search') >= 0) {
      $('#footer').addClass('footer-search-layout')
    }
    else {
      $('#footer').removeClass('footer-search-layout')
    }

    if (window.location.pathname.indexOf('/discussion/new') >= 0)
      $('#footer').addClass('footer-rule-layout')
    else  
      $('#footer').removeClass('footer-rule-layout')
    
  })
  return (
    <>
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
