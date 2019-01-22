import React, { Component } from 'react'
import {
  View,
  StatusBar
} from 'react-native'

import Barcode from 'react-native-smart-barcode'
import TimerEnhance from 'react-native-smart-timer-enhance'

import { HeaderLeft } from 'components/index'

import { CommonImg } from 'images/index'

import queryString from 'util/queryString'

class Scanning extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#141414', 
      borderBottomWidth: 0,
      height: 44,
      elevation: 0
    },
    headerTitleStyle: {
      flex:1,
      textAlign:'center',
      color: '#fff',
      fontSize: 17,
      fontWeight: '400'
    },
    headerLeft: (<HeaderLeft triggerBack={ () => navigation.goBack() } source={ CommonImg.WhiteBack } />)
  })

  constructor(props) {
    super(props)

    this.state = {
      viewAppear: false
    }

    this.type = props.navigation.getParam('type', 'wgs')
  }

  _onBarCodeRead = (e) => {
    let results = e.nativeEvent.data.code
    let error = false

    try {
      if (this.type === 'wgs' || this.type === 'wes') results = queryString(results).scode

    } catch (e) {
      error = true
    }

    this.props.navigation.state.params.callback(results, error)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Barcode 
          style={{flex: 1}}
          onBarCodeRead={ this._onBarCodeRead.bind(this) }
        />
        <StatusBar
          backgroundColor="#141414"
          translucent={ false }
          barStyle="light-content"
        />
      </View>
    )
  }
}

export default TimerEnhance(Scanning)