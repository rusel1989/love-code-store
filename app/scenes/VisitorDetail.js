import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import ActionButton from 'react-native-action-button'
import Snackbar from 'react-native-android-snackbar'
import find from 'lodash/find'

import TabView from '../components/TabView'
import TextInput from '../components/TextInput'
import ArticleList from '../components/ArticleList'
import FontIcon from '../components/FontIcon'
import { HTTP_BACKEND_URL } from '../config'
import colors from '../const/colors'
import callApi from '../lib/api'

class VisitorDetail extends Component {
  constructor (props) {
    super(props)
    console.log('cart', props.cart)
    this.state = {
      visitor: props.route.visitor,
      inventory: props.route.inventory
    }
  }

  getChangeHandler (prop) {
    return (val) => this.setState({
      visitor: {
        ...this.state.visitor,
        persona: {
          ...this.state.visitor.persona,
          [prop]: val
        }
      }
    })
  }

  getCustomDataChangeHandler (prop) {
    return (val) => this.setState({
      visitor: {
        ...this.state.visitor,
        persona: {
          ...this.state.visitor.persona,
          custom_data: {
            ...this.state.visitor.persona.custom_data,
            [prop]: val
          }
        }
      }
    })
  }

  savePersona () {
    callApi({
      method: 'POST',
      path: `${HTTP_BACKEND_URL}/persona/checkout/${this.state.visitor.persona.hash}`,
      payload: {
        persona: this.state.visitor.persona
      }
    })
    .then((res) => {
      Snackbar.show('Successfuly saved persona', {})
    })
    .catch((err) => {
      console.log(err)
      Snackbar.show('Error while saving persona', {})
    })
  }

  addToCart (item) {
    item.personaHash = this.state.visitor.persona.hash
    console.log(item)
    this.props.updateCart({
      items: [ ...this.props.cart.items, item ],
      count: this.props.cart.items.length + 1
    })
  }

  checkout () {
    if (!this.props.cart || !this.props.cart.count) {
      Snackbar.show('Cart is empty', {})
    } else {
      callApi({
        method: 'POST',
        path: `${HTTP_BACKEND_URL}/persona/checkout/${this.state.visitor.persona.hash}`,
        payload: {
          persona: this.state.visitor.persona,
          items: this.state.cart.items.map((item) => item.id)
        }
      })
      .then((res) => {
        Snackbar.show('Successfuly checked out', {})
        this.props.navigator.pop()
      })
      .catch((err) => {
        console.log(err)
        Snackbar.show('Error while checking out', {})
      })
    }
  }

  toggleCelebrity () {
    this.setState({
      ...this.state,
      visitor: {
        ...this.state.visitor,
        persona: {
          ...this.state.visitor.persona,
          celebrity: !this.state.visitor.persona.celebrity
        }
      }
    })
  }

  render () {
    const { visitor } = this.state
    const avatarSource = typeof visitor.persona.image === 'string'
    ? { uri: visitor.persona.image }
    : visitor.persona.image
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 16 }}>
          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.avatar}>
              <Image source={avatarSource} style={styles.avatarImage} />
              {visitor.persona.celebrity
              ? (
                <FontIcon
                  icon='star'
                  size={36}
                  color={colors.GOLD}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }} />
              ) : null}
            </View>
            <TextInput
              width={240}
              valueAlign='center'
              value={visitor.persona.name}
              onChangeText={this.getChangeHandler('name')} />
          </View>
          <View style={{ flex: 0.5 }}>
            <TextInput
              label='T-Shirt Size'
              value={visitor.persona.custom_data.tshirtSize}
              onChangeText={this.getCustomDataChangeHandler('tshirtSize')} />
            <TextInput
              label='Waist Size'
              value={visitor.persona.custom_data.waistSize}
              onChangeText={this.getCustomDataChangeHandler('waistSize')} />
            <TextInput
              label='Shoe Size'
              value={visitor.persona.custom_data.shoeSize}
              onChangeText={this.getCustomDataChangeHandler('shoeSize')} />
          </View>
        </View>
        <TabView initialPage={0}>
          <ArticleList
            tabLabel='Recent'
            purchased
            onPress={(item) => {}}
            items={visitor.recent_purchases} />
          <ArticleList
            tabLabel='Recommended'
            recommended
            onPress={(item) => this.addToCart(item)}
            items={visitor.recommendation} />
          <ArticleList
            tabLabel='Inventory'
            onPress={(item) => this.addToCart(item)}
            items={this.state.inventory} />
        </TabView>
        <ActionButton
          bgColor='rgba(0,0,0,.4)'
          buttonColor={colors.GOLD}
          offsetX={15}
          offsetY={0}>
          <ActionButton.Item
            buttonColor={colors.SECONDARY_COLOR_LIGHTER}
            title='Checkout'
            titleColor={colors.LIGHT_COLOR}
            titleBgColor={colors.SECONDARY_COLOR_LIGHTER}
            onPress={() => this.checkout()}>
            <FontIcon icon='payment' color={colors.LIGHT_COLOR} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={colors.SECONDARY_COLOR_LIGHTER}
            title='Mark as Celebrity'
            titleColor={colors.LIGHT_COLOR}
            titleBgColor={colors.SECONDARY_COLOR_LIGHTER}
            onPress={() => this.toggleCelebrity()}>
            <FontIcon icon='star' color={colors.LIGHT_COLOR} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={colors.SECONDARY_COLOR_LIGHTER}
            title='Save Persona'
            titleColor={colors.LIGHT_COLOR}
            titleBgColor={colors.SECONDARY_COLOR_LIGHTER}
            onPress={() => this.savePersona()}>
            <FontIcon icon='save' color={colors.LIGHT_COLOR} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.GOLD,
    marginBottom: 10
  },
  avatarImage: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 60
  }
})

export default VisitorDetail
