import React, { Component } from 'react'
import {
  ViewPropTypes,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import { RightArrow } from 'components/index'

export default class JumpList extends Component {
  static defaultProps = {
    title: '',
    isArrow: true,
    triggerClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    isArrow: PropTypes.bool,
    triggerClick: PropTypes.func
  }

  render () {
    const {
      triggerClick,
      style,
      title,
      isArrow,
      children,
      rightText
    } = this.props

    return (
      <TouchableOpacity
        style={ [styles.container, style] }
        onPress={ (e) => triggerClick(e) }
        activeOpacity={ .9 }
      >
        <Text style={ styles.text }>
          { title }
        </Text>
        {
          isArrow ?
          <RightArrow style={ styles.arrow }></RightArrow> : 
          children
        }
        {
          rightText ? <Text style={ styles.rightText }>{ rightText }</Text>: null
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: '#fff',
    borderBottomWidth: .3,
    borderColor:'#F2F4F5',
    position: 'relative',
    justifyContent: 'center'
  },
  text: {
    fontSize: 15,
    lineHeight: 44,
    color:'#333'
  },
  arrow: {
    position: 'absolute',
    right: 25,
    bottom: 16
  },
  rightText: {
    position: 'absolute',
    right: 42,
    bottom: 14,
    fontSize: 15,
    color: '#333'
  }
})