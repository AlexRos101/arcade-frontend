import React from 'react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Card from './Card'
import { GameItem } from 'global/interface'

interface Props {
  context: Array<GameItem>
  rows: number
  onOpen: (index: number) => void
}

const CardSlider: React.FC<Props> = (props) => {
  const settings = {
    slidesToShow: props.context.length > 5 ? 5 : props.context.length,
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    rows: props.rows,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 5,
          variableWidth: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          variableWidth: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          variableWidth: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          variableWidth: true,
        },
      },
    ],
  }
  return (
    <div className={`market-slide-${props.rows}`}>
      <Slider {...settings}>
        {props.context.map((item, index) => {
          return (
            <Card
              key={index}
              index={index}
              tokenId={Number(item.token_id)}
              name={String(item.name)}
              price={Number(item.arcadedoge_price)}
              onClick={props.onOpen}
            />
          )
        })}
      </Slider>
    </div>
  )
}

export default CardSlider
