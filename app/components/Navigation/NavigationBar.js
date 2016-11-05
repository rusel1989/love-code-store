import React, { Component, PropTypes } from 'react'
import { Platform, TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native'
import keyMirror from 'key-mirror'

import colors from '../../const/colors'
import FontIcon from '../FontIcon'
import AppText from '../AppText'
//import iosBackButton from '@n/images/ios_back_button.png'

const navbarMargin = Platform.OS === 'ios' ? 20 : 0
const leftActionTypes = keyMirror({
  GO_BACK: null,
  SHOW_MENU: null,
  NONE: null
})

const rightActionTypes = keyMirror({
  SHOW_CART: null,
})

class NavigationBar extends Component {
  constructor (props) {
    super(props)
    this.actions = {
      [leftActionTypes.GO_BACK]: this.renderBackButton.bind(this),
      [leftActionTypes.SHOW_MENU]: this.renderMenuButton.bind(this),
      [leftActionTypes.NONE]: () => null,
      [rightActionTypes.SHOW_CART]: this.renderShowCartButton.bind(this)

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
        style={[styles.navbarButton, { left: 16 }]}>
        {Platform.OS === 'ios'
        ? (
          <Image source={iosBackButton} style={{ width: 12.5, height: 21 }} />
        ) : (
          <FontIcon icon='arrow_back' color='#fff' size={24} />
        )}
      </TouchableOpacity>
    )
  }

  getCartItemsCount () {
    return this.props.cart.items.filter((item) => item.personaHash === this.props.route.visitor.persona.hash).length
  }

  renderShowCartButton () {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <AppText type='subheading'>
          {this.getCartItemsCount()}
        </AppText>
        <View>
          <FontIcon.Button
            buttonStyle={{ paddingRight: 16, paddingLeft: 8, alignItems: 'flex-end' }}
            size={24}
            icon='shopping_cart'
            color={colors.LIGHT_COLOR}
            onPress={() => {}}/>
        </View>
      </View>
    )
  }

  renderMenuButton () {
    return (
      <TouchableOpacity
        onPress={this.props.onMenuPress}
        style={[styles.navbarButton, { left: 16 }]}>
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
        {this.actions[leftAction] && this.actions[leftAction]()}
        {this.actions[rightAction] && this.actions[rightAction]()}
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
NavigationBar.rightActionTypes = rightActionTypes

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
        height: 44,
        width: 44
      },
      android: {
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
