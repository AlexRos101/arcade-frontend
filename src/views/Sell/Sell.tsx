import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  Grid,
  Select
} from '@material-ui/core'
import {
  Theme,
  ThemeProvider,
  createStyles,
  makeStyles,
  withStyles
} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import avatar from 'assets/img/avatar.png'
import bnb from 'assets/img/bnb.svg'
import LabelComponent from 'components/Label/LabelComponent'
import PriceLabel from 'components/Label/PriceLabel'
import Card from 'components/Card'
import Flex from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import SwitchButton from 'components/Button/SwitchButton'
import ItemDropdown from 'components/Dropdown'
import { greenTheme } from 'styles/theme'
import { ScaleDefaults, SkinProps } from 'utils/constants/types'

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    // root: {
    //   'label + &': {
    //     marginTop: theme.spacing(3)
    //   }
    // },
    input: {
      borderRadius: '7px',
      backgroundColor: '#FDFCF8',
      border: '1px solid #D0CCB7',
      fontSize: '13px',
      padding: theme.spacing(1),
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: '7px',
        // boxShadow: '0px 2px 2px #D0CCB7'
      }
    }
  })
)(InputBase)

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    '&::placeholder': {
      textOverflow: 'ellipsis !important'
    },
    width: '100%',
    // '& input': {
    //   padding: theme.spacing(1.5)
    // },
    // '& textarea': {
    //   padding: theme.spacing(1.5)
    // }
  },
  spacing: {
    padding: theme.spacing(1, 0)
  },
  margin: {
    margin: theme.spacing(1, 1)
  }
}))

const Category = {
  "1": "Category1",
  "2": "Category2",
  "3": "Category3",
  "4": "Category4"
}

const initData: SkinProps = {
  item: '',
  category: Category['1'],
  combo: Category['1'],
  name: '',
  description: '',
  priceArc: 100,
  priceArcPerUsd: 15,
  priceBnb: 9,
  priceBnbPerUsd: 17,
  visible: true,
}

const Sell = ({ data } : {
  data?: SkinProps | undefined
}) => {
  const classes = useStyles()
  const [skinItem, setSkinItem] = useState<SkinProps | undefined>(data ?? initData)
  const [cardHeight, setCardHeight] = useState<string | undefined>('40px')
  const sellCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cardHeight = `${sellCardRef?.current?.clientHeight}px`
    setCardHeight(cardHeight)
  }, [])

  const handleClickCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    // eslint-disable-next-line prefer-const
    let prevData = skinItem
    if (prevData) {
      prevData.category = event.target.value as string
    }
    setSkinItem(prevData)
  }
  
  return (
    <Page>
      <Header>
        <HeaderLabel>Sell Customized Item</HeaderLabel>
      </Header>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item xs={12} sm={6}>
          <Card ref={sellCardRef}>
            <Flex
              flexDirection="column"
              alignItems="flex-start"
            >
              <Flex 
                flexDirection="row"
                alignItems="flex-start"
                className="wd-100">
                <LabelComponent label="Game" className="wd-50">
                  <Select
                    fullWidth
                    value={skinItem?.category ?? ''}
                    onChange={handleClickCategory}
                    className={classes.input}
                    label="Select Category"
                    input={<BootstrapInput >Select Category</BootstrapInput>}
                  >
                    <MenuItem value={1}>Category1</MenuItem>
                    <MenuItem value={2}>Category2</MenuItem>
                    <MenuItem value={3}>Category3</MenuItem>
                    <MenuItem value={4}>Category4</MenuItem>

                    {/* {
                      Category.map((item, index) => {
                        return <MenuItem value={index} key={`category-key-${item}`}>{item}</MenuItem>
                      })
                    } */}
                  </Select>
                </LabelComponent>
                <LabelComponent label="Combo Type" className="wd-50"> 
                  <Select
                    fullWidth
                    value={skinItem?.combo ?? ''}
                    onChange={handleClickCategory}
                    className={classes.input}
                    placeholder="Select Combo"
                    input={<BootstrapInput />}
                  >
                    <MenuItem value={1}>Category1</MenuItem>
                    <MenuItem value={2}>Category2</MenuItem>
                    <MenuItem value={3}>Category3</MenuItem>
                    <MenuItem value={4}>Category4</MenuItem>

                    {/* {
                      Category.map((item, index) => {
                        return <MenuItem value={index} key={`category-key-${item}`}>{item}</MenuItem>
                      })
                    } */}
                  </Select>
                </LabelComponent>
              </Flex>
              <Flex 
                flexDirection="row"
                alignItems="flex-start"
                className="wd-100">
                <LabelComponent
                  label="Name" 
                  className="wd-50"
                >
                  <TextField
                    fullWidth
                    placeholder="Name"
                    InputProps={{ classes: {input: classes.input} }}
                    variant="outlined"
                  />
                </LabelComponent>
                <LabelComponent label="Anonymous?" className="wd-50">
                  <SwitchButton>You are not anonymous</SwitchButton>
                </LabelComponent>
              </Flex>
              <Flex 
              flexDirection="row"
              alignItems="flex-start"
              className="wd-100">
                <LabelComponent
                  label="Description"
                  className={classes.input}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Description"
                    InputProps={{ classes: {input: classes.input} }}
                    variant="outlined"
                  />
                </LabelComponent>
              </Flex>
              <Grid container
                spacing={2}
                alignItems="flex-start"
                className={classes.spacing}
              >
                <Grid item sm={4}>
                  <LabelComponent label="Price (in US$)">
                    <TextField
                      fullWidth
                      placeholder="US$   00.00"
                      InputProps={{ classes: {input: classes.input} }}
                      variant="outlined"
                    />
                  </LabelComponent>
                </Grid>
                <Grid item sm={8}>
                  <LabelComponent label="You will get...">
                    <Grid container spacing={2}>
                      <Grid item>
                        <PriceLabel
                          scales={ScaleDefaults.LG}
                          avatar={avatar}
                          price={skinItem?.priceArc}
                          pricePerUsd={skinItem?.priceArcPerUsd}
                        />
                      </Grid>
                      <Grid item>
                        <PriceLabel
                          scales={ScaleDefaults.LG}
                          avatar={bnb}
                          price={skinItem?.priceBnb}
                          pricePerUsd={skinItem?.priceBnbPerUsd}
                        />
                      </Grid>
                    </Grid>
                  </LabelComponent>
                </Grid>
              </Grid>
              <Flex
                alignItems="center"
                className={`${classes.spacing} ${classes.margin}`}>
                <ThemeProvider theme={greenTheme}>
                    <Box component="span" mr={1}>
                      <Button
                        variant="contained"
                        color="primary">
                        Save and Publish
                      </Button>
                    </Box>
                    {/* <Button
                      variant="outlined"
                      color="primary">
                      Save for Later
                    </Button> */}
                </ThemeProvider>
              </Flex>
            </Flex>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          { skinItem?.item == '' ? 
            (<ItemDropdown height={cardHeight}>drop files</ItemDropdown>) :
            (<Card bgColor={skinItem?.item} height={cardHeight} />)
          }
        </Grid>
      </Grid>
    </Page>
  )
}

export default Sell;