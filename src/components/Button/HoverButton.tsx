import React from 'react'
import styled from 'styled-components'
import AutorenewIcon from '@material-ui/icons/Autorenew'

const HoverContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  display: flex;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  color: #e0e0e0;
`

const HoverButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <HoverContainer {...props} className="fade">
      <div className="mw-auto mh-auto flex-column ">
        <AutorenewIcon className="mw-auto mb-5" style={{ fontSize: '60px' }} />
        {children}
      </div>
    </HoverContainer>
  )
}

export default HoverButton
