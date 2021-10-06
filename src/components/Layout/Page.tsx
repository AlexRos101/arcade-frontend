import React from 'react'
import { styled } from '@material-ui/core/styles'
import Container from './Container'

const StyledPage = styled(Container)({
  minHeight: 'calc(100vh - 64px)',
  paddingTop: '16px',
  paddingBottom: '16px'
})

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
