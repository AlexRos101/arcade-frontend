import { useEffect, useState } from 'react'

const sendPost = (requestUrl: string, params: any) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    }
    return fetch(process.env.REACT_APP_API_NODE + requestUrl, requestOptions)
        .then(response => response.json())
  }
  
const sendPostFile = (requestUrl: string, formData: any) => {
return fetch(process.env.REACT_APP_API_NODE + requestUrl, {method: 'POST', body: formData})
    .then(response => response.json())
}

export const getAllStuff = async() => {
  const response = await sendPost("stuff/all", {})
  return response.data
}

export const getStuff = async(id: number) => {
  const response = await sendPost("stuff", {id: id})
  return response.data
}

export const getAllDiscussion = async(id: number, limit: number, cnt: number) => {
  const response  = await sendPost("discussion/all/", {id: id, limit: limit, cnt: cnt})
  return response.data
}

export const getSearch = async(keyword: string) => {
  const response  = await sendPost("stuff/search/", {keyword: keyword})
  return response.data
}

export const getDiscussion = async(id: number) => {
  const response = await sendPost("discussion", {id: id})
  return response.data
}

export const getGames = async () => {
  const response = await sendPost("get_games", {})
  return response
}

export const getCategories = async () => {
  const response = await sendPost('get_categories', {})
  return response
}

export const getMarketItems = async(game_id: number, category_id: number, sort_type: number, limit: number, cnt: number) => {
  const response = await sendPost("get_market_items", {game: game_id, category: category_id, sort: sort_type, limit: limit, cnt: cnt})
  return response
}

export const addNewComment = async(discussion_id: number, parent_id: number, content: string, user_type: number, user: string) => {
  const response = await sendPost("comment/new", {discussion_id: discussion_id, parent_id: parent_id, content: content, user_type: user_type, user: user})
  return response
}

export const addNewDiscussion = async(stuff_id: number, content: string, user_type: number, user: string) => {
  const response = await sendPost("discussion/new", {stuff_id: stuff_id, content: content, user_type: user_type, user: user})
  return response
}
