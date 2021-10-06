/* eslint-disable */

export interface Response {
  result: boolean
  data: any
  total?: number
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
}

export interface Stuff {
  id: number
  title: string
  discussions?: Array<Discussion>
}
