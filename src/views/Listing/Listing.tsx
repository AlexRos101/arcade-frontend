import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Grid,
  Menu,
  TablePagination,
  Typography
} from '@material-ui/core'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import Card from 'components/Card'
import Flex from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import { Toggle } from 'components/Toggle'

import avatar from 'assets/img/avatar.png'
import bnb from 'assets/img/bnb.svg'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    body: {
      borderBottom: '0px'
    }
  })
)(TableCell)

const Thumb = styled(Card)<{
  height?: string
}>`
  height: ${({ height }) => height ?? '57px' };
  border: 0px;
`

const useStyles = makeStyles({
  tableContainer: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  table: {
    minWidth: 700
  },
  usdPrice: {
    color: 'rgba(34, 48, 61, 0.5)'
  }
})

const PriceLabel = ({ icon, price, pricePerUsd}: {
  icon: string,
  price: number,
  pricePerUsd: number
}) => {
  const classes = useStyles()

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item>
        <img
          src={icon}
          style={{ width: '20px', height: '20px' }} />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">
          {price}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" className={classes.usdPrice}>
          {`(US$${pricePerUsd})`}
        </Typography>
      </Grid>
    </Grid>
  )
}

function createData(color: string, category: string, name: string, priceArc: number, priceArcPerUsd: number, priceBnb: number, priceBnbPerUsd: number, visible: boolean) {
  return { color, category, name, priceArc, priceArcPerUsd, priceBnb, priceBnbPerUsd, visible };
}

// eslint-disable-next-line prefer-const
const rows = [
  createData('#30C5A8', 'ArcadeDoge Skin', 'Skin #012345', 100, 15.0, 9, 17.0, true),
  createData('#FB98B4', 'ArcadeDoge Skin', 'Skin #012345', 100, 15.0, 9, 17.0, false),
  createData('#FCBF4A', 'ArcadeDoge Skin', 'Skin #012345', 100, 15.0, 9, 17.0, true),
  createData('#1571FF', 'ArcadeDoge Skin', 'Skin #012345', 100, 15.0, 9, 17.0, false),
  createData('#FF6C50', 'ArcadeDoge Skin', 'Skin #012345', 100, 15.0, 9, 17.0, true),
]

const Listing = () => {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [visible, setVisible] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Page>
      <Header>
        <HeaderLabel>Listing</HeaderLabel>
      </Header>
      <Card>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Customized Item</TableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Visible</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  <Thumb width="80px" borderRadius="3px" padding="0px" bgColor={row.color} />
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle1">
                    {row.category}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle1">
                    {row.name}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Flex>
                    <PriceLabel
                      icon={avatar}
                      price={row.priceArc}
                      pricePerUsd={row.priceArcPerUsd}
                      />
                    <PriceLabel
                      icon={bnb}
                      price={row.priceBnb}
                      pricePerUsd={row.priceBnbPerUsd}
                      />
                  </Flex>
                </StyledTableCell>
                <StyledTableCell>
                  <Flex>
                    <Toggle
                      checked={row.visible}
                      onChange={() => setVisible(!visible)}
                      scale="md" />
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClickMenu}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleCloseMenu}
                      PaperProps={{
                        style: {
                          maxHeight: 180,
                          width: '120px',
                          boxShadow: '0px 2px 2px rgb(0 0 0 / 8%)'
                        }
                      }}
                    >
                      <MenuItem key="edit" onClick={handleCloseMenu}>
                        <Typography variant="subtitle1">Edit</Typography>
                      </MenuItem>
                      <MenuItem key="close" onClick={handleCloseMenu}>
                        <Typography variant="subtitle1">Close</Typography>
                      </MenuItem>
                    </Menu>
                  </Flex>
                </StyledTableCell>
              </TableRow>
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