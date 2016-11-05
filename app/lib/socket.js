window.navigator.userAgent = 'react-native'

import { WS_BACKEND_URL } from '../config'

export default (handler) => {
  let ws = new WebSocket(WS_BACKEND_URL)

  ws.onopen = () => {
    console.log('websocket open')
  }

  ws.onmessage = (e) => {
    // a message was received
    handler(e.data)
  }

  ws.onerror = (e) => {
    // an error occurred
    console.log('websocket error')
    console.log(e.message)
  }

  ws.onclose = (e) => {
    // connection closed
    console.log('websocket close')
    console.log(e.code, e.reason)
    ws = new WebSocket(WS_BACKEND_URL)
  }
}

