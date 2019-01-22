import React, { Component } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import platformDiff from 'util/platformDiff'

import { AndroidWhiteBar } from 'components/index'
import { TaskImg } from 'images/index'

import Headers from './Headers/index'
import Options from './Options/index'
import Success from './Success/index'
import Binding from './Binding/index'
import Footers from './Footers/index'


class Wes extends Component{
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
    const isWes = simpleCount <= 0

    return (
      <SafeAreaView style={ styles.container }>
        <AndroidWhiteBar />
        <Headers
          title={ isWes ? isBind ? '确认绑定' : '全外显子组数据' : '绑定结果' }
          isWes={ isWes }
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
          isWes ?
          <View>
            <TouchableOpacity
              style={ styles.main }
              onPress={ () => this.props.navigation.navigate('WesCollectionProcess') }
            >
              <Text style={ styles.title }>数据收录流程</Text>
              <Image
                style={ styles.icon }
                source={ TaskImg.Arrow }
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={ styles.shuffling }>
              <Image
                style={ styles.image }
                source={ TaskImg.WesBinding }
                resizeMode="cover"
              />
              <Text style={ styles.imageText }>收录全外显子组数据，获得30点算力奖励</Text>
            </View>
          </View> : 
          <Success text={ scode }/>
        }
        <Footers 
          isWes={ isWes }
          next={ this.qrCodeVerification.bind(this) }
          navigation={ navigation }
        />
      </SafeAreaView>
    )
  }
}

export default connect(state => ({ ...state.tasks.WES }))(Wes)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    paddingTop: 50,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    marginBottom: 20,
    marginRight: 15
  },
  icon: {
    marginTop: 5
  },
  shuffling: {
    alignItems: 'center'
  },
  image: {
    width: 337,
    height: 353,
    borderRadius: 10,
    marginBottom: 30
  },
  imageText: {
    fontSize: 12
  }
})