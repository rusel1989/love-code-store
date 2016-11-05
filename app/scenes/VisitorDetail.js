import React, { Component } from 'react'

import { View, Image, ScrollView, StyleSheet } from 'react-native'

import TabView from '../components/TabView'
import TextInput from '../components/TextInput'
import List from '../components/List'
import ListItem from '../components/ListItem'

class VisitorDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visitor: props.route.visitor
    }
  }

  getChangeHandler (prop) {
    return (val) => this.setState({ visitor: { ...this.state.visitor, [prop]: val } })
  }

  render () {
    const { visitor } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 16 }}>
          <View style={{ flex: 0.3 }}>
            <View style={styles.avatar}>
              <Image source={visitor.avatar} style={styles.avatarImage} />
            </View>
          </View>
          <View style={{ flex: 0.7 }}>
            <TextInput
              label='Full Name'
              value={visitor.fullName}
              onChangeText={this.getChangeHandler('fullName')} />
            <TextInput
              label='Size'
              value={visitor.size}
              onChangeText={this.getChangeHandler('size')} />
            <TextInput
              label='Shoe Size'
              value={visitor.shoeSize}
              onChangeText={this.getChangeHandler('shoeSize')} />
          </View>
        </View>
        <TabView initialPage={0}>
          <View tabLabel="Recent" key={0}>
            <List>
              {visitor.recent_purchases.map((purchase) => {
                return (
                  <ListItem />
                )
              })}
            </List>
          </View>
          <View tabLabel="Recommended" key={1}>
            <List>
              {visitor.recommendation.map((recommendation) => {
                return (
                  <ListItem
                    label={recommendation.name}
                    rightItem={recommendation.price} />
                )
              })}
            </List>
          </View>
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
    borderColor: '#af783f'
  },
  avatarImage: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'contain'
  }
})

export default VisitorDetail
