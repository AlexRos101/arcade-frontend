import React, { useCallback, useContext, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useGlobalState } from 'state-pool'
import Swal from 'sweetalert'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import { ThemeProvider } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core'
import { ReactComponent as CloseIcon } from 'assets/img/close.svg'
import RowLabel from 'components/Label/RowLabel'
import { dialogTheme } from 'styles/theme'
import WALLET from 'assets/img/wallet.svg'
import IconLabel from 'components/Label/IconLabel'
import SwitchLabel from 'components/Label/SwitchLabel'
import SwapGameToken from './SwapGameToken'
import ARCADE from 'assets/img/avatar.png'
import STARSHARD from 'assets/img/starshard.png'
import Switch from 'assets/img/switch.svg'
import SwapItem from 'components/Item/SwapItem'
import { Token } from 'global/interface'
import * as Wallet from '../../global/wallet'
import { getVerificationCode } from 'hooks/api'
import { getBalance } from 'hooks/gameapi'
import { ArcadeContext, ArcadeContextValue } from 'contexts/ArcadeContext'
import { useSwap, useERC20 } from 'hooks/useContract'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

interface Props {
  open: boolean
  onClose: () => void
}

const PointSwap: React.FC<Props> = (props) => {
  const { account, web3 } = useContext(ArcadeContext) as ArcadeContextValue
  const SWAP = useSwap(web3, process.env.REACT_APP_SWAP_ADDRESS as string)
  const ARCADETOKEN = useERC20(web3, process.env.REACT_APP_ARCADEDOGE_ADDRESS as string)
  const [inputCoin, setInputCoin] = useState<Token>()
  const [outputCoin, setOutputCoin] = useState<Token>()
  const [arcadeDogeRate, setArcadeDogeRate] = useState(new BigNumber(0))
  const [gamePointRate, setGamePointRate] = useState(new BigNumber(0))
  const [swapRate, setSwapRate] = useState(0.0)
  const [openSwapToken, setOpenSwapToken] = useState(false)
  const [arcadeBalance, setArcadeBalance] = useState(new BigNumber(0))
  const [gamePointBalance, setGamePointBalance] = useState(new BigNumber(0))
  const [outputBalance, setOutputBalance] = useState(0)
  const [inputBalance, setInputBalance] = useState(0)
  const [, setIsLoading] = useGlobalState('isLoading')

  const getArcadeDogeRate = useCallback(async () => {
    if (web3 !== undefined)  {
      SWAP.methods
        .getArcadeDogeRate()
        .call()
        .then((res: string) => {
          setArcadeDogeRate(new BigNumber(res).div(10 ** 18))
        })
        .catch(() => {
          setTimeout(getArcadeDogeRate, 500)
        })
    }
  }, [web3, SWAP])  

  const getGamePointRate = async () => {
    if (web3 === undefined) return

    if (inputCoin?.tokenName === "$ARCADE" || inputCoin === undefined) {
      SWAP.methods
        .gamePointPrice(1)
        .call()
        .then((res: string) => {
          setGamePointRate(new BigNumber(res).div(10 ** 3))
        })
        .catch(() => {
          setTimeout(getGamePointRate, 500)
        })
    } else {
      SWAP.methods
        .getGamePointRate(account, 1)
        .call()
        .then((res: string) => {
          setGamePointRate(new BigNumber(res).multipliedBy(arcadeDogeRate).div(10 ** 18))
        })
        .catch(() => {
          setTimeout(getGamePointRate, 500)
        })
    }
  }

  const onSwitchToken = useCallback(() => {
    const input = outputCoin, output = inputCoin, rate = 1.1
    setInputCoin(input)
    setOutputCoin(output)

    // get Swap Rate here.
    setSwapRate(rate)
  }, [setInputCoin, setOutputCoin, setSwapRate, inputCoin, outputCoin])


  const buyArcade = async () => {
    setIsLoading(true)

    if (!(await Wallet.isConnected())) {
      setIsLoading(false)
      return
    }

    account && getVerificationCode(1, account, inputBalance)
    .then(async (res) => {
      if (web3 === undefined) return
      const verificationToken = res.data.verification_token

      SWAP.methods
        .sellGamePoint(
          1,
          inputBalance,
          verificationToken
        )
        .send({ from: account })
        .then(() => {
          Swal("Game Point sold successfully!")
          setIsLoading(false)
          onClose()
        })
        .catch(() => {
          Swal("Sell Game Point failed!")
          setIsLoading(false)
        })
    })
  }

  const onConvert = () => {
    if (!(inputBalance > 0)) {
      Swal("Please input valid amount!")
      return
    }

    if (inputCoin?.tokenName === "$ARCADE") {
      setOpenSwapToken(true)
    } else {
      buyArcade()
    }
  }

  const getArcadeBalance = async () => {
    if (web3 === undefined) return

    if (account !== undefined && account !== "") {
      ARCADETOKEN.methods
      .balanceOf(account)
      .call()
      .then((res: string) => {
        setArcadeBalance(new BigNumber(res).div(10 ** 18))
      })
      .catch(() => {
        setTimeout(getArcadeBalance, 500)
      })
    }
  }

  const getGamePointBalance = () => {
    if (account !== undefined && account !== "")
    {
      getBalance(account)
      .then((res) => {
        if (res.result === 1) {
          setGamePointBalance(res.data.balance)
        }
      })
    } else {
      setTimeout(getGamePointBalance, 500)
    }
  }

  useEffect(() => {
    if (arcadeDogeRate === new BigNumber(0) || gamePointRate === new BigNumber(0))
      setSwapRate(0.0)
    else if (inputCoin?.tokenName !== "$ARCADE")
      setSwapRate(gamePointRate.div(arcadeDogeRate).toNumber())
    else
      setSwapRate(arcadeDogeRate.div(gamePointRate).toNumber())
  }, [arcadeDogeRate, gamePointRate, inputCoin])

  const onChangeInput = (value: string) => {
    setInputBalance(Number.parseFloat(value))
  }

  const onClose = () => {
    setInputBalance(0)
    props.onClose()
  }

  useEffect(() => {
    if (inputBalance >= 0)
      setOutputBalance(inputBalance * swapRate)
    else
      setOutputBalance(0)
  }, [inputCoin, inputBalance, swapRate])

  /* eslint-disable */
  useEffect(() => {
    getArcadeDogeRate()
    getGamePointRate()

    getArcadeBalance()
    getGamePointBalance()
  }, [inputCoin, outputCoin, setInputCoin, account, props.open, web3])
  /* eslint-enable */

  useEffect(() => {
    setInputCoin({
      tokenAvartar: ARCADE,
      tokenName: '$ARCADE',
      tokenFullName: 'ArcadeDoge'
    })

    setOutputCoin({
      tokenAvartar: STARSHARD,
      tokenName: 'STARSHARD',
      tokenFullName: 'StarShard'
    })
  }, [setInputCoin, setOutputCoin, setSwapRate])

  return (
    <Dialog
      className="card-dialog"
      onClose={onClose}
      maxWidth="md"
      aria-labelledby="customized-dialog-title"
      open={props.open}
      PaperProps={{ style: { borderRadius: 7 } }}
    >
      <DialogTitle className="swap-modal-title modal-dialog-title">
        <div className="flex-row">
          <RowLabel>Convert Tokens</RowLabel>
          <div className="flex-row r-flex-row r-mt-px-15 ml-auto">
            <IconLabel
              avatar={WALLET}
              label="Balance"
              avatarWidth="25"
              avatarHeight="25"
              fontSize="16px"
              fontColor="#7E5504"
              style={{ color: '#7E5504', marginRight: '8px' }}
              />
            <SwitchLabel
              avatar={ARCADE}
              label={arcadeBalance.toFixed(2).toString()}
              avatarWidth="17"
              avatarHeight="17"
              fontSize="14px"
              fontColor="#7E5504"
              style={{ color: '#7E5504', marginRight: '4px' }}
              />
            <SwitchLabel
              avatar={STARSHARD}
              label={gamePointBalance.toString()}
              avatarWidth="17"
              avatarHeight="17"
              fontSize="14px"
              fontColor="#7E5504"
              style={{ color: '#7E5504', marginRight: '4px' }}
              />
          </div>
        </div>
      </DialogTitle>
      <DialogContent className="swap-modal-content" dividers>
        <div>
          <SwapItem
            avatar={inputCoin?.tokenAvartar}
            label={inputCoin?.tokenFullName}
            avatarWidth="30"
            avatarHeight="30"
            fontSize="28px"
            fontColor="#22303D"
            isInput={true}
            coinName={inputCoin?.tokenName}
            onChange={onChangeInput}
            />

          <IconLabel
            avatar={Switch}
            label="Switch"
            avatarWidth="24"
            avatarHeight="24"
            fontSize="13px"
            style={{ color: '#B7B091', marginRight: '0', marginTop: '20px', marginBottom: '20px', marginLeft: '3px', width: 'fit-content' }}
            onClick={onSwitchToken}
            className="switch-link"
            />
          <SwapItem
            avatar={outputCoin?.tokenAvartar}
            label={outputCoin?.tokenFullName}
            avatarWidth="30"
            avatarHeight="30"
            fontSize="28px"
            fontColor="#22303D"
            isInput={false}    
            coinName={outputCoin?.tokenName}
            coinValue={ inputCoin?.tokenName === "$ARCADE" ? 
                        outputBalance.toFixed(0).toString() : 
                        outputBalance.toFixed(4).toString() }
            />
        </div>
      </DialogContent>
      <DialogActions className="modal-dialog-action pt-20">
        <div className="flex-row display-inline">
          <ThemeProvider theme={dialogTheme}>
            <Button className="modal-btn r-mb-px-15" variant="contained" color="primary" onClick={onConvert} style={{ float: "right" }}>
              Convert
            </Button>
          </ThemeProvider>
          <p className="swap-footer-label">{inputCoin?.tokenName} to {outputCoin?.tokenName} Conversion is 1:{swapRate.toFixed(4)}</p>
        </div>
      </DialogActions>
      <IconButton aria-label="close" className="modal-close" onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <SwapGameToken
        open={openSwapToken}
        rate={swapRate}
        amount={new BigNumber(inputBalance)}
        inputCoin={inputCoin}
        outputCoin={outputCoin}
        onClose={() => {
          setOpenSwapToken(false)
        }}
      />
    </Dialog>
  )
}

export default PointSwap
