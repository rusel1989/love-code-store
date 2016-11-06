import React, { Component } from 'react'
import { View, ScrollView, Image } from 'react-native'

import ListItem from './ListItem'
import AppText from './AppText'
import { formatDate, formatPrice } from '../lib/utils'

class ArticleList extends Component {
  renderPrice (price) {
    return <AppText type='subheading'>{formatPrice(price)}</AppText>
  }

  getSecondaryLabel (item) {
    const parts = [
      item.category
    ]
    if (this.props.purchased) {
      parts.push(`Purchased at ${formatDate(item.purchased_at)}`)
    }
    if (this.props.recommended) {
      parts.push(item.recommendation_text)
    }
    return parts.join(' | ')
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 8 }}>
          {this.props.items.map((item) => {
            const leftItem = (
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'cover',
                  borderRadius: 20
                }} />
            )
            return (
              <ListItem
                bottomBorderAndroid
                onPress={() => this.props.onPress(item)}
                leftItem={leftItem}
                secondaryLabel={this.getSecondaryLabel(item)}
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
