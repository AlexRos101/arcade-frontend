import React, { useEffect, useState, useRef } from "react"
import ReactDOM from 'react-dom'
import {
    Button
  } from '@material-ui/core'
import Page from 'components/Layout/Page'
import $ from 'jquery'

import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Info from '@material-ui/icons/Info'

import MarketHeader from './components/MarketHeader'
import MarketRow from './components/MarketRow'
import CardSlider from './components/CardSlider'
import CardModal from './components/CardModal'

import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import RowLabel from 'components/Label/RowLabel'
import ExpandButton from "components/Button/ExpandButton"
import { stringify } from "querystring"


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
    const [maplevel, setMapLevel] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({color: '', tokenId: '', price: 0})
    
    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenCard = (index: number) => {
        setOpen(true)
        setSelectedCard(skinCards[index])
    }

    const handleOpenMaps = (index: number) => {
        setOpen(true)
        setSelectedCard(mapsCards[index])
    }

    const handleScroll = () => {
        if ($('#footer') != null && $(window) != undefined) {
            const offset = $('#footer').offset()
            const windows = $(window)
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
    })

    return (
        <Page id="market_page">
            <Header>
                <HeaderLabel>ArcadeMarket</HeaderLabel>
                <Info className="mh-auto ml-10 market-info-tag"/>
                <MarketHeader />
            </Header>
            <MarketRow>
                <RowLabel>ArcadeDoge Skins</RowLabel>
            </MarketRow>
            <MarketRow id="skin_slider">
                <CardSlider context={skinCards} onOpen={handleOpenCard} open-ri/>
                <ExpandButton>View All Skins</ExpandButton>
            </MarketRow>
            <MarketRow id="arcade_map">
                <RowLabel> Arcade Maps</RowLabel>
                <FormControl variant="outlined" className="market-form-control">
                    <Select value={maplevel} className="market-map-select">
                        <option value={0}>All Difficulty</option>
                        <option value={1}>Easy</option>
                        <option value={2}>Normal</option>
                        <option value={3}>Difficult</option>
                        <option value={4}>Extreme</option>
                    </Select>
                </FormControl>
            </MarketRow>
            <MarketRow id="map_slider">
                <CardSlider context={mapsCards} onOpen={handleOpenMaps} open-ri/>
                <ExpandButton>View All Maps</ExpandButton>
            </MarketRow>
            <CardModal onClose={handleClose} open={open} color={selectedCard.color} tokenId={selectedCard.tokenId} price={selectedCard.price}/>
        </Page>
    )
}

export default Market