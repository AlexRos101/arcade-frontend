import React, { useEffect, useState, useRef } from "react"
import ReactDOM from 'react-dom'
import {store, useGlobalState} from 'state-pool'
import {
    Button,
    Grid,
    TablePagination
  } from '@material-ui/core'
import Page from 'components/Layout/Page'
import $ from 'jquery'

import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'

import Info from '@material-ui/icons/Info'

import MarketHeader from '../components/MarketHeader'
import MarketRow from '../components/MarketRow'
import CardSlider from '../components/CardSlider'
import CardModal from '../components/CardModal'
import TabRow from "../components/TabRow"
import Container from "components/Layout/Container"
import Card from "../components/Card"

import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import RowLabel from 'components/Label/RowLabel'
import ExpandButton from "components/Button/ExpandButton"

import { stringify } from "querystring"


import * as API from 'hooks/api'
import * as CONST from 'global/const'

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


const MarketDoge = () => {
    
    const [maplevel, setMapLevel] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({id: 0, token_id: 0, name: '', description: '', arcadedoge_price: 0, owner: '', contract_address: ''})
    const [marsdogeItems, setMarsdogeItems] = useState([])

    const [initialized, setInitialized] = useState(false)
    const [isLoading, setIsLoading] = useGlobalState('isLoading')
    const [selectedCategoryName, setSelectedCategoryName] = useState('')

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState<Array<any>>([])
    const [count, setCount] = useState(0)


    const getMarketItems = async (game: number, category: number, sort: number, limit: number, count: number) => {
        setIsLoading(true)
        const items = await API.getMarketItems(game, category, sort, limit, count)
        setIsLoading(false)
        if (items.result) {
            setCount(items.total)
            return items.data
        }
        return []
    }

    const getMarsDogeItems = async (category: number, sort: number, limit: number, cnt: number) => {
        const items = await getMarketItems(CONST.GAME_TYPE.MARSDOGE, category, sort, limit, cnt)
        
        setMarsdogeItems(items)
    }
    
    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenCard = (index: number) => {
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

    const handleOpenMaps = (index: number) => {
        setOpen(true)
        setSelectedCard(marsdogeItems[index])
    }

    const handleScroll = () => {
        if ($('#footer') != null && $(window) != undefined) {
            const offset = $('#footer').offset()
            const windows = $(window)
        }
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)

        getMarsDogeItems(0, 0, newPage * rowsPerPage, rowsPerPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)

        getMarsDogeItems(0, 0, 0, (+event.target.value))
    }

    useEffect(() => {
        if (initialized) return;
        setInitialized(true);

        document.addEventListener('scroll', handleScroll)

        setIsLoading(true)
        getMarsDogeItems(0, 0, 0, 10)
        setIsLoading(false)
    })

    return (
        <Page id="market_page" className="styled-market ">
            <Header>
                <HeaderLabel>ArcadeMarket</HeaderLabel>
                <Info className="mh-auto ml-10 market-info-tag"/>
                <MarketHeader />
            </Header>
            <MarketRow id="arcade_map">
                <RowLabel>MarsDoge</RowLabel>
                <FormControl variant="outlined" className="market-form-control tab-select no-display">
                    <Select value={maplevel} className="market-map-select">
                        <option value={0}>Most Recent</option>
                        <option value={1}>Price (Low to High)</option>
                        <option value={2}>Price (High to Low)</option>
                        <option value={3}>Popular</option>
                    </Select>
                </FormControl>
            </MarketRow>
            <MarketRow>
                {/* <TabRow tabs={dogeTab}/> */}
            </MarketRow>
            <MarketRow id="skin_slider" style={{flexWrap:'wrap'}}>
                {
                    marsdogeItems.map((item: any, index) => {
                        return (<Card index={index} tokenId={item.token_id} name={item.name} price={item.arcadedoge_price} onClick={handleOpenCard}/>)
                    })
                }
                {/* <CardSlider context={marsdogeItems} onOpen={handleOpenCard} rows={2} open-ri/> */}
            </MarketRow>
            <MarketRow style={{borderTop:'1px solid #EFECDC'}}>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{marginLeft: 'auto'}}
                    />
            </MarketRow>
            <CardModal onClose={handleClose} open={open} item={selectedCard} category={selectedCategoryName}/>
        </Page>
    )
}

export default MarketDoge