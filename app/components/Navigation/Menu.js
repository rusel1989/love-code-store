import React, { Component } from 'react'
import { View } from 'react-native'

import MenuHeader from './MenuHeader'
import MenuContent from './MenuContent'

class Menu extends Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <MenuHeader
          user={this.props.user}
          navigate={this.props.navigate}
          toggleAccountMenu={this.props.toggleAccountMenu}
          accountMenuOpen={this.props.accountMenuOpen} />
        <MenuContent
          navigate={this.props.navigate} />
      </View>
    )
  }
}

export default Menu
