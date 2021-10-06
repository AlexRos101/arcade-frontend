import React from 'react'
import { styled } from '@material-ui/core/styles'
import Container from './Container'

const StyledPage = styled(Container)({
  minHeight: 'calc(90vh - 222px)',
  paddingTop: '5vh',
  paddingBottom: '5vh'
})

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
