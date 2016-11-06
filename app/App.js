import React, { Component, PropTypes } from 'react'
import { Navigator, StatusBar, Dimensions, StyleSheet, Platform, BackAndroid, NetInfo } from 'react-native'
import assign from 'lodash/assign'

import colors from './const/colors'
import Navigation, { NavigationContent, NavigationBar } from './components/Navigation'
import Scene from './components/Scene'
import Home from './scenes/Home'

const { width } = Dimensions.get('window')
const STATUSBAR_TRANSITION = 'slide'
const INITIAL_ROUTE = {
  component: Home,
  title: 'Home',
  leftAction: NavigationBar.leftActionTypes.SHOW_MENU
}

class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      route: INITIAL_ROUTE,
      isMenuOpen: false,
      cart: {
        items: [],
        count: 0
      }
    }
  }

  handleHardwareBack () {
    if (this._navigator && this._navigator.getCurrentRoutes().length > 1) {
      this._navigator.pop()
      return true
    }
    return false
  }

  handleNetworkChange (isConnected) {
    // if (!isConnected) {
    //   Toast.showLongBottom('No Internet Connection')
    // }    handleNetworkStateChange(isConnected)
  }

  componentWillMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleHardwareBack.bind(this))
    NetInfo.isConnected.addEventListener('change', this.handleNetworkChange.bind(this))
  }

  onRouteWillFocus (route) {
    if (this.state.route.title !== route.title) {
      this.setState({ route })
    }
  }

  renderScene (route, navigator) {
    return (
      <Scene
        updateCart={(cart) => this.setState({ cart })}
        cart={this.state.cart}
        route={route}
        navigator={navigator} />
    )
  }

  configureScene (route, routeStack) {
    if (route.title === 'login' || route.title === 'registration') {
      return Navigator.SceneConfigs.FloatFromBottom
    } else {
      return Navigator.SceneConfigs.FloatFromRight
    }
  }

  toggleMenu () {
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }

  updateMenuState (isMenuOpen) {
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(isMenuOpen, STATUSBAR_TRANSITION)
    }
    this.setState({ isMenuOpen })
  }

  handleMenuPress () {
    if (Platform.OS === 'ios') {
      this.setState({ isMenuOpen: true })
    } else {
      this.state.isMenuOpen ? this._drawer.closeDrawer() : this._drawer.openDrawer()
    }
  }

  handleMenuItemPress (route) {
    this._navigator.push(assign({}, route))
    if (Platform.OS === 'ios') {
      this.setState({ isMenuOpen: false })
    } else {
      this._drawer.closeDrawer()
    }
  }

  handleCartClick (hash) {
    let items = (this.state.cart.items || []).filter((item) => item.personaHash !== hash)
    this.setState({ cart: {items} })
  }

  render () {
    const navBar = (
      <NavigationBar
        route={this.state.route}
        cart={this.state.cart}
        onMenuPress={() => this.handleMenuPress()}
        onCartClick={(hash) => this.handleCartClick(hash)} />
    )
    const menu = (
      <NavigationContent
        user={{
          firstname: 'John',
          lastname: 'Doe',
          email: 'johndoe@gmail.com'
        }}
        navigate={(route) => this.handleMenuItemPress(route)} />
    )
    const BASE_DRAWER_WIDTH = width - 56
    const menuProps = Platform.select({
      ios: {
        style: styles.sideMenu,
        menu: menu,
        isOpen: this.state.isMenuOpen,
        onChange: (isOpen) => this.updateMenuState(isOpen),
        openMenuOffset: 0.6 * width,
        bounceBackOnOverdraw: false
      },
      android: {
        renderNavigationView: () => menu,
        ref: (ref) => { this._drawer = ref },
        onDrawerOpen: () => this.setState({ isMenuOpen: true }),
        onDrawerClose: () => this.setState({ isMenuOpen: false }),
        drawerWidth: BASE_DRAWER_WIDTH > 320 ? 320 : BASE_DRAWER_WIDTH,
        statusBarBackgroundColor: this.state.route.title === 'home' ? colors.SECONDARY_COLOR_DARKER : colors.PRIMARY_COLOR_DARKER
      }
    })

    return (
      <Navigation {...menuProps}>
        <Navigator
          ref={(ref) => { this._navigator = ref }}
          style={styles.navigator}
          onWillFocus={this.onRouteWillFocus.bind(this)}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.configureScene}
          sceneStyle={{ elevation: 10 }}
          navigationBar={navBar}
          initialRoute={INITIAL_ROUTE} />
      </Navigation>
    )
  }

  static get propTypes () {
    return {
      language: PropTypes.string,
      auth: PropTypes.object,
      settings: PropTypes.object
    }
  }
}

const styles = StyleSheet.create({
  sideMenu: {
    backgroundColor: '#fff'
  },
  navigator: {
    backgroundColor: '#fff',
    shadowColor: '#555',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    overflow: 'visible',
    shadowOffset: {
      height: 8,
      width: 0
    }
  }
})

export default App
