import React, { Component } from 'react'

import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

export default class KeyboardSpacer extends Component{
  static defaultProps = {
    behavior: 'position'
  }

  static propTypes = {
    behavior: PropTypes.string
  }

  render () {
    return (
      <TouchableWithoutFeedback
        style={ styles.container }
        onPress={ Keyboard.dismiss }
      >
        <View style={ styles.container }>
          { this.props.children }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})