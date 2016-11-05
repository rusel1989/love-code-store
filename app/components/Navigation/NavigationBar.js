import React, { Component, PropTypes } from 'react'
import { Platform, TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native'
import keyMirror from 'key-mirror'

import colors from '../../const/colors'
import FontIcon from '../FontIcon'
//import iosBackButton from '@n/images/ios_back_button.png'

const navbarMargin = Platform.OS === 'ios' ? 20 : 0
const leftActionTypes = keyMirror({
  GO_BACK: null,
  SHOW_MENU: null,
  NONE: null
})

class NavigationBar extends Component {
  constructor (props) {
    super(props)
    this.actions = {
      [leftActionTypes.GO_BACK]: this.renderBackButton.bind(this),
      [leftActionTypes.SHOW_MENU]: this.renderMenuButton.bind(this),
      [leftActionTypes.NONE]: () => null
    }
  }

  isHome () {
    return this.props.route.title === 'Home'
  }

  renderBackButton () {
    const { navigator } = this.props
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navbarButton}>
        {Platform.OS === 'ios'
        ? (
          <Image source={iosBackButton} style={{ width: 12.5, height: 21 }} />
        ) : (
          <FontIcon icon='arrow_back' color='#fff' size={24} />
        )}
      </TouchableOpacity>
    )
  }

  renderMenuButton () {
    return (
      <TouchableOpacity
        onPress={this.props.onMenuPress}
        style={styles.navbarButton}>
        <FontIcon icon='menu' color='#fff' size={24} />
      </TouchableOpacity>
    )
  }

  immediatelyRefresh () {
    this.forceUpdate()
  }

  render () {
    const { route, navigator } = this.props
    const defaultLeftAction = leftActionTypes.GO_BACK
    const { title = '', leftAction = defaultLeftAction, hideNavbar, rightAction } = route
    const rightActionData = typeof rightAction === 'function' ? rightAction(route, navigator) : null
    const bgColor = this.isHome() ? colors.SECONDARY_COLOR : colors.PRIMARY_COLOR
    if (hideNavbar) {
      return null
    }
    const titleArgs = typeof title === 'string' ? [title] : title

    return (
      <View style={[styles.navbar, { paddingTop: navbarMargin, backgroundColor: bgColor }]}>
        <Text style={styles.title}>
          {title}
        </Text>
        {this.actions[leftAction]()}
        {rightActionData
        ? (
          <TouchableOpacity style={styles.rightItem} onPress={rightActionData.onPress}>
            <Text style={styles.rightItemText}>{rightActionData.label}</Text>
          </TouchableOpacity>
        ) : null }
      </View>
    )
  }

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object,
    onMenuPress: PropTypes.func
  }

  static defaultProps = {
    route: {}
  }
}

NavigationBar.leftActionTypes = leftActionTypes

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        height: 64
      },
      android: {
        height: 56
      }
    })
  },
  navbarButton: {
    position: 'absolute',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        left: 7.5,
        height: 44,
        width: 44
      },
      android: {
        left: 16,
        height: 56,
        width: 56
      }
    })
  },
  title: {
    flex: 1,
    fontSize: 17,
    color: '#fff',
    fontWeight: '600',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        textAlign: 'center'
      },
      android: {
        left: 72
      }
    })
  },
  rightItem: {
    position: 'absolute',
    justifyContent: 'center',
    flex: 1,
    ...Platform.select({
      ios: {
        right: 7.5,
        height: 44
      },
      android: {
        right: 16,
        height: 56
      }
    })
  },
  rightItemText: {
    fontSize: 17,
    color: '#fff'
  }
})

export default NavigationBar
