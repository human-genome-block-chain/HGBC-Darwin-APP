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
  VoiceCode
} from 'components/index'

import { setToastMsg, setTradePwd } from 'actions/index'

import { isCode } from 'util/validation'


class VerificaCode extends Component {
    constructor (props) {
    super(props)

    this.state = {
      code: ''
    }
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

    this.props.setTradePwd({ code })

    this.props.navigation.navigate('TradingPwd')
  }

  render () {
    return (
      <SafeAreaView style={ styles.container }>
        <KeyboardSpacer>
          <View style={ styles.constout }>
            <Text style={ styles.fonts }>重置交易密码（1/3）</Text>
            <Text style={ styles.fontSi }>请输入{ this.props.phone_encrypt }收到的短信验证码</Text>
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
              <View style={styles.voiceCode}>
                <VoiceCode
                  phone={ this.props.phone }
                  type={'verify'}
                />
              </View>
          </View>
          <View style={ styles.buttonBox }>
            <GradientButton
              style={ styles.next }
              title="下一步"
              triggerClick={ this.validation.bind(this) }
            ></GradientButton>
          </View>
        </KeyboardSpacer>
      </SafeAreaView>
    )
  }
}

export default connect(state => ({ ...state.userInfo }), dispatch => ({
  setToastMsg: msg => dispatch(setToastMsg(msg)),
  setTradePwd: data => dispatch(setTradePwd(data))
}))(VerificaCode)

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    paddingLeft: 25
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
    fontWeight: '600'
  },
  fontsd:{
    fontSize: 14,
    marginTop: 15,
    color:'#82858E'
  },
  fontSi :{
    fontSize: 14,
    color:'#82858E',
    marginTop: 15
  },
  voiceCode: {
    marginLeft: 12,
    height: 30
  }
})
