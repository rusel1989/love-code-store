import React, { Component } from 'react'
import { TextInput, View, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native'
import dismissKeyboard from 'dismissKeyboard'
import I18n from 'react-native-i18n'

import colors from '@n/const/colors'
import FontIcon from './FontIcon'
import deleteButton from '../images/ios_delete_button_2.png'

class SearchBar extends Component {
  onCancel () {
    this.props.onSearch('')
    dismissKeyboard()
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={I18n.t('search')}
          placeholderTextColor='#8E8E93'
          onChangeText={(val) => this.props.onSearch(val)}
          value={this.props.searchPhrase}
          underlineColorAndroid='transparent' />
        {Platform.OS === 'ios' && this.props.searchPhrase.length
        ? (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.onCancel()}>
            <Image
              style={styles.cancelButtonImage}
              source={deleteButton} />
          </TouchableOpacity>
        ) : null}
        {Platform.OS === 'android'
        ? (
          <FontIcon.Button
            style={styles.cancelButton}
            icon='close'
            onPress={() => this.onCancel()}
            size={24} />
        ) : null}
      </View>
    )
  }

  static get defaultProps () {
    return {
      searchPhrase: ''
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: '#C9C9CE',
        paddingHorizontal: 8,
        paddingVertical: 7.5,
        height: 43.5
      },
      android: {
        backgroundColor: colors.LIGHT_COLOR,
        paddingHorizontal: 16,
        height: 48,
        elevation: 5,
        borderBottomColor: colors.GREY_LIGHT,
        borderBottomWidth: 1
      }
    })
  },
  input: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: colors.LIGHT_COLOR,
        textAlign: 'center',
        borderRadius: 5
      },
      android: {
        fontSize: 16
      }
    })
  },
  cancelButton: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 0,
        right: 0,
        height: 43.5,
        width: 30,
        paddingTop: 15
      },
      android: {
        alignSelf: 'center'
      }
    })
  },
  cancelButtonImage: {
    ...Platform.select({
      ios: {
        width: 14,
        height: 14
      },
      android: {

      }
    })
  }
})

export default SearchBar
