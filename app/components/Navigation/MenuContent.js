import React, { Component, PropTypes } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import assign from 'lodash/assign'

import List from '../List'
import ListItem from '../ListItem'
import AppText from '../AppText'

const MENU_SECTIONS = [{
  title: 'general',
  items: [
    {
      component: '../../scenes/Home',
      title: 'Home'
    }
  ]
}]

class MenuContent extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.menu}>
            {MENU_SECTIONS.map((section, i) => {
              return (
                <List
                  title={section.title ? section.title : null}
                  key={`${section.title}__${i}`}>
                  {section.items.map((scene, i) => (
                    <ListItem
                      key={`${scene.title}__${i}`}
                      onPress={() => this.props.navigate(scene)}>
                      <AppText>{scene.title}</AppText>
                    </ListItem>
                  ))}
                </List>
              )
            })}
          </View>
        </ScrollView>
      </View>
    )
  }

  static get propTypes () {
    return {
      navigate: PropTypes.func.isRequired
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menu: {
    paddingVertical: 8
  }
})

export default MenuContent
