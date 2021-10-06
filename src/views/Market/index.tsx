import React, { useEffect, useState, useRef } from "react"
import { useHistory } from "react-router"
import {store, useGlobalState} from 'state-pool'
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
import * as API from '../../hooks/api'
import * as CONST from '../../global/const'

const dogeTab: Array<any> = [
    {
        categoryId: 0,
        tabName: "All"
    },
    {
        categoryId: 1,
        tabName: "MarsDoge Skins"
    },
    {
        categoryId: 2,
        tabName: "MarsDoge Maps"
    },
    {
        categoryId: 3,
        tabName: "Weapons"
    },
]

const Market = () => {
    const history = useHistory()

    const [maplevel, setMapLevel] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    
    const [selectedCard, setSelectedCard] = React.useState({id: 0, token_id: 0, name: '', description: '', arcadedoge_price: 0, owner: '', contract_address: ''})

    const [testopen, setTestOpen] = React.useState(false)

    const [initialized, setInitialized] = useState(false)
    const [marsdogeItems, setMarsdogeItems] = useState([])
    const [selectedCategoryName, setSelectedCategoryName] = useState('')

    const [isLoading, setIsLoading] = useGlobalState('isLoading')
    
    const handleClose = () => {
        setOpen(false)
    }

    const handleMarsDogeOpenCard = (index: number) => {
        setOpen(true)
        setSelectedCard(marsdogeItems[index])
        setSelectedCategoryName(getMarsDogeCategoryName((marsdogeItems[index] as any).category_id))
    }

    const getMarsDogeCategoryName = (categoryId: number) => {
        for (let i = 0; i < dogeTab.length; i++) {
            if (dogeTab[i].categoryId == categoryId) {
                return dogeTab[i].tabName
            }
        }
        return ''
    }

    const handleScroll = () => {
        if ($('#footer') != null && $(window) != undefined) {
            const offset = $('#footer').offset()
            const windows = $(window)
        }
    }

    const getMarketItems = async (game: number, category: number, sort: number) => {
        const items = await API.getMarketItems(game, category, sort, 0, 15)
        if (items.result) {
            return items.data
        }
        return []
    }

    const getMarsDogeItems = async (category: number, sort: number) => {
        const items = await getMarketItems(CONST.GAME_TYPE.MARSDOGE, category, sort)
        setMarsdogeItems(items)
    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)

        if (initialized) return;
        setInitialized(true);

        setIsLoading(true)
        getMarsDogeItems(0, 0)
        setIsLoading(false)
    })

    const onClickMarsDogAll = () => {
        history.push("/market/doge")
        //setTestOpen(true)
    }

    const onClickOtherAll = () => {
        history.push("/market/other")
    }

    const handleTestClose = () => {
        setTestOpen(false)
    }

    const refreshMarsDogePanel = async (category: number, sort: number) => {
        setIsLoading(true)

        getMarsDogeItems(category, sort)

        setIsLoading(false)
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
                <TabRow tabs={dogeTab} refresh={refreshMarsDogePanel}/>
            </MarketRow>
            <MarketRow id="skin_slider">
                <CardSlider context={marsdogeItems} onOpen={handleMarsDogeOpenCard} rows={1} open-ri/>
                <ExpandButton onClick={onClickMarsDogAll}>View All MarsDoge</ExpandButton>
            </MarketRow>
            <CardModal onClose={handleClose} open={open} item={selectedCard} category={selectedCategoryName}/>
            <OrderApprovalModal onClose={handleTestClose} open={testopen} title='Skin #012345'/>
        </Page>
    )
}

export default Market