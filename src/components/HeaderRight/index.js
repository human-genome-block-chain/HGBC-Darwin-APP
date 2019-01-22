import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

export default class NavigationHeaderRight extends Component {

  render () {
    return <View style={ styles.headerRight }/>
  }
}

const styles = StyleSheet.create({
  headerRight: {
    width: 45,
    height: 44
  }
})