import React, { Component } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import platformDiff from 'util/platformDiff'

import HeaderRight from './HeaderRight/index'
import Information from './Information/index'
import Operation from './Operation/index'
import Bounced from './Bounced/index'

class Mine extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <HeaderRight 
        triggerClick={ () => navigation.navigate('Message') }
      />
    )
  })

  constructor () {
    super()
    this.isAndroid = platformDiff.isAndroid
    this.state = {
      visible: false,
      transparent:true
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
      <SafeAreaView style={ styles.content }>
        <StatusBar
          backgroundColor="#fff"
          translucent={ false }
          barStyle="dark-content"
        />
        <Information navigation={this.props.navigation} withdrawal={ () => this._withdrawal() }></Information>
        <Operation style={ styles.spacing } navigation={this.props.navigation}></Operation>
        <Bounced
          visible={ this.state.visible }
          transparent={ this.state.transparent }
          errorText={ this.state.errorText }
          close={ () => this.close() }
          navigation={this.props.navigation}
        />
      </SafeAreaView>
    )
  }
}

export default connect(state => ({
  isSetUp: state.userInfo.is_setTradePass > 0
}))(Mine)

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#F9FAFC'
  },
  spacing: {
    marginTop: 10
  }
})