import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import * as ls from 'local-storage'
import * as CONST from './const'

declare let window: any

const providerParam: any = {
    infuraId: "a7a08bee7e2e427591a17baafee2c515",
        rpc: {
            // 56: "https://bsc-dataseed1.binance.org/",
            97: "https://data-seed-prebsc-1-s1.binance.org:8545"
            }
}

export const connect = async () => {
    if (window.ethereum == undefined) {
        const provider = new WalletConnectProvider(providerParam);
    
        provider.onConnect(async () => {
            ls.set(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED, 1);
            ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE, CONST.WALLET_TYPE.WALLETCONNECT);

            // document.location.reload()      
        });

        provider.on("disconnect", (code: number, reason: string) => {
            document.location.reload();
        })

        provider.on('error', (code: number, reason: string) => {
            console.log(reason)
        })
    
        //  Enable session (triggers QR Code modal)
        await provider.enable();
    } else {
        const accounts = await window.ethereum.send('eth_requestAccounts')
        if (accounts.result.length > 0) {
            if (await getCurrentChainId() != process.env.REACT_APP_CHAIN_ID) {
                const web3: any = new Web3(Web3.givenProvider)
                try {
                    await web3.currentProvider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: '0x' + (Number(process.env.REACT_APP_CHAIN_ID).toString(16)) }]
                    });
                    ls.set(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED, 1);
                    ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE, CONST.WALLET_TYPE.METAMASK);
                } catch (error) {
                    if ((error as any).code === 4902) {
                        try {
                          await web3.currentProvider.request({
                            method: "wallet_addEthereumChain",
                            params: [
                              {
                                chainId: '0x' + (Number(process.env.REACT_APP_CHAIN_ID).toString(16)),
                                chainName: "BSC Testnet",
                                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
                                nativeCurrency: {
                                  name: "BNB",
                                  symbol: "BNB",
                                  decimals: 18,
                                },
                                blockExplorerUrls: ["https://testnet.bscscan.com/"],
                              },
                            ],
                          });
                        } catch (error) {
                          console.log(error)
                        }
                    }
                }
            }
        }
    }
}

export const getCurrentProvider = async () => {
    const walletType = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE);

    if (walletType == null) return null;

    if (ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED) == null || ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED) == 0) {
        return null;
    }

    if (walletType == CONST.WALLET_TYPE.METAMASK) {
        return Web3.givenProvider;
    } else if (walletType == CONST.WALLET_TYPE.WALLETCONNECT) {
        const provider = new WalletConnectProvider(providerParam);

        provider.on("disconnect", (code: number, reason: string) => {
            ls.set(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED, 0);
            ls.set(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE, CONST.WALLET_TYPE.NONE);
            document.location.reload();
        })

        provider.on('error', (code: number, reason: string) => {
            console.log(reason);
        });

        await provider.enable();

        return provider;
    }
}

export const getCurrentWallet = async () => {
    const walletType = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE);
    const connected = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_CONNECTED);

    if (walletType == null) return null;
    if (connected == null || connected == 0) return null 

    if (walletType == CONST.WALLET_TYPE.METAMASK) {
        const accounts = await (new Web3(Web3.givenProvider)).eth.getAccounts();
        return accounts[0];
    } else if (walletType == CONST.WALLET_TYPE.WALLETCONNECT) {
        const wcData: any = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_CONNECT)
        if (wcData.accounts.length == 0) {
            return null;
        }
        return wcData.accounts[0];
    }

    return null;
}

export const getCurrentChainId = () => {
    const walletType = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_TYPE);

    if (walletType == null) return null;

    if (walletType == CONST.WALLET_TYPE.METAMASK) {
        return Web3.givenProvider.chainId;
    } else if (walletType == CONST.WALLET_TYPE.WALLETCONNECT) {
        const wcData: any = ls.get(CONST.LOCAL_STORAGE_KEY.KEY_WALLET_CONNECT)
        return wcData.chainId;
    }

    return null;
}

export const isConnected = async () => {
    const address = await getCurrentWallet();
    const provider = await getCurrentProvider();
    let chainId = getCurrentChainId();

    if (address == null || provider == null || chainId == null) {
        return false
    }

    chainId = Number.parseInt(chainId as string)

    if (chainId != process.env.REACT_APP_CHAIN_ID) {
        return false
    }
    
    return true
}