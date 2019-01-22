import React, { Component } from 'react'
import { 
  ViewPropTypes,
  ImageBackground,
  Image,
  Text,
  Keyboard,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import { WithdraWal } from 'images/index.js'

export default class GradientButton extends Component {
  static defaultProps = {
    title: '',
    source:WithdraWal.BouncedOff,
    activeOpacity: .6,
    resizeMode: 'cover',
    triggerClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    title: PropTypes.string,
    source: Image.propTypes.source,
    activeOpacity: PropTypes.number,
    resizeMode: PropTypes.string,
    triggerClick: PropTypes.func
  }

  render () {
    const {
      style,
      source,
      resizeMode,
      triggerClick,
      activeOpacity,
      textStyle,
      title
    } = this.props

    return (
      <ImageBackground
        style={ [styles.backgroundImage, style] }
        source={ source }
        resizeMode={ resizeMode }
      >
        <TouchableOpacity
          onPress={ (e) => {
            Keyboard.dismiss()
            triggerClick(e)
          } }
          style={ styles.button }
          activeOpacity={ activeOpacity }
        >
          <Text style={ [styles.buttonText, textStyle] }>
            { title }
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 57
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500'
  }
})