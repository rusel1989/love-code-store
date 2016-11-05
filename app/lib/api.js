import { NetInfo } from 'react-native'
import qs from 'qs'

const JSON_TYPE = 'application/json'

export default function callApi (options) {
  return NetInfo.isConnected.fetch().then((isConnected) => {
    console.log('First, is ' + (isConnected ? 'online' : 'offline'))
    if (!isConnected) {
      return {
        offline: true,
        message: 'youre_offline'
      }
    } else {
      const { method, payload, token, mimeType = JSON_TYPE } = options
      const requestOptions = {
        method,
        headers: {
          'Accept': mimeType,
          'Content-Type': mimeType
        }
      }

      if (token) {
        requestOptions.headers.Authorization = token
      }

      if (method === 'GET') {
        options.path += `?${qs.stringify(payload)}`
      } else if (typeof payload === 'object') {
        requestOptions.body = JSON.stringify(payload)
      } else if (typeof payload === 'string') {
        requestOptions.body = payload
      }

      const request = fetch(options.path, requestOptions)

      return request
      .then((res) => {
        // if (res.headers.get('content-type').indexOf(mimeType) < 0) {
        //   throw new Error('invalid_server_response')
        // }
        const response = mimeType === JSON_TYPE ? res.json() : res.text()
        return response
        .then((final) => {
          if (!res.ok) {
            throw new Error(response.statusText)
          }
          return final
        })
      })
    }
  })
}
