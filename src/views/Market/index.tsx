import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router'
import Page from 'components/Layout/Page'
import '../../assets/css/loading.css'

import Info from '@material-ui/icons/Info'

import MarketHeader from './components/MarketHeader'
import MarketRow from './components/MarketRow'
import CardSlider from './components/CardSlider'
import CardModal from './components/CardModal'

import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import RowLabel from 'components/Label/RowLabel'
import ExpandButton from 'components/Button/ExpandButton'
import TabRow from './components/TabRow'
import { GameItem } from 'global/interface'
import MainLoading from 'components/mainLoading'

import OrderApprovalModal from 'components/Modal/OrderApproval'
import * as API from '../../hooks/api'
import * as CONST from '../../global/const'
import { CategoryTab } from 'global/interface'

const dogeTab: Array<CategoryTab> = [
  {
    categoryId: 0,
    tabName: 'All',
  },
  {
    categoryId: 1,
    tabName: 'MarsDoge Skins',
  },
  {
    categoryId: 2,
    tabName: 'MarsDoge Maps',
  },
  {
    categoryId: 3,
    tabName: 'Weapons',
  },
]

const Market: React.FC = () => {
  const history = useHistory()
  const [open, setOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({
    id: 0,
    token_id: 0,
    name: '',
    description: '',
    arcadedoge_price: '0.0',
    owner: '',
    contract_address: '',
  })

  const [testopen, setTestOpen] = React.useState(false)

  const [initialized, setInitialized] = useState(false)
  const [marsdogeItems, setMarsdogeItems] = useState([])
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [showLoading, setShowLoading] = useState(true)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [open])

  const handleMarsDogeOpenCard = useCallback(
    (index: number) => {
      setOpen(true)
      setSelectedCard(marsdogeItems[index])
      setSelectedCategoryName(getMarsDogeCategoryName(Number((marsdogeItems[index] as GameItem).category_id)))
    },
    [open, selectedCard, selectedCategoryName, marsdogeItems],
  )

  const getMarsDogeCategoryName = useCallback(
    (categoryId: number) => {
      for (let i = 0; i < dogeTab.length; i++) {
        if (dogeTab[i].categoryId === categoryId) {
          return dogeTab[i].tabName
        }
      }
      return ''
    },
    [dogeTab],
  )

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
    if (initialized) return
    setInitialized(true)

    setShowLoading(true)
    getMarsDogeItems(0, 0)
    setShowLoading(false)
  })

  const onClickMarsDogAll = useCallback(() => {
    history.push('/market/doge')
    //setTestOpen(true)
  }, [])

  const handleTestClose = useCallback(() => {
    setTestOpen(false)
  }, [])

  const refreshMarsDogePanel = useCallback(async (category: number, sort: number) => {
    setShowLoading(true)

    getMarsDogeItems(category, sort)

    setShowLoading(false)
  }, [])

  return (
    <Page id="market_page" className="styled-market">
      <MainLoading show={showLoading} />
      <Header>
        <HeaderLabel>ArcadeMarket</HeaderLabel>
        <Info className="mh-auto ml-10 market-info-tag" />
        <MarketHeader />
      </Header>
      <MarketRow id="arcade_map">
        <RowLabel>MarsDoge</RowLabel>
      </MarketRow>
      <MarketRow>
        <TabRow tabs={dogeTab} refresh={refreshMarsDogePanel} />
      </MarketRow>
      <MarketRow id="skin_slider">
        <CardSlider context={marsdogeItems} onOpen={handleMarsDogeOpenCard} rows={1} open-ri />
        <ExpandButton onClick={onClickMarsDogAll}>View All MarsDoge</ExpandButton>
      </MarketRow>
      <CardModal onClose={handleClose} open={open} item={selectedCard} category={selectedCategoryName} />
      <OrderApprovalModal onClose={handleTestClose} open={testopen} title="Skin #012345" />
    </Page>
  )
}

export default Market
