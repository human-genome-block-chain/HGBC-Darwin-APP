import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { isPhone } from 'util/validation'
import { getCode,getVerifyCode } from 'api/index'

import { setToastMsg } from 'actions/index'

class VoceCode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // countdown: '接听语音验证码',
      countdown:this.props.type=='voice'?"发送语音验证码":"发送短信验证码",
      isDisabled: false
    }
    this.timer = null
  }
  async sendVoceCode () {
    const { phone, setToastMsg } = this.props
    if (!isPhone(phone)) {
      setToastMsg('请输入正确的手机号')
      return false
    }
    try {
      await getVerifyCode({phone:phone,flag:this.props.type=='voice'})
      if (this.props.type=='voice') {
        setToastMsg('语音验证码已发送，请接收')
      } else {
        setToastMsg('短信验证码已发送，请接收')
      }
    } catch (err) {
      setToastMsg(err)

      return false
    }
    this._fireVoceCode()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  _fireVoceCode () {
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
        countdown = this.props.type=='voice'?"发送语音验证码":"发送短信验证码"
        isDisabled = false
        this.timer = null
      }

      this.setState({countdown, isDisabled})
    }, 1000)
  }

  render () {
    return (
      <Text
        style={ [styles.voceCode, this.state.isDisabled ? styles.disabled : null] }
        onPress={ () => !this.state.isDisabled ? this.sendVoceCode() : () => {} }
      >
        { this.state.countdown }
      </Text>
    )
  }
}

export default connect(null, dispatch => ({
  setToastMsg: text => dispatch(setToastMsg(text))
}))(VoceCode)

const styles = StyleSheet.create({
  voceCode: {
    fontSize: 15,
    color:'#40B1FF',
  },

  disabled: {
    color:'#999'
  }
})
