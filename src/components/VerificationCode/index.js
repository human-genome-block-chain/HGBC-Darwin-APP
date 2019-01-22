import React, { Component } from 'react'
import { Text, StyleSheet,NativeModules,Alert } from 'react-native'
import { connect } from 'react-redux'

import { isPhone } from 'util/validation'
import { getCode,sendPhoneCode } from 'api/index'

import { setToastMsg } from 'actions/index'

class VerificationCode extends Component {
  constructor () {
    super()

    this.state = {
      countdown: '获取短信验证码',
      isDisabled: false
    }
    this.timer = null
  }
   verifiyAiliCode(){
    const { phone, setToastMsg } = this.props
    if (!isPhone(phone)) {
      setToastMsg('请输入正确的手机号')
      return false
    }
    NativeModules.AliVerifyModule.aliVerify().then((res)=>{
      if (res.sessionId) {
         this.sendPhoneCode(res.sessionId,phone)
      } else {
        setToastMsg('校验失败')
      }
    })
  }
  async sendPhoneCode(sessionId,phone){
    try {
      let result = await sendPhoneCode({sessionId:sessionId,phone:phone})
      // this.sendVerificationCode(phone)
      setToastMsg('语音验证码已发送，请接听')
    } catch (err) {
      setToastMsg(err)
      return false
    }
    this._fireVerification()
  }
  async sendVerificationCode () {
    const { phone, setToastMsg } = this.props
    try {
      await getCode(phone)
      setToastMsg('语音验证码已发送，请接听')
    } catch (err) {
      setToastMsg(err)
      return false
    }
    this._fireVerification()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  _fireVerification () {
    let count = 59
    let countdown = ''
    let isDisabled = false

    if(this.timer) return false

    this.timer = setInterval(() => {
      count--

      countdown = `${count}s 后重新获取`
      isDisabled = true

      if(count <= 0) {
        clearInterval(this.timer)
        count = 59
        countdown = `获取短信验证码`
        isDisabled = false
        this.timer = null
      }

      this.setState({countdown, isDisabled})
    }, 1000)
  }

  render () {
    return (
      <Text
        style={ [styles.verification, this.state.isDisabled ? styles.disabled : null] }
        onPress={ () => !this.state.isDisabled ? this.verifiyAiliCode() : () => {} }
      >
        { this.state.countdown }
      </Text>
    )
  }
}

export default connect(null, dispatch => ({
  setToastMsg: text => dispatch(setToastMsg(text))
}))(VerificationCode)

const styles = StyleSheet.create({
  verification: {
    marginLeft: 12,
    height: 42,
    fontSize: 15,
    color:'#40B1FF',
    lineHeight: 42,
  },

  disabled: {
    color:'#999'
  }
})
