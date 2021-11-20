import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import { isMobile } from 'react-device-detect'

import { ArcadeContext } from 'contexts/ArcadeContext'
import * as Wallet from 'global/wallet'
import * as WalletUtils from 'global/wallet'
import * as CONST from 'global/const'


export const ArcadeProvider: React.FC = ({ children }) => {

  const [account, setAccount] = useState<string>()
  const [web3, setWeb3] = useState<Web3>(new Web3())
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [connectType, setConnectType] = useState<number>(CONST.WALLET_TYPE.NONE)
  
  const getWeb3 = async () => {
    const provider = await Wallet.getCurrentProvider()
    const web3 = new Web3(provider)
    return web3
  }

  const initAddress = async () => {
    const address = await WalletUtils.getCurrentWallet()
    if (address !== account) setAccount(address === null ? '' : address)
  }

  const updateConnect = async () => {
    setIsConnected(await WalletUtils.isConnected())
    setConnectType(Number(WalletUtils.getWalletType()))
    initAddress()
  }

  const connectWallet = async (connectType: number = CONST.WALLET_TYPE.WALLETCONNECT) => {
    if (isMobile) {
      await WalletUtils.connect(CONST.WALLET_TYPE.WALLETCONNECT)
    } else {
      await WalletUtils.connect(connectType)
    }
    setConnectType(Number(WalletUtils.getWalletType()))
    initAddress()
  }

  const disconnectWallet = () => {
    WalletUtils.disconnect()
    setConnectType(CONST.WALLET_TYPE.NONE)
    initAddress()
  }

  const initWeb3 = async () => {
    setWeb3(await getWeb3())
  }

  useEffect(() => {
    initWeb3()
    updateConnect()
    // eslint-disable-next-line
  }, [account])

  useEffect(() => {
    if (!account)
      setIsConnected(false)
    else
      setIsConnected(true)
  }, [account])

  return  (
    <ArcadeContext.Provider value={{
      web3,
      account,
      isConnected,
      connectType,
      disconnectWallet,
      connectWallet,
      updateConnect,
    }}>
      {children}
    </ArcadeContext.Provider>
  )
}
