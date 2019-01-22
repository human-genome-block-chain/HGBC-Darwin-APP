import React, { Component } from 'react'
import {
  Text,
  View,
  ViewPropTypes,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
 
export default class DashLine extends Component {
  static defaultProps = {
    color: '#ccc',
    size: 0,
    width: 3,
    height: 6
  }

  static propTypes = {
    style: ViewPropTypes.style,
    lineStyle: ViewPropTypes.style,
    color: PropTypes.string,
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }

  _items () {
    const { color, size, lineStyle, width, height } = this.props

    let childrens = []
    let len = Math.floor(size / height)

    for (let i = 0; i < len; i++) {
      childrens.push(
        <View 
          style={ [ styles.dashItem, lineStyle, { backgroundColor: color, width, height } ] }
          key={'dash' + i}>
        </View>
      )
    }

    return childrens
  }

  render() {
    const { width, style } = this.props
    
    return (
      <View style={ [ { width }, style ] }>
        { this._items() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    dashItem: {
      marginTop: 6
    }
})
