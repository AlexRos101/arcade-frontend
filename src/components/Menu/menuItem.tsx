import React from 'react'

interface Props {
    text: string
}

const MenuItem: React.FC<Props> = (props) => {
    return (
        <button type="button" className="menu-item hd-100">{props.text}</button>
    )
}

export default MenuItem

