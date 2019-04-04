import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { connect } from 'react-redux'

import { GradientButton } from 'components/index'

import platformDiff from 'util/platformDiff'

import { getInvitationQrCode, boundSample } from 'api/index'

import { setTasks, setPower, setToastMsg, setToken } from 'actions/index'

class Binding extends Component{
  constructor(props) {
    super(props)
    
    this.state = {
      serialNum: ' ',
      isClick: true
    }

    this.timer = null
  }
  
  async binding () {
    const { callback, code, setTasks, setToken, setPower, setToastMsg } = this.props
    
    this.setState({ isClick: false })

    try {
      const result = await boundSample(code)

      setPower(result.data.power)
      setToken(result.data.token)

      setToastMsg('绑定成功')

      this.timer = setTimeout (() => {
        setTasks({
          WGS: {
            scode: this.state.serialNum,
            simpleCount: 1,
            power: result.data.power
          }
        })
        callback()
      }, 1000)

      // if (result.data.samtype === 'WES') {
      //   his.timer = setTimeout (() => {
      //     setTasks({
      //       WES: {
      //         scode: this.state.serialNum,
      //         simpleCount: 1,
      //       }
      //     })
      //     callback()
      //   }, 1000)
      // }

    } catch (e) {}

    this.setState({ isClick: true })
  }

  componentWillMount () {
    this._getInvitationQrCode()
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  async _getInvitationQrCode () {
    try {
      const result = await getInvitationQrCode(this.props.code)

      this.setState({ serialNum: result.data })
      
    } catch (e) {
      this.props.callback()
    }
  }

  render () {
    return (
      <View style={ styles.container }>
        <View style={ styles.warning }>
          <View style={ styles.sigh }>
            <Text style={ styles.sighText }>!</Text>
          </View>
          <Text style={ styles.warningText }>唾液采集器与账户绑定完成后，无法解绑定!</Text>
        </View>
        <Text style={ styles.title }>唾液采集器编号</Text>
        <View style={ styles.serial }>
          <Text style={ styles.serialNum }>{ this.state.serialNum }</Text>
          <Text style={ styles.serialText }>绑定完成后，基因组数据可在“我的” - “数据资产”查看</Text>
        </View>
        <GradientButton
          style={ styles.button }
          title="确认绑定"
          triggerClick={ this.state.isClick ? this.binding.bind(this) : () => {} }
        />
      </View>
    )
  }
}

export default connect(null, dispatch => ({
  setTasks: data => dispatch(setTasks(data)),
  setToken: num => dispatch(setToken(num)),
  setPower: num => dispatch(setPower(num)),
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(Binding)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    ...ifIphoneX({
      top: 88,
    },{
      top: platformDiff.isAndroid ? 44 : 64
    }),
    backgroundColor: '#F5F6F7',
    zIndex: 99999,
  },
  warning: {
    height: 40,
    backgroundColor: '#e3e7f5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sigh: {
    width: 15,
    height: 15,
    backgroundColor: '#667AF5',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sighText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  warningText: {
    fontSize: 15,
    color: '#667AF5',
    marginLeft: 8,
    fontWeight: '600'
  },
  title: {
    fontSize: 26,
    color: '#323232',
    marginTop: 33,
    
    textAlign: 'center'
  },
  serial: {
    margin: 20,
    marginBottom: 58,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingTop: 32,
    paddingBottom: 37
  },
  serialNum: {
    fontSize: 26,
    color: '#40B1FF'
  },
  serialText: {
    fontSize: 15,
    color: '#474B5C',
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    lineHeight: 20
  },
  button: {
    marginLeft: 38,
    marginRight: 38,
    height: 60
  }
})