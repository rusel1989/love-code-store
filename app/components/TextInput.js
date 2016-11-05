import React, { Component, PropTypes } from 'react'
import { StyleSheet, TextInput, View, Platform } from 'react-native'

import AppText from './AppText'
import colors from '@n/const/colors'

class CustomTextInput extends Component {
  render () {
    const lastItemStyle = this.props.lastItem ? { borderBottomWidth: 0 } : {}
    const inputContainerStyle = {}
    if (Platform.OS === 'android') {
      inputContainerStyle.width = this.props.width
    }
    if (this.props.leftItem) {
      inputContainerStyle.flexDirection = 'row'
    }
    return (
      <View style={[ styles.container, this.props.style ]}>
        <View style={[ styles.innerContainer, lastItemStyle ]}>
          {this.props.label
          ? (
            <AppText type='subheading' style={{ paddingHorizontal: 16 }}>
              {this.props.label}
            </AppText>
          )
          : null}
          <View style={[ styles.textInputContainer, inputContainerStyle ]}>
            <TextInput
              style={[ styles.textInput, { textAlign: this.props.valueAlign } ]}
              placeholder={this.props.placeholder}
              value={`${this.props.value != null ? this.props.value : ''}`}
              placeholderTextColor={colors.GREY_LIGHT}
              onChangeText={this.props.onChangeText}
              autoCorrect={this.props.autoCorrect}
              autoCapitalize={this.props.autoCapitalize}
              autoFocus={this.props.autoFocus}
              secureTextEntry={this.props.secureTextEntry}
              selectTextOnFocus={this.props.selectTextOnFocus}
              returnKeyType={this.props.returnKeyType}
              numberOfLines={this.props.numberOfLines}
              multiline={this.props.multiline}
              underlineColorAndroid={colors.LIGHT_COLOR}
              keyboardType={this.props.keyboardType} />
            <View style={styles.leftItem}>
              {this.props.leftItem
              ? typeof this.props.leftItem === 'string'
              ? <AppText type='subheading'>{this.props.leftItem}</AppText>
              : this.props.leftItem
              : null}
            </View>
          </View>
        </View>
      </View>
    )
  }

  static get propTypes () {
    return {
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      style: PropTypes.object,
      label: PropTypes.string,
      onChangeText: PropTypes.func,
      placeholder: PropTypes.string,
      autoCorrect: PropTypes.bool,
      autoCapitalize: PropTypes.string,
      autoFocus: PropTypes.bool,
      secureTextEntry: PropTypes.bool,
      keyboardType: PropTypes.string,
      lastItem: PropTypes.bool
    }
  }

  static get defaultProps () {
    return {
      onChangeText: () => {},
      style: {},
      autoCapitalize: 'none',
      value: '',
      width: 160,
      returnKeyType: 'next',
      valueAlign: 'right'
    }
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.LIGHT_COLOR,
    ...Platform.select({
      ios: {
        height: 44.5,
        paddingLeft: 15
      },
      android: {
        height: 48,
        paddingHorizontal: 16
      }
    })
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        borderColor: colors.GREY_LIGHT,
        borderBottomWidth: 0.5,
        paddingRight: 15
      },
      android: {}
    })
  },
  textInputContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        flex: 1
      },
      android: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 160
      }
    })
  },
  textInput: {
    flex: 1,
    color: colors.LIGHT_COLOR,
    ...Platform.select({
      ios: {
        height: 44.5,
        fontSize: 17,
        textAlign: 'right'
      },
      android: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 16
      }
    })
  },
  leftItem: {
    ...Platform.select({
      ios: {
        marginLeft: 5
      },
      android: {
      }
    })
  }
})

export default CustomTextInput
