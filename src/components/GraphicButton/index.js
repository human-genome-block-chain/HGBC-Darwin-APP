import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ViewPropTypes,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import { CommonImg } from 'images/index'

export default class GraphicButton extends Component {
  static defaultProps = {
    text: 'number',
    source: CommonImg.ButtonBg,
    activeOpacity: .8,
    resizeMode: 'cover',
    triggerClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    text: PropTypes.string,
    source: Image.propTypes.source,
    activeOpacity: PropTypes.number,
    resizeMode: PropTypes.string,
    triggerClick: PropTypes.func
  }

  render () {
    const {
      style,
      textBoxStyle,
      source,
      resizeMode,
      triggerClick,
      children,
      activeOpacity
    } = this.props

    return (
      <TouchableOpacity
        style={ [styles.container, style] }
        onPress={ triggerClick.bind(this) }
        activeOpacity={ activeOpacity }
      >
        <Image
          style={ styles.icon }
          source={ source }
          resizeMode={ resizeMode }
        ></Image>
        <View style={ [styles.textBox, textBoxStyle] }>
          { children }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 30,
    height: 30
  },
  textBox: {
    marginLeft: 9
  }
})