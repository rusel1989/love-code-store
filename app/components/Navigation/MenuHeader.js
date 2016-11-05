import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Platform, Image } from 'react-native'

import colors from '../../const/colors'
import AppText from '../AppText'
import FontIcon from '../FontIcon'

const PLATFORM_PADDING = Platform.OS === 'ios' ? 15 : 16

class MenuHeader extends Component {
  showAccount () {
  }

  render () {
    const arrow = this.props.accountMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'

    return (
      <View style={styles.menuHeader}>
        <Image style={{ flex: 1, resizeMode: 'cover', width: null, height: null }}>
          <View style={styles.container}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarBg}>
                <Image style={styles.logo} />
              </View>
            </View>
            <View style={styles.headerAccount}>
              <TouchableWithoutFeedback onPress={() => this.showAccount()}>
                <View >
                  <AppText style={styles.username}>
                    {this.props.user.firstname} {this.props.user.lastname}
                  </AppText>
                  <AppText style={{ color: colors.LIGHT_COLOR }}>
                    {this.props.user.email}
                  </AppText>
                </View>
              </TouchableWithoutFeedback>
              <FontIcon.Button
                icon={arrow}
                color={colors.LIGHT_COLOR}
                onPress={this.props.toggleAccountMenu} />
            </View>
          </View>
        </Image>
      </View>
    )
  }

  static get propTypes () {
    return {
      user: PropTypes.object.isRequired,
      navigate: PropTypes.func.isRequired,
      toggleAccountMenu: PropTypes.func.isRequired,
      accountMenuOpen: PropTypes.bool.isRequired
    }
  }

  static get defaultProps () {
    return {
      user: {}
    }
  }
}

const styles = StyleSheet.create({
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.SECONDARY_COLOR,
    height: 170,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
    paddingHorizontal: PLATFORM_PADDING
  },
  avatarWrapper: {
    paddingTop: 16
  },
  avatarBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  logo: {
    width: 50,
    height: 50
  },
  headerAccount: {
    height: 56,
    alignItems: 'center',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    fontWeight: 'bold',
    color: colors.LIGHT_COLOR
  },
  menu: {
    flex: 1,
    paddingVertical: 10
  }
})

export default MenuHeader
