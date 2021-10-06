import { store } from 'state-pool'

export const InitializeGlobalVar = (): void => {
  store.setState('account', '')
  store.setState('commentState', 0)
  store.setState('openDiscussionRule', false)
}
