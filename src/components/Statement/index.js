import React, { Component } from 'react'
import { ViewPropTypes, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class Statement extends Component {
  static defaultProps = {
    triggerClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    triggerClick: PropTypes.func
  }

  render () {
    const { triggerClick, style, agreementStyles, children } = this.props

    return (
      <TouchableOpacity
        onPress={ e => triggerClick(e) }
        style={ style }
        activeOpacity={ .9 }
      >
        <Text 
          style={ [styles.agreement, agreementStyles] }
        >
          { children }
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  agreement: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center'
  }
})