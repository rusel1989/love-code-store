import React, { Component, PropTypes } from 'react'
import { Text, View, TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native'
import colors from '@n/const/colors'

class Button extends Component {
  _onPress () {
    if (this.props.disabled) {
      return
    } else {
      this.props.onPress()
    }
  }

  render () {
    const { style, textStyle, onLongPress, label, bgColor, textColor, disabled } = this.props
    const disabledStyle = disabled ? { opacity: 0.6 } : {}
    return (
      Platform.OS === 'ios'
      ? (
        <TouchableOpacity
          style={[styles.button, style, { backgroundColor: bgColor }, disabledStyle]}
          activeOpacity={0.7}
          onPress={this._onPress.bind(this)}
          onLongPress={onLongPress}>
          <Text style={[styles.text, textStyle, { color: textColor }]}>
            {label}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={this._onPress.bind(this)}
          onLongPress={onLongPress}>
          <View style={[styles.button, style, { backgroundColor: bgColor }, disabledStyle]}>
            <Text style={[styles.text, textStyle, { color: textColor }]}>
              {label.toUpperCase()}
            </Text>
          </View>
        </TouchableNativeFeedback>
      )

    )
  }

  static get propTypes () {
    return {
      bgColor: PropTypes.string,
      textColor: PropTypes.string,
      label: PropTypes.string,
      onPress: PropTypes.func
    }
  }

  static get defaultProps () {
    return {
      onPress: () => {},
      bgColor: colors.PRIMARY_COLOR,
      textColor: colors.LIGHT_COLOR
    }
  }
}

const styles = {
  button: {
    flex: 1,
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
      },
      android: {
        borderRadius: 2
      }
    })
  },
  text: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontSize: 16
      },
      android: {
        fontSize: 14,
        fontWeight: '500'
      }
    })
  }
}

export default Button
