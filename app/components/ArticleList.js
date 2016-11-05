import React, { Component } from 'react'
import { View, ScrollView, Image } from 'react-native'

import ListItem from './ListItem'
import AppText from './AppText'
import { formatDate, formatPrice } from '../lib/utils'

class ArticleList extends Component {
  renderPrice (price) {
    return <AppText type='subheading'>{formatPrice(price)}</AppText>
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {this.props.items.map((item) => {
            return (
              <ListItem
                bottomBorderAndroid
                leftItem={<Image source={{ uri: item.image }} style={{ width: 40, height: 40, resizeMode: 'cover', borderRadius: 20 }} />}
                secondaryLabel={`Purchased at ${formatDate(item.purchased_at)}`}
                label={item.name}
                rightItem={this.renderPrice(item.price)} />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

export default ArticleList
