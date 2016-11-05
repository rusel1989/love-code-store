import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Platform } from 'react-native'
import glyphMap from '@n/const/icon-glyph-map'

class FontIcon extends Component {
  render () {
    const style = {
      fontFamily: Platform.OS === 'ios' ? 'Material Icons' : 'materialicons',
      color: this.props.color,
      fontSize: this.props.size
    }
    let glyph = glyphMap[this.props.icon] || '?'
    if (typeof glyph === 'number') {
      glyph = String.fromCharCode(glyph)
    }
    return (
      <Text style={style}>
        {glyph}
      </Text>
    )
  }

  static get propTypes () {
    return {
      color: PropTypes.string,
      size: PropTypes.number,
      icon: PropTypes.string.isRequired
    }
  }

  static get defaultProps () {
    return {
      size: 18
    }
  }
}

FontIcon.Square = ({ onPress, color, size = 18, icon, bgColor }) =>
  <View style={[styles.square, { backgroundColor: bgColor, width: size + 4, height: size + 4 }]}>
    <FontIcon
      color={color}
      size={size}
      icon={icon} />
  </View>

FontIcon.Button = ({ onPress, color, size, icon, buttonStyle }) =>
  <TouchableOpacity style={buttonStyle} onPress={onPress}>
    <FontIcon
      color={color}
      size={size}
      icon={icon} />
  </TouchableOpacity>

const styles = StyleSheet.create({
  square: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default FontIcon
