import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, TouchableHighlight, Platform } from 'react-native'

import colors from '@n/const/colors'
import AppText from './AppText'

const PLATFORM_PADDING = Platform.OS === 'ios' ? 15 : 16

class ListItem extends Component {
  render () {
    const { leftItem, rightItem, style, onPress, label, lastItem } = this.props
    const bottomBorder = lastItem ? { borderBottomWidth: 0 } : {}
    const leftPadding = !leftItem ? { paddingLeft: PLATFORM_PADDING } : {}
    const androidBorder = Platform.OS === 'android' && this.props.bottomBorderAndroid && !lastItem
    ? {
      borderColor: colors.GREY_LIGHT,
      borderBottomWidth: 0.5
    } : null

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor={colors.GREY_LIGHT}
        style={[styles.container, style]}>
        <View style={[ styles.innerContainer, style, leftPadding ]}>
          {leftItem
          ? (
            <View style={[styles.sideItem, styles.leftItem]}>
              {leftItem}
            </View>
          ) : null}
          <View style={[ styles.labelContainer, bottomBorder, androidBorder ]}>
            {label
            ? (
              <AppText type='subheading'>
                {label}
              </AppText>
            ) : this.props.children}
            {rightItem
            ? (
              <View style={[styles.sideItem, styles.rightItem]}>
                {typeof rightItem === 'string'
                ? <AppText type='subheading'>{rightItem}</AppText>
                : rightItem}
              </View>
            ) : null}
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  static get propTypes () {
    return {
      leftItem: PropTypes.element,
      rightItem: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      children: PropTypes.element,
      style: PropTypes.object,
      onPress: PropTypes.func,
      lastItem: PropTypes.bool,
      label: PropTypes.string
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT_COLOR,
    ...Platform.select({
      ios: {
        height: 44.5
      },
      android: {
        height: 48
      }
    })
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        borderColor: colors.GREY_LIGHT,
        borderBottomWidth: 0.5
      },
      android: {}
    })
  },
  sideItem: {
    alignItems: 'center'
  },
  leftItem: {
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        width: 50
      },
      android: {
        width: 72
      }
    })
  },
  rightItem: {
    paddingRight: PLATFORM_PADDING
  }
})

export default ListItem
