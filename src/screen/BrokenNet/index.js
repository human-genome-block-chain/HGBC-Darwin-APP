import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet
} from 'react-native'

import { GradientButton } from 'components/index'
import { CommonImg } from 'images/index'

export default class BrokenNet extends Component{
  triggerClick () {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={ styles.container }>
        <Image
          source={ CommonImg.BrokenNetwork }
        />
        <StatusBar
          backgroundColor="#fff"
          translucent={ false }
          barStyle="dark-content"
        />
        <Text style={ styles.text }>当前网络不可用，请检查后重试</Text>
        <GradientButton
          style={ styles.button }
          title="重 试"
          triggerClick={ () => this.triggerClick() }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    padding: 62,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 13,
    color: '#999BA2',
    marginTop: 18,
    marginBottom: 28
  },
  button: {
    width: 300,
    height: 60
  }
})