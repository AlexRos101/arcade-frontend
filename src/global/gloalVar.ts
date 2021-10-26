import { store } from 'state-pool'
import * as CONST from '../global/const'

export const initializeGlobalVar = (): void => {
  store.setState('account', '')
  store.setState('commentState', 0)
  store.setState('openDiscussionRule', false)
  store.setState('openConnectWalletMenu', false)
  store.setState('connectedWalletType', CONST.WALLET_TYPE.NONE)
  store.setState('hiddenMenu', 'hidden-menu')
  store.setState('dscUpdate', false)
}
