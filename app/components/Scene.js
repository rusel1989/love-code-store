import React, { Component, PropTypes } from 'react'
import { View, Platform } from 'react-native'

import KeyboardSpacer from './KeyboardSpacer'
import colors from '../const/colors'

class Scene extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      keyboardHeight: 0
    }
  }

  isHome () {
    return this.props.route.title === 'Home'
  }

  render () {
    const { route, navigator, config, printer } = this.props
    const RouteHandler = route.component
    const scenePadding = route.hideNavbar ? 0 : Platform.OS === 'ios' ? 64 : 56
    return (
      <View style={{
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: colors.BACKGROUND_COLOR,
        paddingTop: scenePadding,
        paddingBottom: Platform.OS === 'ios' ? this.state.keyboardHeight : 0
      }}>
        <RouteHandler
          navigator={navigator}
          route={route}
          config={config}
          printer={printer} />
        <KeyboardSpacer
          style={{ backgroundColor: '#000' }}
          onToggle={(isOpened, keyboardHeight) => {
            this.setState({
              keyboardHeight: isOpened ? keyboardHeight : 0
            })
          }} />
      </View>
    )
  }

  static get propTypes () {
    return {
      auth: PropTypes.object,
      route: PropTypes.object,
      navigator: PropTypes.object
    }
  }
}

export default Scene
