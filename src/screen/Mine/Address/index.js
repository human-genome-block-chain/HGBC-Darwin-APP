import React, { Component } from 'react'
import {
  View,
  Text,
  ViewPropTypes,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import { RightArrow } from 'components/index'

export default class Address extends Component {
  static defaultProps = {
    address: ''
  }

  static propTypes = {
    style: ViewPropTypes.style,
    address: PropTypes.string
  }
  render () {
    const address = this.props.address
    
    return (
      <View style={ [styles.container, this.props.style] }>
        <Text style={ styles.title }>钱包地址</Text>
        <Text style={ styles.address }>
          { address? address: '未绑定！' }
        </Text>
        <RightArrow style={ styles.arrow } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 72,
    paddingLeft: 25,
  },
  title: {
    fontSize: 17,
    color: '#222',
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8
  },
  address: {
    fontSize: 12,
    color: '#666',
    position: 'relative'
  },
  arrow: {
    position: 'absolute',
    right: 25,
    bottom: 16
  }
})