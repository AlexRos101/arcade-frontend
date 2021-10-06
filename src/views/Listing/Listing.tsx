import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import { Button } from '@material-ui/core'

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.success.main};
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 4px 10px;
  font-size: 13px;
`

const Listing = () => {
  return (
    <Page>
      <Header>
        <HeaderLabel>Listing</HeaderLabel>
      </Header>
      <StyledButton>Hello</StyledButton>
    </Page>
  )
}

export default Listing;