import React, { Component } from 'react'
import { ViewPropTypes, ImageBackground, Image } from 'react-native'
import PropTypes from 'prop-types'

import { LoginImg } from 'images/index'

export default class BackgroundPicture extends Component {
  static defaultProps = {
    source: LoginImg.Bg,
    resizeMode: 'cover'
  }

  static propTypes = {
    style: ViewPropTypes.style,
    source: Image.propTypes.source,
    resizeMode: PropTypes.string,
  }

  render () {
    const { style, source, resizeMode, children }  = this.props

    return (
      <ImageBackground
        style={ style }
        source={ source }
        resizeMode={ resizeMode }
      >
        { children }
      </ImageBackground>
    )
  }
}