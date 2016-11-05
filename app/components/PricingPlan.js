import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Linking, Image } from 'react-native'
import I18n from 'react-native-i18n'

import AppText from '@n/components/AppText'
import Button from '@n/components/Button'
import colors from '@n/const/colors'

const deviceWidth = Dimensions.get('window').width

class PricingPlan extends Component {
  openUrl (url, query) {
    if (!url) return
    Linking.openURL(url)
  }

  render () {
    return (
      <View style={styles.page}>
        <View style={styles.card}>
          {/* Package title */}
          <View style={styles.row}>
            <AppText type='subheading' style={{ color: colors.PRIMARY_COLOR }}>
              {I18n.t(this.props.planCode)}
            </AppText>
            {this.props.planCode === this.props.activePlan
            ? (
              <AppText type='caption' style={styles.badge}>
                {I18n.t('active')}
              </AppText>
            ) : null}
          </View>
          {/* Package description */}
          <View style={styles.row}>
            <View style={{ flex: 0.4 }}>
              {/* badge */}
              {this.props.image
              ? (
                <Image source={require(this.props.image)} />
              ) : null}
            </View>
            <View style={{ flex: 0.6 }}>
              <AppText type='title' style={styles.price}>
                {this.props.monthlyPriceCZK
                ? `${this.props.monthlyPriceCZK} ${I18n.t('CZK')} / ${I18n.t('month')}`
                : `${this.props.priceCZK} ${I18n.t('CZK')}`}
              </AppText>
              {this.props.features.map((feature, i) =>
                <AppText style={{ paddingBottom: 5 }} key={i}>
                  • {I18n.t(feature)}
                </AppText>
              )}
              <View style={{ paddingVertical: 10, width: 160 }}>
                <Button
                  onPress={() => this.openUrl(this.props.url)}
                  label={I18n.t('buy')} />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  badge: {
    color: colors.LIGHT_COLOR,
    backgroundColor: colors.SECONDARY_COLOR,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginLeft: 5,
    borderRadius: 2
  },
  page: {
    width: deviceWidth,
    paddingHorizontal: 15,
    paddingBottom: 25
  },
  card: {
    borderWidth: 0.5,
    borderColor: colors.GREY_LIGHT,
    borderRadius: 5,
    elevation: 5,
    padding: 15,
    backgroundColor: '#F5F5F5'
  },
  price: {
    color: colors.PRIMARY_COLOR,
    paddingVertical: 10,
    fontWeight: 'bold'
  }
})

export default PricingPlan
