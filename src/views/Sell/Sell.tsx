import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import * as API from '../../hooks/api'
import axios from 'axios'
import { Box, Button, Grid, Select } from '@material-ui/core'
import { Theme, ThemeProvider, createStyles, makeStyles, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import BigNumber from 'bignumber.js'

import avatar from 'assets/img/avatar.png'
import bnb from 'assets/img/bnb.svg'
import LabelComponent from 'components/Label/LabelComponent'
import PriceLabel from 'components/Label/PriceLabel'
import Card from 'components/Card'
import Flex from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import Relative from 'components/Layout/Relative'
import Header from 'components/Layout/Header'
import HeaderLabel from 'components/Label/HeaderLabel'
import ErrorLabel from 'components/Label/ErrorLabel'
import SwitchButton from 'components/Button/SwitchButton'
import HoverButton from 'components/Button/HoverButton'
import ItemDropdown from 'components/Dropdown'
import { greenTheme } from 'styles/theme'
import { ScaleDefaults, SkinProps } from 'utils/constants/types'
import { arcadeAlert } from 'utils/arcadealert'
import * as Wallet from '../../global/wallet'

import { Response, GameItem } from 'global/interface'
import MainLoading from 'components/MainLoading'
import { useArcadeContext } from 'hooks/useArcadeContext'
import { useNFT, useExchange } from 'hooks/useContract'
import { useAppDispatch } from 'state'
import { setConnectWallet, setIsLoading } from 'state/show'

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
      },
    },
  }),
)(InputBase)

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
    },
    width: '100%',
    fontSize: '13px',
    // '& input': {
    //   padding: theme.spacing(1.5)
    // },
    // '& textarea': {
    //   padding: theme.spacing(1.5)
    // }
  },
  spacing: {
    padding: theme.spacing(1, 0),
  },
  margin: {
    margin: theme.spacing(1, 1),
  },
}))

const CategoryData = {
  '1': 'Category1',
  '2': 'Category2',
  '3': 'Category3',
  '4': 'Category4',
}

const initData: SkinProps = {
  item: '',
  category: CategoryData['1'],
  combo: CategoryData['1'],
  name: '',
  description: '',
  priceArc: 100,
  priceArcPerUsd: 15,
  priceBnb: 9,
  priceBnbPerUsd: 17,
  visible: true,
}

interface Category {
  id: number
  game_id: number
  name: string
}

interface Game {
  id: number
  name: string
}

interface ParamTypes {
  itemTokenId: string
}

const Sell: React.FC<SkinProps> = (data) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const skinItem = data ?? initData
  const { account } = useArcadeContext()
  const nft = useNFT()
  const exchange = useExchange()
  const [cardHeight, setCardHeight] = useState<string | undefined>('40px')
  const sellCardRef = useRef<HTMLDivElement>(null)
  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])
  const [initialized, setInitialized] = useState(false)
  const [selectedGameID, setSelectedGameID] = useState(1)
  const [selectedCategoryID, setSelectedCategoryID] = useState(1)
  const [tokenID, setTokenID] = useState(0)
  const [showThumbnailWarning, setShowThumbnailWarning] = useState(false)
  const [rate, setRate] = useState(new BigNumber(0))
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [paramIsSet, setParamIsSet] = useState(false)
  const [itemId, setItemId] = useState(-1)
  const [showLoading, setShowLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)

  const history = useHistory()

  const onSwitchAnonymous = () => {
    setAnonymous(!anonymous)
  }

  const { itemTokenId } = useParams<ParamTypes>()

  useEffect(() => {
    if (paramIsSet === false && window.location.pathname.indexOf('/item/edit') >= 0) {
      setTokenID(Number(itemTokenId))
      setParamIsSet(true)

      API.getItemByTokenID(Number(itemTokenId)).then((response: Response) => {
        if (response.result === true) {
          const data = response.data as GameItem
          setSelectedGameID(Number(data.game_id))
          setSelectedCategoryID(Number(data.category_id))
          setName(String(data.name))
          setAnonymous(data.is_anonymous === 1)
          setDescription(String(data.description))
          setPrice(String(data.arcadedoge_price))
          setItemId(data.id)
        }
      })
    }
  }, [paramIsSet, itemTokenId])

  const handleSelectGame = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as number
      setSelectedGameID(value)
    },
    [setSelectedGameID],
  )

  const handleSelectCategory = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const value = event.target.value as number
      setSelectedCategoryID(value)
    },
    [setSelectedCategoryID],
  )

  const uploadMaterial = async (files: Array<File>) => {
    setShowThumbnailWarning(false)
    const file = files[0]
    if (
      file.name.slice(file.name.length - 4, file.name.length) !== '.rar' &&
      file.name.slice(file.name.length - 4, file.name.length) !== '.zip'
    ) {
      arcadeAlert('Please select *.rar or *.zip file.')
      return
    }

    const tokenTemp = Date.now()

    setIsUploading(true)

    const formData = new FormData()
    // Update the formData object
    formData.append('myFile', file, tokenTemp + file.name.slice(file.name.length - 4, file.name.length))

    // Request made to the backend api
    // Send formData object
    axios
      .post(process.env.REACT_APP_API_NODE + 'upload_material', formData)
      .then((res: any) => {
        setIsUploading(false)
        if (res.data.code === -1) {
          setShowThumbnailWarning(true)
          return
        }
        setTokenID(tokenTemp)
      })
      .catch((err: any) => {
        setIsUploading(false)
        console.log(err)
      })
  }

  const isNumeric = useCallback((str: string) => {
    if (typeof str !== 'string') return false
    return !isNaN(parseFloat(str))
  }, [])

  const mintToken = async () => {
    if (tokenID === 0) {
      arcadeAlert('Please upload item file!')
      return
    }

    if (selectedGameID === -1 || selectedCategoryID === -1) {
      arcadeAlert('Game or Category is not selected!')
      return
    }

    if (anonymous === false && name === '') {
      arcadeAlert('Please input name or select anonymous mode!')
      return
    }

    if (!isNumeric(price) || Number(price) <= 0) {
      arcadeAlert('Please input valid price!')
      return
    }

    dispatch(setIsLoading(true))

    if (!(await Wallet.isConnected())) {
      dispatch(setIsLoading(false))
      dispatch(setConnectWallet(true))
      return
    }

    const metaData = `${process.env.REACT_APP_METADATA_NODE}${tokenID}.rar`
    const tokenInfo = {
      game_id: selectedGameID,
      category_id: selectedCategoryID,
      name: name,
      description: description,
      arcadedoge_price: Number(price),
      is_anonymous: anonymous === false ? 0 : 1,
    }

    Wallet.sendTransaction(
    nft.methods
      .mint(tokenID, metaData, JSON.stringify(tokenInfo))
    , account)  
      .then(async () => {
        const checkDBStatus = async () => {
          const item = (await API.getItemByTokenID(tokenID)).data as unknown
          if (item !== undefined && item !== null) {
            dispatch(setIsLoading(false))
            history.push('/listing')
            document.location.reload()
          } else {
            setTimeout(checkDBStatus, 500)
          }
        }

        checkDBStatus()
      })
      .catch(() => {
        dispatch(setIsLoading(false))
      })
  }

  const updateItem = useCallback(() => {
    setShowLoading(true)
    API.updateItemByID(
      itemId,
      selectedGameID,
      selectedCategoryID,
      description,
      name,
      anonymous === false ? 0 : 1,
      Number(price),
    ).then((data) => {
      if (data.data) {
        history.push('/listing')
        document.location.reload()
      } else {
        arcadeAlert('An error occured!')
        setShowLoading(false)
      }
    })
  }, [itemId, selectedGameID, selectedCategoryID, description, name, anonymous, price, history])

  const getRate = useCallback(async () => {
    exchange.methods
      .getRate()
      .call()
      .then((res: string) => {
        setRate(new BigNumber(res).div(10 ** 18))

        setTimeout(getRate, 300000)
      })
      .catch(() => {
        setTimeout(getRate, 500)
      })
  }, [exchange.methods])

  const onHandleResetFile = () => {
    setTokenID(0)
  }

  useEffect(() => {
    const cardHeight = `${sellCardRef?.current?.clientHeight}px`
    setCardHeight(cardHeight)

    if (initialized) return
    setInitialized(true)

    getRate()

    const getGamesAndCategories = async () => {
      setShowLoading(true)
      let response = await API.getGames()
      if (response.result) {
        setGames(response.data)
      } else {
        setShowLoading(false)
        return
      }

      response = await API.getCategories()
      if (response.result) {
        setCategories(response.data)
      }

      setShowLoading(false)
    }

    getGamesAndCategories()
  }, [getRate, initialized])

  return (
    <Page>
      <MainLoading show={showLoading} />
      <Header>
        <HeaderLabel>{paramIsSet === true ? 'Edit Item' : 'Sell Customized Item'}</HeaderLabel>
      </Header>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item xs={12} sm={6}>
          <Card ref={sellCardRef}>
            <Flex flexDirection="column" alignItems="flex-start">
              <Flex flexDirection="row" alignItems="flex-start" className="wd-100 r-flex-column">
                <LabelComponent label="Game" className="wd-50 r-wd-100-mg-8">
                  <Select
                    fullWidth
                    value={selectedGameID}
                    onChange={handleSelectGame}
                    className={classes.input}
                    label="Select Game"
                    input={<BootstrapInput>Select Game</BootstrapInput>}
                  >
                    {games.map((game: Game, index: number) => {
                      return (
                        <MenuItem key={index} value={game.id} style={{ fontSize: '13px' }}>
                          {game.name}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </LabelComponent>
                <LabelComponent label="Category" className="wd-50  r-wd-100-mg-8">
                  <Select
                    fullWidth
                    value={selectedCategoryID}
                    onChange={handleSelectCategory}
                    className={classes.input}
                    placeholder="Select Category"
                    input={<BootstrapInput />}
                  >
                    {categories.map((category: Category, index: number) => {
                      if (category.game_id === selectedGameID) {
                        return (
                          <MenuItem key={index} value={category.id} style={{ fontSize: '13px' }}>
                            {category.name}
                          </MenuItem>
                        )
                      }

                      return ''
                    })}
                  </Select>
                </LabelComponent>
              </Flex>
              <Flex flexDirection="row" alignItems="flex-start" className="wd-100 r-flex-column">
                <LabelComponent label="Name" className="wd-50  r-wd-100-mg-8">
                  <TextField
                    fullWidth
                    placeholder="Name"
                    InputProps={{ classes: { input: classes.input } }}
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </LabelComponent>
                <LabelComponent label="Anonymous?" className="wd-50 r-wd-100-mg-8">
                  <SwitchButton
                    value={anonymous}
                    onChange={onSwitchAnonymous}
                    text={anonymous === false ? 'You are not anonymous' : 'You are anonymous'}
                  />
                </LabelComponent>
              </Flex>
              <Flex flexDirection="row" alignItems="flex-start" className="wd-100 r-flex-column">
                <LabelComponent label="Description" className={`${classes.input} r-wd-100-mg-8`}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Description"
                    InputProps={{ classes: { input: classes.input } }}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                  />
                </LabelComponent>
              </Flex>
              <Grid container spacing={2} alignItems="flex-start" className={classes.spacing}>
                <Grid item sm={4}>
                  <LabelComponent label="Price in $ARC">
                    <TextField
                      fullWidth
                      placeholder="0.0"
                      InputProps={{ classes: { input: classes.input } }}
                      variant="outlined"
                      value={price}
                      onChange={(e) => setPrice(e.currentTarget.value)}
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
                          price={isNaN(Number.parseFloat(price)) ? 0 : Number.parseFloat(price).toFixed(2)}
                          pricePerUsd={skinItem?.priceArcPerUsd}
                        />
                      </Grid>
                      <Grid item>
                        <PriceLabel
                          scales={ScaleDefaults.LG}
                          avatar={bnb}
                          price={isNaN(Number.parseFloat(price)) ? 0 : rate.multipliedBy(Number.parseFloat(price)).toFixed(2)}
                          pricePerUsd={skinItem?.priceBnbPerUsd}
                        />
                      </Grid>
                    </Grid>
                  </LabelComponent>
                </Grid>
              </Grid>
              <Flex alignItems="center" className={`${classes.spacing} ${classes.margin} wd-100`}>
                <ThemeProvider theme={greenTheme}>
                  <Box component="span" mr={1} className="r-wd-100-mg-8">
                    <Button
                      variant="contained"
                      color="primary"
                      className="wd-100"
                      onClick={paramIsSet === false ? mintToken : updateItem}
                    >
                      {paramIsSet === false ? 'Save and Publish' : 'Update Item'}
                    </Button>
                  </Box>
                  {showThumbnailWarning === true ? <ErrorLabel>Upload file must have ???thumbnail.png???</ErrorLabel> : ''}
                </ThemeProvider>
              </Flex>
            </Flex>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          {tokenID === 0 ? (
            <ItemDropdown height={cardHeight} showLoading={isUploading} onDrop={uploadMaterial}>
              drop files
            </ItemDropdown>
          ) : (
            <Relative style={{ display: 'flex' }}>
              <img src={`${process.env.REACT_APP_THUMBNAIL_NODE}${tokenID}.png`} className="sell-token-img" alt=""/>
              {paramIsSet === false ? <HoverButton onClick={onHandleResetFile}>Reset File</HoverButton> : ''}
            </Relative>
          )}
        </Grid>
      </Grid>
    </Page>
  )
}

export default Sell
