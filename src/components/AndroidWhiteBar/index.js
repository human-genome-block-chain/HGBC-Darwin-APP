import React, { Component } from 'react'
import { StatusBar } from 'react-native'

import platformDiff from 'util/platformDiff'

export default class AndroidWhiteBar extends Component {
  constructor () {
    super()
    this.isAndroid = platformDiff.isAndroid
  }

  componentWillMount () {
    StatusBar.setBarStyle('dark-content')
    this.isAndroid && StatusBar.setBackgroundColor('#fff')
    this.isAndroid && StatusBar.setTranslucent(false)
  }

  render () {
    return (
      <StatusBar
        backgroundColor="#fff"
        translucent={ false }
        barStyle="dark-content"
      />
    )
  }
}