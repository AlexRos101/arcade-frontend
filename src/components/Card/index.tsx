import styled from 'styled-components'
import { Paper } from '@material-ui/core'

const Card = styled(Paper)<{
  width?: string
  height?: string
  padding?: string
  border?: string
  borderRadius?: string,
  bgColor?: string
}>`
  width: ${({ width }) => width ?? 'inherit' };
  height: ${({ height }) => height ?? 'inherit' };
  padding: 1.25rem;
  padding: ${({ padding }) => padding };
  border: 1px solid ${({ border }) => border ?? '#EAE5CE' };
  border-radius: 7px;
  border-radius: ${({ borderRadius }) => borderRadius };
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.08);
  background-color: ${({ bgColor }) => bgColor ?? '#FFFEFB' };
`

export default Card