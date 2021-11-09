import React, { ReactElement, useState } from 'react'

interface CustomInputProps {
  className?: string
  style?: React.CSSProperties
  placeholder?: string | ReactElement
  onChange?: () => void
}

const CustomInput: React.FC<CustomInputProps>  = (props) => {
  const [hiddenHolder, setHiddenHolder] = useState(false)
  const [textValue, setTextValue] = useState('')
  const [inputCp, setInputCp] = useState<HTMLInputElement | null>()

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTextValue(e.currentTarget.value)
  }

  const onFocus = () => {
    setHiddenHolder(true)
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
        onChange={(e) => onInputChange(e)}
        />
      {
        !hiddenHolder &&
        (<div className="placeholder">
          {props.placeholder}
        </div>)
      }
    </div>
  )
}

export default CustomInput