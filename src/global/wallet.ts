import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import * as ls from 'local-storage'
import * as CONST from './const'
import { ethers } from 'ethers'
import axios from 'axios'
import { arcadeAlert } from 'utils/arcadealert'

declare let window: any

const providerParam: any = {
  infuraId: 'a7a08bee7e2e427591a17baafee2c515',
  rpc: { },
}

providerParam.rpc[Number(process.env.REACT_APP_CHAIN_ID)] = process.env.REACT_APP_RPC_URL

export const connect = async (wallet_type = CONST.WALLET_TYPE.WALLETCONNECT) => {
  if (wallet_type === CONST.WALLET_TYPE.WALLETCONNECT) {
    const provider = new WalletConnectProvider(providerParam)
    const walletConnectInfo = (ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_CONNECT) as any)
    if (walletConnectInfo && walletConnectInfo.chainId !== parseInt(process.env.REACT_APP_CHAIN_ID as string, 10)) {
      ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_CONNECT, '')
      ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE, CONST.WALLET_TYPE.NONE)
      ls.set(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED, 0)
    }

    provider.onConnect(async () => {
      ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE, CONST.WALLET_TYPE.WALLETCONNECT)
      ls.set(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED, 1)
      document.location.reload()
    })

    provider.on('disconnect', (code: number, reason: string) => {
      document.location.reload()
    })

    provider.on('error', (code: number, reason: string) => {
      console.log(code)
    })

    //  Enable session (triggers QR Code modal)
    await provider.enable()
    .then((accounts: string[]): string => accounts[0])
    .catch((error: Error): void => {
      console.log(error)
    })
  } else {
    if (window.ethereum === undefined) {
      return -1;
    } else {
      // const accounts = await window.ethereum.enable()
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      ls.set(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED, 1)
      ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE, CONST.WALLET_TYPE.METAMASK)

      if (accounts.length > 0) {
        if ((await getCurrentChainId()) !== process.env.REACT_APP_CHAIN_ID) {
          const web3: any = new Web3(Web3.givenProvider)
          try {
            await web3.currentProvider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x' + Number(process.env.REACT_APP_CHAIN_ID).toString(16) }],
            })

            if ((await getCurrentChainId()) === process.env.REACT_APP_CHAIN_ID) {
              
            }
          } catch (error) {
            if ((error as any).code === 4902) {
              try {
                await web3.currentProvider.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x' + Number(process.env.REACT_APP_CHAIN_ID).toString(16),
                      chainName: process.env.REACT_APP_CHAIN_NAME,
                      rpcUrls: [ process.env.REACT_APP_RPC_URL ],
                      nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18,
                      },
                      blockExplorerUrls: [ process.env.REACT_APP_BLOCKEXPLORER ],
                    },
                  ],
                })
              } catch (error) {
                console.log(error)
              }
            } else {
              ls.set(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED, 0)
              ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE, CONST.WALLET_TYPE.NONE)
            }
          }
        }
      }
    }
  }
}

export const getCurrentProvider = async () => {
  const walletType = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE)
  if (walletType === null) return null

  if (ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED) === null || ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED) === 0) {
    return null
  }

  if (walletType === CONST.WALLET_TYPE.METAMASK) {
    return Web3.givenProvider
  } else if (walletType === CONST.WALLET_TYPE.WALLETCONNECT) {
    const provider = new WalletConnectProvider(providerParam)

    provider.on('disconnect', () => {
      ls.set(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED, 0)
      ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE, CONST.WALLET_TYPE.NONE)
      document.location.reload()
    })

    provider.on('error', (code: string) => {
      console.log(code)
    })

    await provider.enable()

    return provider
  }
}

export const getCurrentWallet = async () => {
  const walletType = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE)
  const connected = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED)

  if (walletType === null) return null
  if (connected === null || connected === 0) return null

  

  if (walletType === CONST.WALLET_TYPE.METAMASK) {
    if (
      parseInt(process.env.REACT_APP_CHAIN_ID as string, 10) !== parseInt(await getCurrentChainId() as string, 16)
    ) {
      return null
    }

    const accounts = await new Web3(Web3.givenProvider).eth.getAccounts()
    return Web3.utils.toChecksumAddress(accounts[0])
  } else if (walletType === CONST.WALLET_TYPE.WALLETCONNECT) {
    if (
      parseInt(process.env.REACT_APP_CHAIN_ID as string, 10) !== parseInt(await getCurrentChainId() as string, 10)
    ) {
      return null
    }
    // const wcData: any = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_CONNECT)
    // if (wcData.accounts.length == 0) {
    //   return null
    // }
    // return Web3.utils.toChecksumAddress(wcData.accounts[0])
    var provider = await getCurrentProvider()
    const accounts = await (new Web3(provider)).eth.getAccounts();
    if (accounts.length === 0) return null;
    return accounts[0];
  }

  return null
}

export const getCurrentChainId = async () => {
  const walletType = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE)

  if (walletType === null) return null

  if (walletType === CONST.WALLET_TYPE.METAMASK) {
    return Web3.givenProvider.chainId
  } else if (walletType === CONST.WALLET_TYPE.WALLETCONNECT) {
    // const wcData: any = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_CONNECT)
    // return wcData.chainId
    var provider = await getCurrentProvider()
    const chainId = await (new Web3(provider)).eth.net.getId()
    return chainId
  }

  return null
}

export const isPreviousConnected = (): boolean => {
  if (ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED) === null || ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED) === 0) {
    return false
  }
  return true
}

export const isConnected = async (): Promise<boolean> => {
  if (ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED) === null || ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED) === 0) {
    return false
  }

  const address = await getCurrentWallet()
  const provider = await getCurrentProvider()
  let chainId = await getCurrentChainId()

  if (address === null || address === '' || provider === null || chainId === null) {
    return false
  }

  chainId = Number.parseInt(chainId.toString())

  if (chainId !== Number.parseInt(process.env.REACT_APP_CHAIN_ID as string)) {
    return false
  }

  return true
}

export const getPreviousWalletType = () => {
  const walletType = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE)
  return walletType
}

export const getWalletType = async () => {
  if (ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED) === null || ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED) === 0) {
    return CONST.WALLET_TYPE.NONE
  }

  const walletType = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE)
  if (walletType == null) return CONST.WALLET_TYPE.NONE
  if (!await isConnected()) return CONST.WALLET_TYPE.NONE
  return walletType
}

export const disconnect = () => {
  ls.set(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED, 0)
  ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE, CONST.WALLET_TYPE.NONE)
  ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_CONNECT, '')
}

export const signText = async (text: string, account: string) => {
  if (!window.ethereum)
    return ''

  await window.ethereum.send("eth_requestAccounts")
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const signature = await signer.signMessage(text)
  return signature

}

export const checkSign = async (text: string, signature: string, account: string) => {
  const signAddress = await ethers.utils.verifyMessage(text, signature)

  return (signAddress === account)
}

export const sendTransaction = async (transaction: any, account: string | undefined) => {
  let gasData: any = null
  try {
    gasData = await axios.get(process.env.REACT_APP_GAS_URL as string);

    if (gasData.data !== undefined) {
      gasData = gasData.data;
    }
  } catch (err) {
      console.log(err);
      arcadeAlert("Get gas price failed!")
      return;
  }

  return transaction.estimateGas({ from: account })
  .then(async (gasAmount: any) => { 
    return transaction.send({ from: account, gas: gasAmount/*, gasPrice: parseInt(gasData.result, 16).toString()*/ })
  })
}
