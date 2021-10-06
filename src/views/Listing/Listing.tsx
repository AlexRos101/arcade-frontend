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

import Card from 'components/Card'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import { SkinProps, SkinsProps } from 'utils/constants/types'

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

function createData(item: string, category: string, combo: string, name: string, priceArc: number, priceArcPerUsd: number, priceBnb: number, priceBnbPerUsd: number, visible: boolean): SkinProps {
  return { item, category, combo, name, priceArc, priceArcPerUsd, priceBnb, priceBnbPerUsd, visible };
}

const initRowsData: SkinProps[] = [
  createData('#30C5A8', 'ArcadeDoge Skin', 'ArcadeDoge', 'Skin #012345', 100, 15.0, 9, 17.0, true),
  createData('#FB98B4', 'ArcadeDoge Skin', 'ArcadeDoge', 'Skin #012345', 100, 15.0, 9, 17.0, false),
  createData('#FCBF4A', 'ArcadeDoge Skin', 'ArcadeDoge', 'Skin #012345', 100, 15.0, 9, 17.0, true),
  createData('#1571FF', 'ArcadeDoge Skin', 'ArcadeDoge', 'Skin #012345', 100, 15.0, 9, 17.0, false),
  createData('#FF6C50', 'ArcadeDoge Skin', 'ArcadeDoge', 'Skin #012345', 100, 15.0, 9, 17.0, true),
]

const Listing = () => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState<SkinProps[]>(initRowsData)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

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
            {rows.map((row: SkinProps, index: number) => (
              <Row data={row} key={`table-row-${index}`} />
            ))}
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
    </Page>
  )
}

export default Listing;