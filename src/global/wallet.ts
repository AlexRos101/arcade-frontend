import Web3 from 'web3'

declare let window: any

export const connect = async () => {
    const accounts = await window.ethereum.send('eth_requestAccounts')
    return accounts.result[0]
}