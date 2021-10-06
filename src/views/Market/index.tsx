import React, { useEffect, useState, useRef } from "react"
import { useHistory } from "react-router"
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
import TabRow from "./components/TabRow"
import { stringify } from "querystring"

import OrderApprovalModal from "components/Modal/OrderApproval"


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

const dogeTab: Array<any> = [
    {
        categoryid: 0,
        tabName: "All"
    },
    {
        categoryid: 1,
        tabName: "MarsDoge Skins"
    },
    {
        categoryid: 2,
        tabName: "MarsDoge Maps"
    },
    {
        categoryid: 3,
        tabName: "Weapons"
    },
]

const Market = () => {
    const history = useHistory()

    const [maplevel, setMapLevel] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    
    const [selectedCard, setSelectedCard] = React.useState({color: '', tokenId: '', price: 0})

    const [testopen, setTestOpen] = React.useState(false)

    const [initialized, setInitialized] = useState(false);
    
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

        if (initialized) return;
        setInitialized(true);

        const getMarketItems = async () => {
            console.log('AAA');
        }

        getMarketItems();
    })

    const onClickMarsDogAll = () => {
        //history.push("/market/doge")
        setTestOpen(true)

    }

    const onClickOtherAll = () => {
        history.push("/market/other")
    }

    const handleTestClose = () => {
        setTestOpen(false)
    }

    return (
        <Page id="market_page">
            <Header>
                <HeaderLabel>ArcadeMarket</HeaderLabel>
                <Info className="mh-auto ml-10 market-info-tag"/>
                <MarketHeader />
            </Header>
            <MarketRow id="arcade_map">
                <RowLabel>MarsDoge</RowLabel>
            </MarketRow>
            <MarketRow>
                <TabRow tabs={dogeTab}/>
            </MarketRow>
            <MarketRow id="skin_slider">
                <CardSlider context={skinCards} onOpen={handleOpenCard} rows={1} open-ri/>
                <ExpandButton onClick={onClickMarsDogAll}>View All MarsDoge</ExpandButton>
            </MarketRow>
            <CardModal onClose={handleClose} open={open} color={selectedCard.color} tokenId={selectedCard.tokenId} price={selectedCard.price}/>
            <OrderApprovalModal onClose={handleTestClose} open={testopen} title='Skin #012345'/>
        </Page>
    )
}

export default Market