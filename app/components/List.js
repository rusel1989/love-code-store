import React, { Component, PropTypes } from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import ListSubHeader from './ListSubHeader'
import colors from '@n/const/colors'

class List extends Component {
  render () {
    const { title, children, style } = this.props
    return (
      <View style={[styles.container, style]}>
        {title
        ? <ListSubHeader title={title} />
        : null}
        <View style={styles.content}>
          {children}
        </View>
      </View>
    )
  }

  static get propTypes () {
    return {
      title: PropTypes.string,
      children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
      style: PropTypes.object
    }
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: 28.5
      },
      android: {
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: colors.PRIMARY_COLOR
      }
    })
  },
  content: {
    backgroundColor: colors.LIGHT_COLOR,
    ...Platform.select({
      ios: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: colors.GREY_LIGHT
      },
      android: {

      }
    })
  }
})

export default List
