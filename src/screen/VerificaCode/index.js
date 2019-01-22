import React, { Component } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import {
  AppropriateInput,
  GradientButton,
  KeyboardSpacer,
  VerificationCode
} from 'components/index'

import { setToastMsg, setUserInfo } from 'actions/index'

import { isCode } from 'util/validation'
import { account } from 'api/index'

class VerificaCode extends Component {
    constructor (props) {
    super(props)

    this.state = {
      code: ''
    }

    this.goBackPath = props.navigation.getParam('back', 'Mine')
  }

  changeInput (type, val) {
    this.setState({[type]: val})
  }

  validation () {
    const { setToastMsg } = this.props
    const code = this.state.code

    try {

      if (!code.trim()) throw '请输入验证码'

      if (!isCode(code)) throw '验证码不正确'

    } catch (err) {
      setToastMsg(err)

      return false
    }

    this._submit()
  }

  async _submit () {
    const { tradePass, navigation, setToastMsg, setUserInfo } = this.props

    const sendData = {
      tradePass: tradePass,
      ...this.state
    }

    try {
      await account(sendData)

      this.props.setToastMsg('设置成功')

      setUserInfo({ is_setTradePass: 1 })

      this.timer = setTimeout (() => {
        navigation.navigate(this.goBackPath)
      }, 1000)

    } catch (err) {
      setToastMsg(err)
    }
  }

  render () {
    return (
      <SafeAreaView style={ styles.container }>
        <KeyboardSpacer>
          <View style={ styles.constout }>
            <Text style={ styles.fonts }>请输入{ this.props.phone_encrypt }收到的短信验证码（3/3）</Text>
          </View>
          <View style={ styles.textInputBox }>
            <AppropriateInput
                style={ styles.textInput }
                placeholder={'请输入验证码'}
                keyboardType="numeric"
                maxLength={ 6 }
                returnKeyType="send"
                onChangeText={ val => this.changeInput('code', val) }
                triggerSubmit={ this.validation.bind(this) }
              />
              <VerificationCode
                phone={ this.props.phone }
              />
          </View>
          <View style={ styles.buttonBox }>
            <GradientButton
              style={ styles.next }
              title="完成"
              triggerClick={ this.validation.bind(this) }
            ></GradientButton>
          </View>
        </KeyboardSpacer>
      </SafeAreaView>
    )
  }
}

export default connect(state => ({ ...state.tradePwd, ...state.userInfo }), dispatch => ({
  setUserInfo: data => dispatch(setUserInfo(data)),
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(VerificaCode)

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    paddingLeft: 25,
  },
  constout:{
    paddingLeft: 25,
    paddingTop: 20
  },
  textInputBox: {
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: .5,
    borderBottomColor:'#DADBDC',
    alignItems: 'flex-end'
  },
  buttonBox: {
    alignItems: 'center'
  },
  next: {
    marginTop: 36,
    marginBottom: 30,
    height: 66,
    width: 300
  },
  textInputBox: {
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: .5,
    borderBottomColor:'#DADBDC',
    alignItems: 'flex-end',
    marginLeft: 30,
    marginRight: 30
  },
  textInput: {
    flex:1,
  },
  fonts:{
    fontSize: 24,
    paddingRight: 20,
    fontWeight: '600',
  },
  fontsd:{
    fontSize: 14,
    marginTop: 15,
    color:'#82858E'
  }
})
