import React, { Component } from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'

import colors from '@n/const/colors'

class ListSubHeader extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {Platform.OS === 'ios' ? this.props.title.toUpperCase() : this.props.title}
        </Text>
      </View>
    )
  }

  static get defaultProps () {
    return {
      title: ''
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: colors.BACKGROUND_COLOR,
        paddingHorizontal: 15,
        height: 27
      },
      android: {
        paddingHorizontal: 16,
        height: 48
      }
    })
  },
  title: {
    ...Platform.select({
      ios: {
        fontSize: 13,
        color: colors.TEXT_COLOR_LIGHTER
      },
      android: {
        fontSize: 14,
        color: colors.PRIMARY_COLOR
      }
    })
  }
})

export default ListSubHeader
