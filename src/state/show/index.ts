import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ShowState } from "global/interface"

const initialState: ShowState = {
  termOfUse: false,
  privacyPolicy: false,
  walletMenu: false,
  connWallet: false,
  isLoading: false,
  pointSwap: false,
  hiddenMenu: 'hidden-menu',
  discussionRule: false,
  commentState: 0,
}

const showSlice = createSlice({
  name: 'show',
  initialState,
  reducers: {
    setTermOfUse: (state, action: PayloadAction<boolean>) => {
      state.termOfUse = action.payload
    },
    setPrivacyPolicy: (state, action: PayloadAction<boolean>) => {
      state.privacyPolicy = action.payload
    },
    setWalletMenu: (state, action: PayloadAction<boolean>) => {
      state.walletMenu = action.payload
    },
    setConnectWallet: (state, action: PayloadAction<boolean>) => {
      state.connWallet = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setPointSwap: (state, action: PayloadAction<boolean>) => {
      state.pointSwap = action.payload
    },
    setHiddenMenu: (state, action: PayloadAction<string>) => {
      state.hiddenMenu = action.payload
    },
    setDiscussionRule: (state, action: PayloadAction<boolean>) => {
      state.discussionRule = action.payload
    },
    setCommentState: (state, action: PayloadAction<number>) => {
      state.commentState = action.payload
    },
  }
})

export const { 
  setTermOfUse, 
  setPrivacyPolicy, 
  setWalletMenu, 
  setConnectWallet,
  setIsLoading,
  setPointSwap,
  setHiddenMenu,
  setDiscussionRule,
  setCommentState,
} = showSlice.actions

export default showSlice.reducer