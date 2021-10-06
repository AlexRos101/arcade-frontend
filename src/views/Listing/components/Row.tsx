import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Hidden,
  Typography,
  Grid
} from '@material-ui/core'
import {
  withStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import avatar from 'assets/img/avatar.png'
import bnb from 'assets/img/bnb.svg'
import PriceLabel from 'components/Label/PriceLabel'
import Card from 'components/Card'
import { Toggle } from 'components/Toggle'
import Flex from 'components/Layout/Flex'
import { ScaleDefaults, SkinProps } from 'utils/constants/types'

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

const Row = ({ data }: {
  data: SkinProps
}) => {
  const [row, setRow] = useState<SkinProps>(data)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleToggleClick = () => {
    // eslint-disable-next-line prefer-const
    setRow(prevRow => {
      return {
        ...prevRow,
        visible: !prevRow.visible
      }
    })
  }

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Hidden xsDown>
        <TableRow key={row.name}>
          <StyledTableCell component="th" scope="row">
            <Thumb width="80px" borderRadius="3px" padding="0px" bgColor={row.item} />
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
                scales={ScaleDefaults.MD}
                avatar={avatar}
                price={row.priceArc}
                pricePerUsd={row.priceArcPerUsd}
                />
              <PriceLabel
                scales={ScaleDefaults.MD}
                avatar={bnb}
                price={row.priceBnb}
                pricePerUsd={row.priceBnbPerUsd}
                />
            </Flex>
          </StyledTableCell>
          <StyledTableCell>
            <Flex>
              <Toggle
                checked={row.visible}
                onChange={handleToggleClick}
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
      </Hidden>
      <Hidden smUp>
        <TableRow key={row.name}>
          <StyledTableCell component="th" scope="row">
            <Grid container spacing={1} justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <Thumb width="80px" borderRadius="3px" padding="0px" bgColor={row.item} />
              </Grid>
              <Grid item>
                <Flex flexDirection="column">
                  <Typography variant="subtitle1">
                    {row.category}
                  </Typography>
                  <Typography variant="subtitle1">
                    {row.name}
                  </Typography>
                </Flex>
              </Grid>
              <Grid item xs={8}>
                <Flex flexDirection="column">
                  <PriceLabel
                    scales={ScaleDefaults.MD}
                    avatar={avatar}
                    price={row.priceArc}
                    pricePerUsd={row.priceArcPerUsd}
                    />
                  <PriceLabel
                    scales={ScaleDefaults.MD}
                    avatar={bnb}
                    price={row.priceBnb}
                    pricePerUsd={row.priceBnbPerUsd}
                    />
                </Flex>
              </Grid>
              <Grid item xs={4}>
                <Flex flexDirection="row" justifyContent="flex-end">
                  <Toggle
                    checked={row.visible}
                    onChange={handleToggleClick}
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
              </Grid>
            </Grid>

            {/* <Flex>
              <Thumb width="80px" borderRadius="3px" padding="0px" bgColor={row.item} />
              <Flex flexDirection="column">
                <Typography variant="subtitle1">
                  {row.category}
                </Typography>
                <Typography variant="subtitle1">
                  {row.name}
                </Typography>
              </Flex>
            </Flex>
            <Flex>
              <Flex flexDirection="column">
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
              <Flex>
                
              </Flex>
            </Flex> */}
          </StyledTableCell>
        </TableRow>
      </Hidden>
    </>
  )
}

export default Row
