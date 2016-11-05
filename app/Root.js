import React, { Component } from 'react'

import './lib/socket'
import App from './App'

console.disableYellowBox = true

class Root extends Component {
  render () {
    return (<App />)
  }
}

export default Root
