import React, { Component } from 'react'
import {
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native'

import { AndroidWhiteBar } from 'components/index'

import { MineImg } from 'images/index'

export default class Know extends Component {
  render () {
    return (
      <SafeAreaView style={ styles.container }>
        <AndroidWhiteBar />
        <ScrollView
          style={ styles.container }
          showsVerticalScrollIndicator={ false }
        >
          <Image
            style={ styles.know }
            source={ MineImg.Know }
            resizeMode="cover"
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageBox: {
    flex: 1
  },
  know: {
    width: 375
  }
})