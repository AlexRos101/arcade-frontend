import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  Button,
  Grid,
  Select
} from '@material-ui/core'
import {
  Theme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
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
import { marketTheme } from 'styles/theme'
import { ScaleDefaults, SkinProps } from 'utils/constants/types'

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    '&::placeholder': {
      textOverflow: 'ellipsis !important'
    },
    width: '250px'
  },
  spacing: {
    padding: theme.spacing(1, 0)
  }
}))

const Category = {
  "1": "Category1",
  "2": "Category2",
  "3": "Category3",
  "4": "Category4"
}

const initData: SkinProps = {
  item: 'rgba(251, 152, 180, 1)',
  category: Category['1'],
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
              <LabelComponent label="Category">
                <Select
                  fullWidth
                  value={skinItem?.category ?? ''}
                  onChange={handleClickCategory}
                  className={classes.input}
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
              <LabelComponent
                label="Name" 
                className={classes.input}
              >
                <TextField
                  fullWidth
                  placeholder="Name"
                  InputProps={{ classes: {input: classes.input} }}
                />
              </LabelComponent>
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
                />
              </LabelComponent>
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
                    />
                  </LabelComponent>
                </Grid>
                <Grid item sm={8}>
                  <LabelComponent label="You will get...">
                    <Grid container spacing={2}>
                      <Grid item>
                        <PriceLabel
                          scales={ScaleDefaults.MD}
                          avatar={avatar}
                          price={skinItem?.priceArc}
                          pricePerUsd={skinItem?.priceArcPerUsd}
                        />
                      </Grid>
                      <Grid item>
                        <PriceLabel
                          scales={ScaleDefaults.MD}
                          avatar={bnb}
                          price={skinItem?.priceBnb}
                          pricePerUsd={skinItem?.priceBnbPerUsd}
                        />
                      </Grid>
                    </Grid>
                  </LabelComponent>
                </Grid>
              </Grid>
              <Grid container
                spacing={2}
                alignItems="center"
                className={classes.spacing}
              >
                <ThemeProvider theme={marketTheme}>
                  <Button
                    className="mg-8 market-customizing-btn"
                    variant="contained"
                    color="secondary">
                    Save and Publish
                  </Button>
                  <Button
                    className="mg-8 market-listing-btn"
                    variant="contained"
                    color="primary">
                    Save for Later
                  </Button>
                </ThemeProvider>
              </Grid>
            </Flex>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card bgColor={skinItem?.item} height={cardHeight} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default Sell;