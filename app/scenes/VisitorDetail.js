import React, { Component } from 'react'

import { View, Image, ScrollView, StyleSheet } from 'react-native'

import AppText from '../components/AppText'
import TabView from '../components/TabView'
import TextInput from '../components/TextInput'
import ArticleList from '../components/ArticleList'
import FontIcon from '../components/FontIcon'

import callApi from '../lib/api'
import { formatPrice, formatDate } from '../lib/utils'

class VisitorDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visitor: props.route.visitor
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

  renderPrice (price) {
    return <AppText type='subheading'>{formatPrice(price)}</AppText>
  }

  savePersona () {
    console.log('save persona', this.state.visitor.persona)
    callApi({
      method: 'POST',
      path: 'https://lovecode-store.herokuapp.com/persona/checkout/pupca',
      payload: {
        persona: this.state.visitor.persona
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
            </View>
            <TextInput
              width={240}
              valueAlign='center'
              value={visitor.persona.fullName}
              onChangeText={this.getChangeHandler('fullName')} />
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
            items={visitor.recent_purchases} />
          <ArticleList
            tabLabel='Recommended'
            items={visitor.recommendation} />
          <ArticleList
            tabLabel='Inventory'
            items={[]} />
        </TabView>
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
    borderColor: '#af783f',
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
