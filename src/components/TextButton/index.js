import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

export default class TextButton extends Component {
  static defaultProps = {
    location: 'left',
    activeOpacity: .8,
    triggerClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    location: PropTypes.string,
    activeOpacity: PropTypes.number,
    triggerClick: PropTypes.func
  }

  _textAlign () {
    const type = this.props.location

    if (type === 'right') {
      return styles.rightText
    } else if(type === 'center') {
      return styles.centerText
    } else {
      return styles.leftText
    }
  }

  render () {
    const { style, triggerClick, textStyle, activeOpacity, children } = this.props

    return (
      <View style={ [styles.textButtonBox, style] }>
        <TouchableOpacity 
          style={ [
            styles.touchableBox,
            this._textAlign()
          ] }
          activeOpacity={ activeOpacity }
          onPress={ (e) => triggerClick(e) }
        >
          <Text style={ [styles.forgotPassword, textStyle] }>
            { children }
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textButtonBox: {
    position: 'relative',
    height: 24
  },
  touchableBox: {
    position: 'absolute',
    top: 0
  },
  leftText: {
    left: 0
  },
  centerText: {
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  rightText: {
    right: 0
  },
  textColor: {
    color: '#333'
  },
  forgotPassword: {
    color: '#40B1FF'
  }
})
