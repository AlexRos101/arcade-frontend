import { useMemo } from 'react'
import ERC20_ABI from 'contracts/ERC20.json'
import EXCHANGE_ABI from 'contracts/EXCHANGE.json'
import ERC721_ABI from 'contracts/ERC721.json'
import SWAP_ABI from 'contracts/SWAP.json'
import BEP20PRICE_ABI from 'contracts/BEP20Price.json'
import { AbiItem } from 'web3-utils'
import { useArcadeContext } from './useArcadeContext'

export const useArcadeDoge = () => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    return new web3.eth.Contract(ERC20_ABI as AbiItem[], process.env.REACT_APP_ARCADEDOGE_ADDRESS)
  }, [web3])
}

export const useBUSD = () => {
  const { web3 } = useArcadeContext()
  return useMemo(() => {
    return new web3.eth.Contract(ERC20_ABI as AbiItem[], process.env.REACT_APP_BUSD_ADDRESS)
  }, [web3])
}

export const useExchange = () => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    return new web3.eth.Contract(EXCHANGE_ABI as AbiItem[], process.env.REACT_APP_EXCHANGE_ADDRESS)
  }, [web3])
}

export const useNFT = () => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    return new web3.eth.Contract(ERC721_ABI as AbiItem[], process.env.REACT_APP_NFT_ADDRESS)
  }, [web3])
}

export const useSwap = () => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    return new web3.eth.Contract(SWAP_ABI as AbiItem[], process.env.REACT_APP_SWAP_ADDRESS)
  }, [web3])
}

export const useBep20Price = () => {
  const { web3 } = useArcadeContext() 
  return useMemo(() => {
    return new web3.eth.Contract(BEP20PRICE_ABI as AbiItem[], process.env.REACT_APP_BEP20PRICE_ADDRESS)
  }, [web3])
}
