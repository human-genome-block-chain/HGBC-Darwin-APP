import React, { Component } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import platformDiff from 'util/platformDiff'

import { AndroidWhiteBar } from 'components/index'

import Headers from './Headers/index'
import Options from './Options/index'
import Success from './Success/index'
import SwiperTab from './SwiperTab/index'
import Binding from './Binding/index'
import Footers from './Footers/index'


class Wgs extends Component{
  constructor () {
    super()

    this.state = {
      isShow: false,
      isBind: false,
      code: ''
    }
  }

  close () {
    platformDiff.isAndroid && StatusBar.setBackgroundColor('#fff')
    this.setState({ isShow: false })
  }

  prompt () {
    platformDiff.isAndroid && StatusBar.setBackgroundColor('#ccc')
    this.setState({ isShow: true })
  }

  qrCodeVerification (qrCode, err) {
    this.setState({
      code: qrCode,
      isBind: true
    })
  }

  binding () {
    this.setState({ isBind: false })
  }

  render() {
    const { simpleCount, scode, navigation } = this.props
    const { isShow, isBind, code } = this.state
    const isWgs = simpleCount <= 0

    return (
      <SafeAreaView style={ styles.container }>
        <AndroidWhiteBar />
        <Headers
          title={ isWgs ? isBind ? '确认绑定' : '全基因组数据' : '绑定结果' }
          isWgs={ isWgs }
          prompt={ this.prompt.bind(this) }
          navigation={ navigation }
          isBind={ isBind }
        />
        <Options 
          isShow={ isShow }
          close={ this.close.bind(this) }
          navigation={ navigation }
        />
        { isBind ? <Binding callback={ this.binding.bind(this) } code={ code }/>: null }
        {
          isWgs ?
          <View>
            <View style={ styles.main }>
              <Text style={ styles.title }>扫码绑定唾液采集器</Text>
            </View>
            <View style={ styles.shuffling }>
              <SwiperTab />
            </View>
          </View> : 
          <Success text={ scode }/>
        }
        <Footers 
          isWgs={ isWgs }
          next={ this.qrCodeVerification.bind(this) }
          navigation={ navigation }
        />
      </SafeAreaView>
    )
  }
}

export default connect(state => ({ ...state.tasks.WGS }))(Wgs)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    paddingLeft: 36,
    paddingTop: 24,
    paddingBottom: 14
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600'
  },
  shuffling: {
    height: 380
  }
})