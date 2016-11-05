import React, { Component, PropTypes } from 'react'
import { StyleSheet, TouchableHighlight, View, ActionSheetIOS, Image } from 'react-native'
import I18n from 'react-native-i18n'

import colors from '@n/const/colors'
import AppText from '@n/components/AppText'
import chevronRight from '@n/images/ios_chevron_right.png'

class IOSPickerTrigger extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const lastItemStyle = this.props.lastItem ? { borderBottomWidth: 0 } : {}
    return (
      <TouchableHighlight
        underlayColor={colors.GREY_LIGHT}
        onPress={() => this.showActionSheet()}
        style={[ styles.container, this.props.style ]}>
        <View style={[ styles.innerContainer, lastItemStyle ]}>
          {this.props.label
          ? <AppText type='subheading'>{this.props.label}</AppText>
          : null}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppText type='subheading' style={styles.value}>
              {!this.state.selectedIndex
              ? (this.getSelectedOption(this.props.value) || { text: '' }).text
              : this.props.options[this.state.selectedIndex].text}
            </AppText>
            <Image source={chevronRight} style={{ width: 8, height: 13, marginLeft: 5, marginRight: 5 }} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  getButtons () {
    const options = this.props.options.map((o) => o.text)
    options.push(I18n.t('cancel'))
    return options
  }

  getSelectedOption (value) {
    return this.props.options.find((o) => o.payload === value) || this.props.options[0]
  }

  showActionSheet () {
    const buttons = this.getButtons()
    const cancelButtonIndex = buttons.length - 1
    ActionSheetIOS.showActionSheetWithOptions({
      title: this.props.label,
      options: buttons,
      cancelButtonIndex: cancelButtonIndex
    },
    (buttonIndex) => {
      if (buttonIndex === cancelButtonIndex) {
        return
      }
      this.setState({ selectedIndex: buttonIndex })
      this.props.onChange(this.props.options[buttonIndex].payload)
    })
  }

  static get propTypes () {
    return {
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      style: PropTypes.object,
      options: PropTypes.array,
      label: PropTypes.string,
      onChange: PropTypes.func,
      lastItem: PropTypes.bool
    }
  }

  static get defaultProps () {
    return {
      onChange: () => {},
      style: {},
      autoCapitalize: 'none'
    }
  }
}

const FONT_SIZE = 17

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    height: 44.5,
    backgroundColor: colors.LIGHT_COLOR
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderColor: colors.GREY_LIGHT,
    borderBottomWidth: 0.5
  },
  label: {
    fontSize: FONT_SIZE
  },
  value: {
    textAlign: 'right',
    alignItems: 'center'
  }
})

export default IOSPickerTrigger
