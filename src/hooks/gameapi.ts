const sendPost = (requestUrl: string, params: any): Promise<any> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }
  return fetch(process.env.REACT_APP_GAME_API_NODE + requestUrl, requestOptions)
    .then((response) => response.json())
    .catch((ex) => {
      return { result: false, msg: ex.message }
    })
}

export const getBalance = async (address: string): Promise<any> => {
  const response = await sendPost('balance', {address})
  return response
}

export const getValidationCheck = async (address: string): Promise<any> => {
  const response = await sendPost('verify/address' , { address: address })
  return response
}

export const getGamepointValidation = async (txid: string): Promise<any> => {
  const response = await sendPost('verify/txid', { txid: txid })
  return response
}
