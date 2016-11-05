import React, { Component, PropTypes } from 'react'
import { StyleSheet, ListView, View, Text } from 'react-native'
import I18n from 'react-native-i18n'
import map from 'lodash/map'
import find from 'lodash/find'

import EditArticle from '@n/scenes/assortment/EditArticle'
import { getDiscountedPrice, getDiscountSymbol } from '@n/lib/sale'
import ListItem from './ListItem'
import ListSubHeader from './ListSubHeader'
import AppText from './AppText'
import FontIcon from './FontIcon'
import RightChevron from './RightChevron'
import Button from './Button'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
})

class ArticleList extends Component {
  constructor (props, context) {
    super(props, context)
    const productsByCategory = this.mapProductsToCategories(props.products)
    this.state = { dataSource: ds.cloneWithRowsAndSections(productsByCategory) }
  }

  componentWillReceiveProps (nextProps) {
    const productsByCategory = this.mapProductsToCategories(nextProps.products)
    this.setState({
      dataSource: ds.cloneWithRowsAndSections(productsByCategory)
    })
  }

  mapProductsToCategories (products) {
    const data = map(products).reduce((obj, item) => {
      if (!obj[item.category]) {
        obj[item.category] = []
      }
      if (!item.isDeleted) {
        obj[item.category].push(item)
      }
      return obj
    }, {})

    for (let key in data) {
      const catProducts = data[key]
      // catProducts[catProducts.length - 1].lastItem = true
      catProducts.sort((a, b) => (a.favourite === b.favourite) ? 0 : a.favourite ? -1 : 1)
    }

    return data
  }

  renderSectionHeader (data, id) {
    const category = find(this.props.categories, (cat) => cat.oid === id)
    return (
      <ListSubHeader title={category ? category.name : I18n.t('no_category')} />
    )
  }

  renderRightItem (item) {
    const currentPrice = item.isDiscounted
    ? getDiscountedPrice(item.price, item.discount, item.discountType)
    : item.price
    return (
      <View style={styles.rightItem}>
        <AppText type='subheading'>
          {currentPrice} {I18n.t(item.currency)} / {item.measureUnit}
        </AppText>
        <RightChevron />
      </View>
    )
  }

  renderRow (rowData, i) {
    const favIcon = rowData.favourite ? 'star' : 'star_outline'
    const leftItem = (
      <FontIcon.Button
        icon={favIcon}
        color='#FFD700'
        size={24}
        onPress={() => this.props.onFavIconPress(rowData)} />
    )
    return (
      <ListItem
        key={i}
        leftItem={this.props.displayFavIcon ? leftItem : null}
        rightItem={this.renderRightItem(rowData)}
        onPress={() => this.props.onProductPress(rowData)}
        lastItem={false}
        bottomBorderAndroid>
        <View style={styles.listItem}>
          <AppText type='subheading'>
            {rowData.name}{' '}
            {rowData.isDiscounted
            ? (
              <AppText type='caption' style={{ paddingLeft: 5 }}>
                {I18n.t('discount')} {rowData.discount} {getDiscountSymbol(rowData.discountType, I18n.t(rowData.currency))}
              </AppText>
            ) : null}
          </AppText>
        </View>
      </ListItem>
    )
  }

  render () {
    return this.state.dataSource.getRowCount() === 0
    ? (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>{I18n.t('no_items')}</Text>
        <View style={styles.emptyStateButton}>
          <Button
            textStyle={{ fontSize: 13 }}
            label={I18n.t('add_first_product')}
            onPress={() => this.props.navigate({
              title: 'add_product',
              component: EditArticle,
              productId: 'new'
            })} />
        </View>
      </View>
    ) : (
      <ListView
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainerStyle}
        dataSource={this.state.dataSource}
        renderSectionHeader={this.renderSectionHeader.bind(this)}
        renderRow={this.renderRow.bind(this)} />
    )
  }

  static get propTypes () {
    return {
      categories: PropTypes.object,
      products: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      onRemovePress: PropTypes.func,
      onFavIconPress: PropTypes.func,
      onProductPress: PropTypes.func
    }
  }

  static get defaultProps () {
    return {
      onProductPress: () => {},
      onRemovePress: () => {},
      onFavIconPress: () => {}
    }
  }
}

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyStateText: {
    fontWeight: 'bold',
    fontSize: 24
  },
  emptyStateButton: {
    marginTop: 10,
    height: 36
  },
  listHeader: {
    paddingHorizontal: 15,
    height: 28,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center'
  },
  listHeaderText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 17
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentContainerStyle: {
    paddingBottom: 15
  }
})

export default ArticleList
