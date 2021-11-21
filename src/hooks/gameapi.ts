import { Response } from 'global/interface'


const sendPost = (requestUrl: string, params: any): Promise<any> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }
  return fetch(process.env.REACT_APP_GAME_API_NODE + requestUrl, requestOptions).then((response) => response.json())
}

export const getBalance = async (address: string): Promise<any> => {
  const response = await sendPost('balance', {address})
  return response
}

export const getValidationCheck = async (address: string): Promise<Response> => {
  const response = await sendPost('verify/address' , { address: address })
  return response
}
