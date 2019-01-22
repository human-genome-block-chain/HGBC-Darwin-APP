import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'

import { CommonImg } from 'images/index'

export default class RightArrow extends Component {
  render () {
    return (
      <Image
        style={ [styles.arrow, this.props.style] }
        source={ CommonImg.Arrow }
        resizeMode="cover"
      />
    )
  }
}

const styles = StyleSheet.create({
  arrow: {
    width: 7,
    height: 13
  }
})