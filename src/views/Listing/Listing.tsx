import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import MainLoading from 'components/MainLoading'
import Paper from '@material-ui/core/Paper'
import { useGlobalState } from 'state-pool'
import * as CONST from '../../global/const'
import * as WalletUtils from '../../global/wallet'
import BigNumber from 'bignumber.js'

import Card from 'components/Card'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import * as API from '../../hooks/api'
import ListSellModal from 'components/Modal/ListSell'
import RemoveSellModal from 'components/Modal/RemoveSell'
import * as Wallet from '../../global/wallet'
import RedPagination from 'components/Pagination/RedPagination'

import Row from './components/Row'
import { GameItem } from 'global/interface'
import { ArcadeContext, ArcadeContextValue } from 'contexts/ArcadeContext'
import { useERC721, useExchange } from 'hooks/useContract'

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
  const { account, web3 } = useContext(ArcadeContext) as ArcadeContextValue
  const NFT = useERC721(web3, process.env.REACT_APP_NFT_ADDRESS as string)
  const EXCHANGE = useExchange(web3, process.env.REACT_APP_EXCHANGE_ADDRESS as string)
  const [rowsPerPage] = useState(10)
  const [rows, setRows] = useState<Array<GameItem>>([])
  const [count, setCount] = useState(0)
  const [showListModal, setShowListModal] = useState(false)
  const [showUnlistModal, setShowUnlistModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GameItem>({ id: -1, name: '', token_id: 0 })
  const [showLoading, setShowLoading] = useState(false)
  const [, setShowConnectWalletModal] = useGlobalState('showConnectWalletModal')
  const [, setIsLoading] = useGlobalState('isLoading')
  const [, setPage] = useState(0)
  const [rate, setRate] = useState(new BigNumber(0))

  const getMyItems = useCallback(
    async (limit: number, cnt: number) => {
      if (account === null) {
        return
      }
      setShowLoading(true)
      // setRows([])
      const items = await API.getItemsByAddress(account, CONST.SORT_TYPE.NONE, limit, cnt)
      setCount(Number(items.total))
      setRows(items.data)

      setShowLoading(false)
    },
    [account])

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

    NFT.methods
      .burn(rows[index].token_id)
      .send({ from: account })
      .then((res: any) => {
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
      .catch((err: any) => {
        setIsLoading(false)
      })
  }

  const handleChangePage = useCallback(
    (newPage: number) => {
      setPage(newPage)
      getMyItems(newPage * rowsPerPage, rowsPerPage)
    },
    [rowsPerPage, getMyItems],
  )

  const getRate = useCallback(async () => {
    
    EXCHANGE.methods
      .getRate()
      .call()
      .then((res: string) => {
        setRate(new BigNumber(res).div(10 ** 18))

        setTimeout(getRate, 300000)
      })
      .catch(() => {
        setTimeout(getRate, 500)
      })
  }, [EXCHANGE.methods])

  const init = useCallback(async () => {
    if (!(await WalletUtils.isConnected())) {
      setShowConnectWalletModal(true);
      return;
    }

    getMyItems(0, 10)
    getRate()
  }, [getMyItems, getRate, setShowConnectWalletModal])

  /* eslint-disable */

  useEffect(() => {
    init()
  }, [])

  /* eslint-enable */

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
      <RedPagination rowsPerPage={rowsPerPage} totalPage={count} onChange={handleChangePage} className="mw-none"/>
      <ListSellModal item={selectedItem} open={showListModal} onClose={() => setShowListModal(false)} />
      <RemoveSellModal item={selectedItem} open={showUnlistModal} onClose={() => setShowUnlistModal(false)} />
    </Page>
  )
}

export default Listing
