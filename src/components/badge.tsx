import React from "react"

interface Props {
    type: string
    content: string
}

const Badge: React.FC<Props> = (props) => {
    return (<p className={`badge badge-${props.type}`}>{props.content}</p>)
}

export default Badge