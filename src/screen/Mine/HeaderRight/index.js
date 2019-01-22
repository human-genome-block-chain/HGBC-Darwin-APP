import React, { Component } from 'react'
import { ViewPropTypes, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { MineImg } from 'images/index'

export default class HeaderRight extends Component {
  static defaultProps = {
    source: MineImg.Message,
    resizeMode: 'cover',
    triggerClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    source: Image.propTypes.source,
    resizeMode: PropTypes.string,
    triggerClick: PropTypes.func
  }

  render () {
    const { style, source, resizeMode, triggerClick } = this.props

    return (
      <TouchableOpacity
        onPress={ (e) => triggerClick(e) }
        activeOpacity={ .8 }
      >
        <Image
          style={ [styles.headerRight, style] }
          source={ source }
          resizeMode={ resizeMode }
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  headerRight: {
    width: 22,
    height: 21,
    marginRight: 25
  }
})