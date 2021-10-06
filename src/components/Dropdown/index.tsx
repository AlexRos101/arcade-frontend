import React from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import { ReactComponent as Cloud } from 'assets/img/cloud.svg'

const DropContainer = styled.div<{
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
  background-color: ${({ bgColor }) => bgColor ?? '#F8F4E1'};
`

interface Props {
  height?: string
  onDrop: (files: any) => void
}

const ItemDropdown: React.FC<Props> = (props) => {
  return (
    <DropContainer height={props.height}>
      <Dropzone onDrop={(files) => props.onDrop(files)} maxFiles={1} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div style={{ width: '100%', height: '100%' }}>
            <div
              {...getRootProps({
                className: 'dropzone',
                onDrop: (event) => event.stopPropagation(),
                maxFiles: 1,
              })}
              style={{ width: '100%', height: '100%' }}
            >
              <input {...getInputProps()} />
              <div className="drop-content">
                <Cloud className="mw-auto" style={{ marginTop: 'auto' }} />
                <p> Upload .rar or .zip file</p>
                <p style={{ fontWeight: 600, fontSize: '12px', lineHeight: '15px', marginBottom: 'auto' }}>
                  (thumbnail must be named <a style={{ color: '#308D7B' }}>‘thumbnail.png’</a>)
                </p>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    </DropContainer>
  )
}

export default ItemDropdown
