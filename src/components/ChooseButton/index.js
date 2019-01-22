import React, { Component } from 'react'
import {
  ViewPropTypes,
  TouchableOpacity,
  Text,
  Keyboard,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

export default class ChooseButton extends Component {
  static defaultProps = {
    title: '',
    activeOpacity: .6,
    triggerClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    title: PropTypes.string,
    triggerClick: PropTypes.func
  }

  render () {
    const {
      style,
      triggerClick,
      textStyle,
      title
    } = this.props

    return (
      <TouchableOpacity
        onPress={ (e) => {
          Keyboard.dismiss()
          triggerClick(e)
        } }
        style={ [styles.button, style] }
      >
        <Text style={ [styles.buttonText, textStyle] }>{ title }</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#31A6F3',
    borderWidth: .3,
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500'
  }
})