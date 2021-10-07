import React, { useCallback } from 'react'
import Page from 'components/Layout/Page'

import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'

import Info from '@material-ui/icons/Info'

import MarketHeader from '../components/MarketHeader'
import MarketRow from '../components/MarketRow'
import CardSlider from '../components/CardSlider'

import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import RowLabel from 'components/Label/RowLabel'

import { GameItem } from 'global/interface'

const skinCards = [
  {
    id: 0,
    color: '#30C5A8',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 1,
    color: '#FB98B4',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 2,
    color: '#FCBF4A',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 3,
    color: '#1571FF',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 4,
    color: '#FF6C50',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 5,
    color: '#30C5A8',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 6,
    color: '#FB98B4',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 7,
    color: '#FCBF4A',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 8,
    color: '#1571FF',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 9,
    color: '#FF6C50',
    tokenId: '012345',
    price: 100,
  },

  {
    id: 10,
    color: '#1571FF',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 0,
    color: '#FF6C50',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 0,
    color: '#FB98B4',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 0,
    color: '#FCBF4A',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 0,
    color: '#30C5A8',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 0,
    color: '#1571FF',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 0,
    color: '#FF6C50',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 0,
    color: '#FB98B4',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 0,
    color: '#FCBF4A',
    tokenId: '012345',
    price: 100,
  },
  {
    id: 0,
    color: '#30C5A8',
    tokenId: '012345',
    price: 100,
  },
]

const MarketOther: React.FC = () => {
  const maplevel = 0

  /* eslint-disable */

  const [open, setOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ color: '', tokenId: '', price: 0 })

  /* eslint-enable */

  const handleOpenCard = useCallback(
    (index: number) => {
      setOpen(true)
      setSelectedCard(skinCards[index])
    },
    [open, selectedCard, skinCards],
  )

  return (
    <Page id="market_page" className="styled-market">
      <Header>
        <HeaderLabel>ArcadeMarket</HeaderLabel>
        <Info className="mh-auto ml-10 market-info-tag" />
        <MarketHeader />
      </Header>
      <MarketRow id="arcade_map">
        <RowLabel>Another Game</RowLabel>
        <FormControl variant="outlined" className="market-form-control tab-select no-display">
          <Select value={maplevel} className="market-map-select">
            <option value={0}>Most Recent</option>
            <option value={1}>Price (Low to High)</option>
            <option value={2}>Price (High to Low)</option>
            <option value={3}>Popular</option>
          </Select>
        </FormControl>
      </MarketRow>
      <MarketRow>{/* <TabRow tabs={dogeTab}/> */}</MarketRow>
      <MarketRow id="skin_slider">
        <CardSlider context={skinCards as Array<GameItem>} onOpen={handleOpenCard} rows={2} open-ri />
      </MarketRow>
      {/* <CardModal onClose={handleClose} open={open} color={selectedCard.color} tokenId={selectedCard.tokenId} price={selectedCard.price}/> */}
    </Page>
  )
}

export default MarketOther
