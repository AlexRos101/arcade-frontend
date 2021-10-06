import { store, useGlobalState } from 'state-pool'

export const InitializeGlobalVar = () => {
  store.setState('account', '')
  store.setState('commentState', 0)
  store.setState('openDiscussionRule', false)
}
