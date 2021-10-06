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

export const getDiscussion = async(id: number) => {
  const response = await sendPost("discussion", {id: id})
  return response.data
}