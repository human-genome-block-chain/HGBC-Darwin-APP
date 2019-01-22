import React, { Component } from 'react'
import {
  Image,
  StyleSheet
} from 'react-native'

import { TaskImg } from 'images/index'

export default class Banner extends Component {
  render () {
    return(
      <Image
        style={ styles.banner }
        source={ TaskImg.Banner }
        resizeMode="cover"
      />
    )
  }
}

const styles = StyleSheet.create({
  banner: {
    flex: 1
  }
})