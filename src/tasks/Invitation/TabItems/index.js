import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class TabItems extends Component {
  render () {
    const { number, introduction } = this.props
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>{ number }</Text>
        <Text style={ styles.introduction }>{ introduction }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    color: '#3C3C3C'
  },
  introduction: {
    fontSize: 13,
    color: '#4A4A4A',
    marginTop: 10
  }
})