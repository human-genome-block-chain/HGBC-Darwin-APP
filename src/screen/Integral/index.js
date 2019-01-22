import React, { Component } from 'react'
import { ScrollView, StyleSheet, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import platformDiff from 'util/platformDiff'

import { AndroidWhiteBar } from 'components/index'

import Operation from './Operation/index'
import Rules from './Rules/index'
import Bounced from './Bounced/index'

class Registered extends Component {
  constructor () {
    super()

    this.state = {
      visible: false,
      transparent: true
    }
  }

  close () {
    this.setState({ visible: false })
    platformDiff.isAndroid && StatusBar.setBackgroundColor('#fff')
  }

  _withdrawal () {
    this.props.isSetUp ? this.props.navigation.navigate('Withdrawal'): this.setState({ visible: true })
  }

  render () {
    return (
      <ScrollView style={ styles.container } showsVerticalScrollIndicator={ false }>
        <AndroidWhiteBar />
        <Operation
          navigation={ this.props.navigation }
          withdrawal={ () => this._withdrawal() }
        />
        <Rules />
        <Bounced
          visible={ this.state.visible }
          transparent={ this.state.transparent }
          close={ () => this.close() }
          navigation={this.props.navigation}
        />
      </ScrollView>
    )
  }
}

export default connect(state => ({
  isSetUp: state.userInfo.is_setTradePass > 0
}))(Registered)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})