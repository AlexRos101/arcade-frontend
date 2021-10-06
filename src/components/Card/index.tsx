import styled from 'styled-components'
import { Paper } from '@material-ui/core'

const Card = styled.div<{
  width?: string
  height?: string
  padding?: string
  border?: string
  borderRadius?: string
  bgColor?: string
}>`
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width ?? 'inherit'};
  height: ${({ height, padding }) => {
    if (height) {
      return `calc(${height} - 2 * ${padding ?? '1.25rem'})`
    }
    return 'inherit'
  }};
  border: 1px solid ${({ border }) => border ?? '#EAE5CE'};
  border-radius: 7px;
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.08);
  background-color: ${({ bgColor }) => bgColor ?? '#FFFEFB'};
`

export const OutlinedCard = styled(Card)`
  background-color: transparent;
  box-shadow: none;
`

export default Card
