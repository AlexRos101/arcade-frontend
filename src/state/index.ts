import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import { useDispatch } from 'react-redux'
import showReducer from './show'
import swapReducer from './swap'

const PERSISTED_KEYS: string[] = ['swap']

const store = configureStore({
  reducer: {
    show: showReducer,
    swap: swapReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS })],
  preloadedState: load({ states: PERSISTED_KEYS })
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store