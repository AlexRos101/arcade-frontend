import React from 'react'
import { Box } from '@material-ui/core'

const Container: React.FC = ({ children, ...props }) => (
  <Box px={['16px', '24px']} mx="auto" maxWidth="1040px" {...props}>
    {children}
  </Box>
)

export default Container
