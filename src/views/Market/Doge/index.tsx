import React, { useEffect, useState, useCallback } from 'react'
import { useGlobalState } from 'state-pool'
import { TablePagination } from '@material-ui/core'
import Page from 'components/Layout/Page'

import Info from '@material-ui/icons/Info'

import MarketHeader from '../components/MarketHeader'
import MarketRow from '../components/MarketRow'
import CardModal from '../components/CardModal'
import Card from '../components/Card'

import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import RowLabel from 'components/Label/RowLabel'
import TabRow from '../components/TabRow'

import { GameItem, CategoryTab } from 'global/interface'

import * as API from 'hooks/api'
import * as CONST from 'global/const'

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

const MarketDoge: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState<GameItem>({
    id: 0,
    token_id: 0,
    name: '',
    description: '',
    arcadedoge_price: '0.0',
    owner: '',
    contract_address: '',
  })
  const [marsdogeItems, setMarsdogeItems] = useState<Array<GameItem>>([])

  const [initialized, setInitialized] = useState(false)

  /* eslint-disable */

  const [isLoading, setIsLoading] = useGlobalState('isLoading')

  /* eslint-enable */

  const [selectedCategoryName, setSelectedCategoryName] = useState('')

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [count, setCount] = useState(0)

  const getMarketItems = async (game: number, category: number, sort: number, limit: number, count: number) => {
    setIsLoading(true)
    const items = await API.getMarketItems(game, category, sort, limit, count)
    setIsLoading(false)
    if (items.result) {
      setCount(Number(items.total))
      return items.data
    }
    return []
  }

  const getMarsDogeItems = useCallback(
    async (category: number, sort: number, limit: number, cnt: number) => {
      const items = await getMarketItems(CONST.GAME_TYPE.MARSDOGE, category, sort, limit, cnt)

      setMarsdogeItems(items)
    },
    [marsdogeItems],
  )

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [open])

  const handleOpenCard = useCallback(
    (index: number) => {
      setOpen(true)
      setSelectedCard(marsdogeItems[index])
      setSelectedCategoryName(getMarsDogeCategoryName(Number((marsdogeItems[index] as GameItem).category_id)))
    },
    [open, selectedCategoryName, selectedCard, marsdogeItems],
  )

  const getMarsDogeCategoryName = useCallback(
    (categoryId: number) => {
      for (let i = 0; i < dogeTab.length; i++) {
        if (dogeTab[i].categoryId == categoryId) {
          return dogeTab[i].tabName
        }
      }
      return ''
    },
    [dogeTab],
  )

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage)

      getMarsDogeItems(0, 0, newPage * rowsPerPage, rowsPerPage)
    },
    [page],
  )

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value)
      setPage(0)

      getMarsDogeItems(0, 0, 0, +event.target.value)
    },
    [rowsPerPage, page],
  )

  const refreshMarsDogePanel = useCallback(async (category: number, sort: number) => {
    setIsLoading(true)

    getMarsDogeItems(category, sort, page * rowsPerPage, rowsPerPage)

    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    setIsLoading(true)
    getMarsDogeItems(0, 0, 0, 10)
    setIsLoading(false)
  })

  return (
    <Page id="market_page" className="styled-market ">
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
      <MarketRow
        id="skin_slider"
        className="flex-row r-flex-row"
        style={{ flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {marsdogeItems.map((item: GameItem, index) => {
          return (
            <Card
              key={index}
              index={index}
              tokenId={Number(item.token_id)}
              name={String(item.name)}
              price={Number(item.arcadedoge_price)}
              onClick={handleOpenCard}
            />
          )
        })}
        {/* <CardSlider context={marsdogeItems} onOpen={handleOpenCard} rows={2} open-ri/> */}
      </MarketRow>
      <MarketRow style={{ borderTop: '1px solid #EFECDC' }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ marginLeft: 'auto' }}
        />
      </MarketRow>
      <CardModal onClose={handleClose} open={open} item={selectedCard} category={selectedCategoryName} />
    </Page>
  )
}

export default MarketDoge
