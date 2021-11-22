import React, { ReactElement, useState } from 'react'
import Info from '@material-ui/icons/Info'

interface CustomInputProps {
  className?: string
  style?: React.CSSProperties
  placeholder?: string | ReactElement
  onChange?: (value: string) => void
  isAlert?: boolean
}

const CustomInput: React.FC<CustomInputProps>  = (props) => {
  const [hiddenHolder, setHiddenHolder] = useState(false)
  const [textValue, setTextValue] = useState('')
  const [inputCp, setInputCp] = useState<HTMLInputElement | null>()

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.currentTarget.value.length > 0)
      setHiddenHolder(true)
    else
      setHiddenHolder(false)
    setTextValue(e.currentTarget.value)
    if (props.onChange !== undefined)
      props.onChange(e.currentTarget.value)
  }

  const onFocus = () => {
    if (inputCp !== undefined && inputCp !== null)
      inputCp.focus()
  }

  const onLostFocus = () => {
    if (textValue.length === 0) {
      setHiddenHolder(false)
    }
  }

  return (
    <div 
      className={`custom-input ${props.className}`}
      style={props.style}
      onClick={onFocus}
      onBlur={onLostFocus}
    >
      <input
        ref = {inputEl => (setInputCp(inputEl))}
        type="text"
        value={textValue}
        style={{ textAlign: 'right' }}
        onChange={(e) => onInputChange(e)}
        className={props.isAlert ? 'alert-input' : ''}
        />
      {
        !hiddenHolder &&
        (<div className="placeholder">
          {props.placeholder}
        </div>)
      }
      <div className={`alert ${props.isAlert ? '' : 'cr-hidden'}`}>
          <span>
            <Info />
            <p>You don’t have enough balance</p>
          </span>
      </div>
    </div>
  )
}

export default CustomInput