import React, { Component } from 'react'
import { ViewPropTypes, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import {TextButton} from '../../../components/index';

export default class HeaderRight extends Component {
  static defaultProps = {
    triggerClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    resizeMode: PropTypes.string,
    triggerClick: PropTypes.func
  }

  render () {
    const { style, triggerClick } = this.props

    return (
        <TextButton
          style={ [styles.headerRight, style] }
          textStyle={ styles.buttonButText }
          activeOpacity={ .8 }
          location="right"
          triggerClick={ (e) => triggerClick(e) }>全部已读</TextButton>
    )
  }
}

const styles = StyleSheet.create({
  headerRight: {
    flex: 1,
    marginRight: 25
  },
  buttonButText: {
    fontSize: 15,
    marginTop: 5
  },
})