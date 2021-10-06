import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Hidden,
  TablePagination,
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {store, useGlobalState} from 'state-pool'
import * as CONST from '../../global/const'

import Card from 'components/Card'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import * as API from '../../hooks/api'
import * as Wallet from '../../global/wallet'
import ListSellModal from 'components/Modal/ListSell'
import RemoveSellModal from 'components/Modal/RemoveSell'

import Row from './components/Row'

const useStyles = makeStyles({
  tableContainer: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  usdPrice: {
    color: 'rgba(34, 48, 61, 0.5)'
  }
})

const Listing = () => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useGlobalState('isLoading')
  const [initialized, setInitialized] = useState(false)
  const [showListModal, setShowListModal] = useState(false)
  const [showUnlistModal, setShowUnlistModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({name: '', token_id: 0})

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getMyItems = async (limit:number, cnt:number) => {
    const address = await Wallet.getCurrentWallet()
    if (address == null) {
      return
    }
    setIsLoading(true)

    const items = await API.getItemsByAddress(address, CONST.SORT_TYPE.NONE, limit, cnt)
    setRows(items.data)

    setIsLoading(false)
  }

  const toggleVisibility = async (index: number) => {
    if (rows[index].is_visible) {
      setSelectedItem(rows[index])
      setShowUnlistModal(true)
    } else {
      setSelectedItem(rows[index])
      setShowListModal(true)
    }
  }

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    getMyItems(0, 10)
  })

  return (
    <Page>
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
              {
                rows.map((row, index) => {
                  return (
                    <Row index={index} data={row} key={`table-row-${index}`} toggleClicked={toggleVisibility}/>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <ListSellModal
        item={selectedItem}
        open={showListModal}
        onClose={() => setShowListModal(false)}
      />
      <RemoveSellModal
        item={selectedItem}
        open={showUnlistModal}
        onClose={() => setShowUnlistModal(false)}
      />
    </Page>
  )
}

export default Listing;