import React, { Component } from 'react'
import { ViewPropTypes, Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import { CommonImg } from 'images/index'

export default class NavigationHeaderRight extends Component {
  static defaultProps = {
    source: CommonImg.Back,
    resizeMode: 'cover',
    triggerBack: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    source: Image.propTypes.source,
    resizeMode: PropTypes.string,
    triggerBack: PropTypes.func
  }

  render () {
    const { style, buttonStyle, source, resizeMode, triggerBack } = this.props

    return (
      <TouchableOpacity
        style={ [styles.headerBox, buttonStyle? buttonStyle : { flex: 1 }] }
        onPress={ e => triggerBack(e) }
        activeOpacity={ .8 }
      >
        <Image
          style={ [styles.headerLeft, style] }
          source={ source }
          resizeMode={ resizeMode }
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  headerBox: {
    width: 54,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerLeft: {
    width: 14,
    height: 12
  }
})