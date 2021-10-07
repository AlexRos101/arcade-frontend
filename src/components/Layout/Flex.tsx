import styled from 'styled-components'

const Flex = styled.div<{
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'row'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
  align-items: ${({ alignItems }) => alignItems ?? 'center'};
`

export default Flex
