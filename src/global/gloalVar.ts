import { store } from 'state-pool'
import { useCallback } from 'react'

export const InitializeGlobalVar = useCallback((): void => {
  store.setState('account', '')
  store.setState('commentState', 0)
  store.setState('openDiscussionRule', false)
}, [])
