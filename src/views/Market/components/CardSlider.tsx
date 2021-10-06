import React from "react"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Link from '@material-ui/core/Link';
import Card from './Card'


interface tokenCard {
    color: string
    tokenId: string
    price: number
}

interface Props {
    context: Array<tokenCard>
    rows: number
    onOpen: (index: number) => void
}


const CardSlider: React.FC<Props>= (props) => {
    return (
        <div className="market-slide">
            <Slider slidesToShow={5} swipeToSlide={true} draggable={true} arrows={false} rows={props.rows}> 
            {
                props.context.map((map, index) => {
                    return (
                        <Card index={index} color={map.color} tokenId={map.tokenId} price={map.price} onClick={props.onOpen}/>
                    )
                })
            }
            </Slider>
        </div>
    )
}

export default CardSlider