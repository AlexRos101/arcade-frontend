/* eslint-disable */

import internal from "stream";

export interface Response {
  result: boolean
  data?: any
  total?: number
  msg?: string
}

/* eslint-enable */

export interface GameItem {
  id: number
  game_id?: number
  category_id?: number
  category_name?: string
  contract_address?: string
  name?: string
  is_anonymous?: number
  description?: string
  arcadedoge_price?: string
  token_id?: number
  is_visible?: boolean
  owner?: string
}

export interface CategoryTab {
  categoryId: number
  tabName: string
}

export interface Comment {
  id: number
  likes: number
  discussion_id: number
  parent_id: number
  user: string
  user_type: number
  content: string
  updated_at?: string
  reply?: Array<Comment>
  user_like?: Array<unknown>
}

export interface Discussion {
  id: number
  likes: number
  stuff_id: number
  user: string
  user_type: number
  content: string
  comment_cnt?: number
  updated_at?: string
  is_hot?: boolean
}

export interface Stuff {
  id: number
  title: string
  discussions?: Array<Discussion>
}

export interface Token {
  tokenName: string
  tokenFullName: string
  tokenAvartar: string
}

export interface ShowState {
  termOfUse: boolean,
  privacyPolicy: boolean,
  walletMenu: boolean,
  connWallet: boolean,
  isLoading: boolean,
  pointSwap: boolean,
  hiddenMenu: string,
  discussionRule: boolean,
  commentState: number,
}

export interface State {
  show: ShowState
}
