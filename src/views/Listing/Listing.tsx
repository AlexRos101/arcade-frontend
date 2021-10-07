import React, { useState, useEffect, useCallback } from 'react'
import { Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import MainLoading from 'components/mainLoading'
import Paper from '@material-ui/core/Paper'
import { useGlobalState } from 'state-pool'
import * as CONST from '../../global/const'

import Card from 'components/Card'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import * as API from '../../hooks/api'
import ListSellModal from 'components/Modal/ListSell'
import RemoveSellModal from 'components/Modal/RemoveSell'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import * as Wallet from '../../global/wallet'
import ERC721 from '../../contracts/ERC721.json'
import EXCHANGE from '../../contracts/EXCHANGE.json'
import RedPagination from 'components/Pagination/RedPagination'

import Row from './components/Row'
import { GameItem } from 'global/interface'

const useStyles = makeStyles({
  tableContainer: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  usdPrice: {
    color: 'rgba(34, 48, 61, 0.5)',
  },
})

const Listing: React.FC = () => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(10)
  const [rows, setRows] = useState<Array<GameItem>>([])
  const [count, setCount] = useState(0)
  const [initialized, setInitialized] = useState(false)
  const [showListModal, setShowListModal] = useState(false)
  const [showUnlistModal, setShowUnlistModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GameItem>({ id: -1, name: '', token_id: 0 })
  const [showLoading, setShowLoading] = useState(true)

  /* eslint-disable */

  const [showConnectWalletModal, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')
  const [isLoading, setIsLoading] = useGlobalState('isLoading')

  /* eslint-enable */

  const [rate, setRate] = useState(0.0)

  const handleChangePage = useCallback(
    (newPage: number) => {
      setPage(newPage)
      getMyItems(newPage * rowsPerPage, rowsPerPage)
    },
    [page, rowsPerPage],
  )

  const getMyItems = useCallback(
    async (limit: number, cnt: number) => {
      const address = await Wallet.getCurrentWallet()
      if (address == null) {
        return
      }
      setShowLoading(true)

      // setRows([])
      const items = await API.getItemsByAddress(address, CONST.SORT_TYPE.NONE, limit, cnt)
      setCount(Number(items.total))
      setRows(items.data)
      console.log(items.data)

      setShowLoading(false)
    },
    [rows, count, showLoading],
  )

  const toggleVisibility = async (index: number) => {
    if (rows[index].is_visible) {
      setSelectedItem(rows[index])
      setShowUnlistModal(true)
    } else {
      setSelectedItem(rows[index])
      setShowListModal(true)
    }
  }

  const burnToken = async (index: number) => {
    setIsLoading(true)

    if (!(await Wallet.isConnected())) {
      setIsLoading(false)
      setShowConnectWalletModal(true)
      return
    }

    const provider = await Wallet.getCurrentProvider()
    const address = await Wallet.getCurrentWallet()

    const web3 = new Web3(provider)
    const NFT = new web3.eth.Contract(ERC721 as AbiItem[], process.env.REACT_APP_NFT_ADDRESS)

    NFT.methods
      .burn(rows[index].token_id)
      .send({ from: address })
      .then(() => {
        const checkItemStatus = async () => {
          const item = (await API.getItemById(rows[index].id)).data
          if (item.is_burnt) {
            document.location.reload()
          } else {
            setTimeout(checkItemStatus, 500)
          }
        }

        checkItemStatus()
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    getMyItems(0, 10)
  })

  const getRate = async () => {
    const provider = await Wallet.getCurrentProvider()

    const web3 = new Web3(provider)
    const exchange = new web3.eth.Contract(EXCHANGE as AbiItem[], process.env.REACT_APP_EXCHANGE_ADDRESS)

    exchange.methods
      .getRate()
      .call()
      .then((res: string) => {
        setRate(Number.parseFloat(Web3.utils.fromWei(res + '', 'ether')))

        setTimeout(getRate, 30000)
      })
      .catch(() => {
        setTimeout(getRate, 500)
      })
  }

  getRate()

  return (
    <Page>
      <MainLoading show={showLoading} />
      <Header>
        <HeaderLabel>Listing</HeaderLabel>
      </Header>
      <Card>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label="customized table">
            <TableHead>
              <Hidden smDown>
                <TableRow>
                  <TableCell>Customized Item</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Visible</TableCell>
                </TableRow>
              </Hidden>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <Row
                    index={index}
                    data={row}
                    key={row.id}
                    toggleClicked={toggleVisibility}
                    burnToken={burnToken}
                    rate={rate}
                  />
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <RedPagination rowsPerPage={10} totalPage={count} onChange={handleChangePage} />
      <ListSellModal item={selectedItem} open={showListModal} onClose={() => setShowListModal(false)} />
      <RemoveSellModal item={selectedItem} open={showUnlistModal} onClose={() => setShowUnlistModal(false)} />
    </Page>
  )
}

export default Listing
