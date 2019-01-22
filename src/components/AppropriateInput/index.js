import React, { Component } from 'react'
import { ViewPropTypes, TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class AppropriateInput extends Component {
  static defaultProps = {
    defaultValue: '',
    autoCorrect: false,
    editable: true,
    keyboardType: 'default',
    multiline: false,
    maxLength: 100,
    placeholder: '',
    placeholderTextColor: '#9B9B9B',
    returnKeyType: 'next',
    clearButtonMode: 'while-editing',
    secureTextEntry: false,
    enablesReturnKeyAutomatically: true,
    onChangeText: () => {},
    triggerSubmit: () => {},
    onBlurCallback: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    defaultValue: PropTypes.string,
    autoCorrect: PropTypes.bool,
    editable: PropTypes.bool,
    multiline: PropTypes.bool,
    keyboardType: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    returnKeyType: PropTypes.string,
    clearButtonMode: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    enablesReturnKeyAutomatically: PropTypes.bool,
    onChangeText: PropTypes.func,
    triggerSubmit: PropTypes.func,
    onBlurCallback: PropTypes.func
  }

  render () {
    const {
      style,
      defaultValue,
      secureTextEntry,
      autoCorrect,
      keyboardType,
      editable,
      multiline,
      maxLength,
      onChangeText,
      placeholder,
      placeholderTextColor,
      returnKeyType,
      enablesReturnKeyAutomatically,
      clearButtonMode,
      triggerSubmit,
      textStyle,
      onBlurCallback
    } = this.props

    return (
      <TextInput
        style={ [styles.textInput, style, textStyle,multiline ? styles.lines : null] }
        defaultValue={ defaultValue }
        secureTextEntry={ secureTextEntry }
        autoCorrect={ autoCorrect }
        keyboardType={ keyboardType }
        editable={ editable }
        multiline={ multiline }
        maxLength={ maxLength }
        onChangeText={ (value) => onChangeText(value) }
        placeholder={ placeholder }
        placeholderTextColor={ placeholderTextColor }
        returnKeyType={ returnKeyType }
        returnKeyLabel={ returnKeyType }
        clearButtonMode={ clearButtonMode }
        underlineColorAndroid="transparent"
        enablesReturnKeyAutomatically={ enablesReturnKeyAutomatically }
        onSubmitEditing={ () => triggerSubmit() }
        onBlur={ () => onBlurCallback() }
      />
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 42,
    fontSize: 15
  },
  lines: {
    textAlignVertical: 'top'
  }
})