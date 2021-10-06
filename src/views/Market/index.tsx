import React, { useEffect, useState, useRef } from "react"

import {
    Button
  } from '@material-ui/core'
import Page from 'components/Layout/Page'
import { createTheme, ThemeProvider  } from '@material-ui/core/styles';
import Info from '@material-ui/icons/Info'
import Storefront from '@material-ui/icons/Storefront'
import Link from '@material-ui/core/Link'
import Select from '@material-ui/core/Select';
import { Directions } from "@material-ui/icons";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"
import FormControl from '@material-ui/core/FormControl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card from "./Card";
import { ReactComponent as Sell } from "assets/img/sell.svg";


const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFCED',
        contrastText: '#308D7B',
      },
      secondary: {
        main: '#30C5A8',
        contrastText: '#FFFCED',
      },
    },
  });

  const skinCards = [
    {
        color: '#30C5A8',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#FB98B4',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#FCBF4A',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#1571FF',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#FF6C50',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#30C5A8',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#FB98B4',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#FCBF4A',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#1571FF',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#FF6C50',
        tokenId: '012345',
        price: 100
    },
]

const mapsCards = [
    {
        color: '#1571FF',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#FF6C50',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#FB98B4',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#FCBF4A',
        tokenId: '012345',
        price: 100
    },
    {
        color: '#30C5A8',
        tokenId: '012345',
        price: 100
    },
    
]

const Market = () => {
    const [maplevel, setMapLevel] = React.useState(0);
    

    return (
        <Page>
            <div className="market-row flex-row market-title "> 
                <p className="market-label mg-0 "> ArcadeMarket</p>
                <Info className="mh-auto ml-10 market-info-tag"/>
                <div className="right">
                    <ThemeProvider theme={theme}>
                        <Button
                            className="mg-8 market-listing-btn"
                            variant="contained"
                            color="primary"
                            startIcon={<Storefront />}>
                            View Your Listings
                        </Button>
                        <Button
                            className="mg-8 market-customizing-btn"
                            variant="contained"
                            color="secondary"
                            startIcon={<Sell />}>
                            Sell Customized Item
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
            <div className="market-row flex-row">
                <p className="market-sublabel mg-0 "> ArcadeDoge Skins</p>
            </div>
            <div className="market-row flex-row" style={{flexDirection: 'row'}}>
                <div className="market-slide">
                    <Slider slidesToShow={5} swipeToSlide={true} draggable={true} arrows={false}> 
                    {
                        skinCards.map(map => {
                            return ( <Card color={map.color} tokenId={map.tokenId} price={map.price} />)
                        })
                    }
                    </Slider>
                </div>
                <div className="market-expand">
                    <Link href="#" className="market-expand-link" >
                        <ArrowForwardIos fontSize="small" style={{margin: 'auto'}}/>
                        <p>View All Skins</p>
                    </Link>
                </div>
            </div>
            <div className="market-row flex-row">
                <p className="market-sublabel mg-0 "> Arcade Maps</p>
                <FormControl variant="outlined" className="market-form-control">
                    <Select
                        value={maplevel} className="market-map-select"
                        >
                        <option value={0}>All Difficulty</option>
                        <option value={1}>Easy</option>
                        <option value={2}>Normal</option>
                        <option value={3}>Difficult</option>
                        <option value={4}>Extreme</option>
                        </Select>
                </FormControl>
            </div>
            <div className="market-row flex-row" style={{flexDirection: 'row'}}>
                <div className="market-slide">
                    <Slider slidesToShow={5} swipeToSlide={true} draggable={true} arrows={false}> 
                    {
                        mapsCards.map(map => {
                            return ( <Card color={map.color} tokenId={map.tokenId} price={map.price} />)
                        })
                    }
                    </Slider>
                </div>
                <div className="market-expand">
                    <Link href="#" className="market-expand-link" >
                        <ArrowForwardIos fontSize="small" style={{margin: 'auto'}}/>
                        <p>View All Maps</p>
                    </Link>
                </div>
            </div>
        </Page>
    )
}

export default Market