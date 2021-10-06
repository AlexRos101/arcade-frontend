import { Response } from 'global/interface'

/* eslint-disable */

const sendPost = (requestUrl: string, params: any): Promise<any> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }
  return fetch(process.env.REACT_APP_API_NODE + requestUrl, requestOptions).then((response) => response.json())
}

export const getAllStuff = async (): Promise<any> => {
  const response = await sendPost('stuff/all', {})
  return response.data
}

export const getStuff = async (id: number): Promise<any> => {
  const response = await sendPost('stuff', { id: id })
  return response.data
}

export const getAllDiscussion = async (id: number, limit: number, cnt: number): Promise<any> => {
  const response = await sendPost('discussion/all/', { id: id, limit: limit, cnt: cnt })
  return response
}

export const getSearch = async (keyword: string): Promise<any> => {
  const response = await sendPost('stuff/search/', { keyword: keyword })
  return response.data
}

export const getDiscussion = async (id: number): Promise<any> => {
  const response = await sendPost('discussion', { id: id })
  return response.data
}

export const getGames = async (): Promise<Response> => {
  const response = await sendPost('get_games', {})
  return response
}

export const getCategories = async (): Promise<Response> => {
  const response = await sendPost('get_categories', {})
  return response
}

export const getMarketItems = async (
  game_id: number,
  category_id: number,
  sort_type: number,
  limit: number,
  cnt: number,
): Promise<Response> => {
  const response = await sendPost('get_market_items', {
    game: game_id,
    category: category_id,
    sort: sort_type,
    limit: limit,
    cnt: cnt,
  })
  return response
}

export const addNewComment = async (
  discussion_id: number,
  parent_id: number,
  content: string,
  user_type: number,
  user: string,
): Promise<Response> => {
  const response = await sendPost('comment/new', {
    discussion_id: discussion_id,
    parent_id: parent_id,
    content: content,
    user_type: user_type,
    user: user,
  })
  return response
}

export const addNewDiscussion = async (
  stuff_id: number,
  content: string,
  user_type: number,
  user: string,
): Promise<Response> => {
  const response = await sendPost('discussion/new', {
    stuff_id: stuff_id,
    content: content,
    user_type: user_type,
    user: user,
  })
  return response
}

export const getItemsByAddress = async (
  address: string,
  sort_type: number,
  limit: number,
  cnt: number,
): Promise<Response> => {
  const response = await sendPost('get_items_by_address', { address: address, sort: sort_type, limit: limit, cnt: cnt })
  return response
}

export const getItemById = async (id: number): Promise<Response> => {
  const response = await sendPost('get_item_by_id', { id: id })
  return response
}

export const getItemByTokenID = async (tokenID: number): Promise<Response> => {
  const response = await sendPost('get_item_by_tokenid', { token_id: tokenID })
  return response
}

export const updateItemByID = async (
  id: number,
  gameId: number,
  categoryId: number,
  description: string,
  name: string,
  isAnonymous: number,
  price: number,
): Promise<Response> => {
  const response = await sendPost('update_item_by_id', {
    id: id,
    game_id: gameId,
    category_id: categoryId,
    name: name,
    is_anonymous: isAnonymous,
    description: description,
    price: price,
  })
  return response
}

export const setLikes = async (
  discussion_id: number,
  parent_id: number,
  user: string,
  likes: boolean,
): Promise<Response> => {
  const response = await sendPost('set_likes', {
    discussion_id: discussion_id,
    parent_id: parent_id,
    user: user,
    likes: likes,
  })
  return response
}

export const getLikes = async (discussion_id: number, parent_id: number, user: string): Promise<Response> => {
  const response = await sendPost('get_likes', { discussion_id: discussion_id, parent_id: parent_id, user: user })
  return response
}

/* eslint-enable */
