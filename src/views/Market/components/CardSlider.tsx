import React from "react"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Card from './Card'


interface tokenCard {
    color: string
    tokenId: string
    price: number
}

interface Props {
    context: Array<tokenCard>
}


const CardSlider: React.FC<Props>= (props) => {
    return (
        <div className="market-slide">
            <Slider slidesToShow={5} swipeToSlide={true} draggable={true} arrows={false}> 
            {
                props.context.map(map => {
                    return ( <Card color={map.color} tokenId={map.tokenId} price={map.price} />)
                })
            }
            </Slider>
        </div>
    )
}

export default CardSlider