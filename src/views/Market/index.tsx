import React, { useEffect, useState, useRef } from "react"

import {
    Button
  } from '@material-ui/core'
import Page from 'components/Layout/Page'


import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Info from '@material-ui/icons/Info'

import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'


import MarketHeader from './components/MarketHeader'
import MarketRow from './components/MarketRow'
import CardSlider from './components/CardSlider'

import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import RowLabel from 'components/Label/RowLabel'
import ExpandButton from "components/Button/ExpandButton"


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
            <Header>
                <HeaderLabel>ArcadeMarket</HeaderLabel>
                <Info className="mh-auto ml-10 market-info-tag"/>
                <MarketHeader />
            </Header>
            <MarketRow>
                <RowLabel>ArcadeDoge Skins</RowLabel>
            </MarketRow>
            <MarketRow style={{flexDirection: 'row'}}>
                <CardSlider context={skinCards} />
                <ExpandButton>View All Skins</ExpandButton>
            </MarketRow>
            <MarketRow>
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
            <MarketRow style={{flexDirection: 'row'}}>
                <CardSlider context={mapsCards} />
                <ExpandButton>View All Maps</ExpandButton>
            </MarketRow>
        </Page>
    )
}

export default Market