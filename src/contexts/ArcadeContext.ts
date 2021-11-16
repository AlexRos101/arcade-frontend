import { createContext } from 'react'
import Web3 from 'web3'

export interface ArcadeContextValue {
  web3: Web3,
  account: string,
  isConnected: boolean,
  connectType: number,
  disconnectWallet: () => void,
  connectWallet: (connectType: number) => void,
  updateConnect: () => void,
}

export const ArcadeContext = createContext<null | ArcadeContextValue>(null)

