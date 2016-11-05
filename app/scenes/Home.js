import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import map from 'lodash/map'

import AppText from '../components/AppText'
import VisitorDetail from '../scenes/VisitorDetail'

const visitors = [{
  avatar: require('../images/macaulay.png'),
  fullName: 'Kevin Costner',
  recent_purchases: [
    { name: 'Michael Kors Purse', price: 120 }
  ],
  recommendation: [

  ]
}, {
  avatar: require('../images/charlie.png'),
  fullName: 'Charlie Sheen',
  recent_purchases: [],
  recommendation: []
}, {
  avatar: require('../images/charlie.png'),
  fullName: 'John Dildoxxxxxx long fuck name',
  recent_purchases: [],
  recommendation: []
}]

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = { visitors }
  }

  selectVisitor (visitor) {
    this.props.navigator.push({
      component: VisitorDetail,
      title: visitor.fullName,
      visitor
    })
  }

  render () {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ alignItems: 'center' }}>
          <AppText type='title' style={{ paddingVertical: 34 }}>Visitors</AppText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {map(this.state.visitors, (visitor, i) => {
            return (
              <TouchableOpacity
                style={{ flex: 0.33333 }}
                activeOpacity={0.75}
                onPress={() => this.selectVisitor(visitor)}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.avatar}>
                    <Image
                      style={styles.avatarImage}
                      source={visitor.avatar} />
                  </View>
                  <AppText
                    numberOfLines={1}
                    style={{ textAlign: 'center', paddingVertical: 8 }}>
                    {visitor.fullName}
                  </AppText>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
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

export default Home
