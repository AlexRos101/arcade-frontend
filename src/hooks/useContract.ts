
import { useMemo } from 'react'

import ERC20_ABI from 'contracts/ERC20.json'
import EXCHANGE_ABI from 'contracts/EXCHANGE.json'
import ERC721_ABI from 'contracts/ERC721.json'
import SWAP_ABI from 'contracts/SWAP.json'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

export const useERC20 = (web3: Web3, address: string) => {
  return useMemo(() => {
    return new web3.eth.Contract(ERC20_ABI as AbiItem[], address)
  }, [address, web3])
}

export const useExchange = (web3: Web3, address: string) => {
  return useMemo(() => {
    return new web3.eth.Contract(EXCHANGE_ABI as AbiItem[], address)
  }, [address, web3])
}

export const useERC721 = (web3: Web3, address: string) => {
  return useMemo(() => {
    return new web3.eth.Contract(ERC721_ABI as AbiItem[], address)
  }, [address, web3])
}

export const useSwap = (web3: Web3, address: string) => {
  return useMemo(() => {
    return new web3.eth.Contract(SWAP_ABI as AbiItem[], address)
  }, [address, web3])
}

