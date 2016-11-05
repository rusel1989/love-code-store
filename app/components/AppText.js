import React, { Component } from 'react'
import { Text, StyleSheet, Platform } from 'react-native'

class AppText extends Component {
  render () {
    return (
      <Text
        style={[ styles.text, styles[this.props.type], this.props.style ]}
        numberOfLines={this.props.numberOfLines}
        ellipsizeMode={this.props.ellipsizeMode}
        onPress={this.props.onPress}>
        {this.props.children}
      </Text>
    )
  }

  static get defaultProps () {
    return {
      type: 'body'
    }
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
    ...Platform.select({
      ios: {
        color: '#fff'
      },
      android: {
        color: 'rgba(255,255,255,0.87)'
      }
    })
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  subheading: {
    ...Platform.select({
      ios: {
        fontSize: 17
      },
      android: {
        fontSize: 16
      }
    })
  },
  body: {
    fontSize: 14
  },
  caption: {
    fontSize: 12,
    ...Platform.select({
      ios: {},
      android: {
        color: 'rgba(0,0,0,0.54)'
      }
    })
  }
})

export default AppText
