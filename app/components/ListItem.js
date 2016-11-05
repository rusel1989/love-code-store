import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, TouchableHighlight, Platform } from 'react-native'

import colors from '@n/const/colors'
import AppText from './AppText'

const PLATFORM_PADDING = Platform.OS === 'ios' ? 15 : 16

class ListItem extends Component {
  render () {
    const { leftItem, rightItem, style, onPress, label, secondaryLabel, lastItem } = this.props
    const bottomBorder = lastItem ? { borderBottomWidth: 0 } : {}
    const leftPadding = !leftItem ? { paddingLeft: PLATFORM_PADDING } : {}
    const androidBorder = Platform.OS === 'android' && this.props.bottomBorderAndroid && !lastItem
    ? {
      borderColor: colors.PRIMARY_COLOR,
      borderBottomWidth: 1
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
            <View>
              {label
              ? (
                <AppText type='subheading'>
                  {label}
                </AppText>
              ) : this.props.children}
              {secondaryLabel
              ? (
                <AppText type='caption' style={{ color: '#aaa'}}>
                  {secondaryLabel}
                </AppText>
              ) : null}
            </View>
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
    backgroundColor: colors.BACKGROUND_COLOR,
    ...Platform.select({
      ios: {
        height: 44.5
      },
      android: {
        height: 72
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
        borderColor: colors.PRIMARY_COLOR,
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
