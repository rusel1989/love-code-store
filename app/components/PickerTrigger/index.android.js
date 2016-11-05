import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text, Picker } from 'react-native'
import I18n from 'react-native-i18n'

import AppText from '@n/components/AppText'
import colors from '@n/const/colors'

class AndroidPickerTrigger extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const hasOptions = this.props.options && this.props.options.length
    return (
      <View style={[ styles.container, this.props.style ]}>
        <View>
          {this.props.label
          ? <AppText type='subheading'>{this.props.label}</AppText>
          : null}
        </View>
        <View style={{ width: 160 }}>
          {hasOptions
          ? (
            <Picker
              style={{ height: 40 }}
              selectedValue={this.props.value}
              mode='dropdown'
              onValueChange={(val) => this.props.onChange(val)}>
              {this.props.options.map((option, i) =>
                <Picker.Item
                  key={i}
                  label={option.text || 'No Options'}
                  value={option.payload} />
              )}
            </Picker>
          ) : (
            <Text style={styles.label}>{I18n.t(this.props.emptyLabel)}</Text>
          )}
        </View>
      </View>
    )
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
      autoCapitalize: 'none',
      emptyLabel: 'no_items'
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48
  },
  label: {
    color: colors.GREY_DARK,
    fontSize: 16
  }
})

export default AndroidPickerTrigger
