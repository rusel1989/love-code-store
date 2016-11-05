import React, { Component, PropTypes } from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import colors from '../const/colors'

class TabView extends Component {
  render () {
    return (
      <ScrollableTabView
        initialPage={this.props.initialPage}
        tabBarPosition={this.props.tabBarPosition}
        style={this.props.style}
        tabBarBackgroundColor={colors.PRIMARY_COLOR}
        tabBarUnderlineColor={colors.SECONDARY_COLOR}
        tabBarActiveTextColor={colors.LIGHT_COLOR}
        tabBarInactiveTextColor={colors.PRIMARY_COLOR_LIGHTER}
        onChangeTab={this.props.onChange}>
        {this.props.children}
      </ScrollableTabView>
    )
  }

  static get defaultProps () {
    return {
      onChangeTab: () => {}
    }
  }

  static get propTypes () {
    return {
      onChangeTab: PropTypes.func
    }
  }
}

export default TabView
