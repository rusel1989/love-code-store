import React, { Component } from 'react'
import { Switch } from 'react-native'

import ListItem from '@n/components/ListItem'
import AppText from '@n/components/AppText'

class SwitchField extends Component {
  renderRightItem () {
    return (
      <Switch
        disabled={this.props.disabled}
        value={this.props.value}
        onValueChange={this.props.onValueChange} />
    )
  }

  render () {
    return (
      <ListItem rightItem={this.renderRightItem()}>
        <AppText type='subheading'>{this.props.label}</AppText>
      </ListItem>
    )
  }
}

export default SwitchField
