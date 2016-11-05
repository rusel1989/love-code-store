window.navigator.userAgent = 'react-native'

import { WS_BACKEND_URL } from '../config'

let ws = new WebSocket(WS_BACKEND_URL)

export default (handler) => {

  ws.onopen = () => {
    console.log('websocket open')
    ws.send('something') // send a message
  };

  ws.onmessage = (e) => {
    // a message was received
    console.log('websocket message')
    handler(e.data)
  };

  ws.onerror = (e) => {
    // an error occurred
    console.log('websocket error')
    console.log(e.message)
  };

  ws.onclose = (e) => {
    // connection closed
    console.log('websocket close')
    console.log(e.code, e.reason)
    ws = new WebSocket(WS_BACKEND_URL)
  };
}

