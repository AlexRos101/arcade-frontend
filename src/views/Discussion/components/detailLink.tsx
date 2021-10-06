import React from "react"
import Link from '@material-ui/core/Link'
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"

interface Props {
    href: string
    content: string
}

const DetailLink: React.FC<Props> = (props => {
    console.log(props)
    return  (
        <Link className="discuss-detail-link flex-row r-flex-row" href={props.href}> {props.content} <ArrowForwardIos fontSize="small" style={{marginLeft:'0.5rem'}}/></Link>
    )
})

export default DetailLink