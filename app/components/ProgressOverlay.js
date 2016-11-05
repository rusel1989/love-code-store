import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View, StyleSheet, Platform } from 'react-native'
import colors from '@n/const/colors'
import AppText from '@n/components/AppText'

class ProgressOverlay extends Component {
  render () {
    if (!this.props.show) {
      return <View />
    }
    return (
      <View style={styles.overlay}>
        <ActivityIndicator
          size={Platform.OS === 'ios' ? 'large' : 60}
          color={colors.PRIMARY_COLOR} />
        <AppText type='subheading' style={{ textAlign: 'center' }}>
          {this.props.text}
        </AppText>
      </View>
    )
  }

  static get propTypes () {
    return {
      show: PropTypes.bool
    }
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)'
  }
})

export default ProgressOverlay
