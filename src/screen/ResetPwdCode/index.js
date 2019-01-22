import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import {
  AppropriateInput,
  GradientButton,
  VoiceCode,
  KeyboardSpacer
} from 'components/index'

import { setToastMsg, setResetData } from 'actions/index'

import { isPhone, isCode } from 'util/validation'
import { verification } from 'api/index'

class resetPwd extends Component {
  constructor () {
    super()
    this.state = {
      phone: '',
      code: ''
    }
  }

  changeText (type, val) {
    this.setState({ [type]: val })
  }

  validation () {
    const { phone, code } = this.state

    try {
      if (!phone.trim()) throw '请输入手机号'

      if (!isPhone(phone)) throw '手机号不正确'

      if (!code.trim()) throw '请输入验证码'

      if (!isCode(code)) throw '验证码不正确'

    } catch (err) {
      this.props.setToastMsg(err)

      return false
    }

    this._submit()
  }

  async _submit () {
    try {
      await verification({ ...this.state })

      this.props.setResetData({ ...this.state })
    } catch (err) {
      this.props.setToastMsg(err)
      return false
    }

    this.props.navigation.navigate('ResetPwd')
  }

  render () {
    return (
      <KeyboardSpacer>
        <View style={ styles.container }>
          <Text style={ styles.title }>重置密码</Text>
          <View>
            <Text style={ styles.inputTitle }>手机号</Text>
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={ styles.textInput }
                placeholder={ '请输入用户名绑定的手机号' }
                onChangeText={ val => this.changeText('phone', val) }
                keyboardType="numeric"
                returnKeyType="next"
                maxLength={ 11 }
                placeholderTextColor="#4A4A4A"
              />
            </View>
          </View>
          <View style={ styles.formContainer }>
            <Text style={ styles.inputTitle }>验证码</Text>
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={ styles.textInput }
                placeholder={ '请输入验证码' }
                onChangeText={ val => this.changeText('code', val) }
                returnKeyType="send"
                maxLength={ 6 }
                placeholderTextColor="#4A4A4A"
              />
              <View style={styles.voiceCode}>
                <VoiceCode
                  phone={ this.state.phone }
                  type={'verify'}
                />
              </View>
            </View>
          </View>
          <GradientButton
            style={ styles.button }
            title="下一步"
            triggerClick={ () => this.validation() }
          />
        </View>
      </KeyboardSpacer>
    )
  }
}

export default connect(null, dispatch => ({
  setToastMsg: text => dispatch(setToastMsg(text)),
  setResetData: data => dispatch(setResetData(data))
}))(resetPwd)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingLeft: 41,
    paddingRight: 38,
    paddingTop: 24
  },
  title: {
    fontSize: 26,
    color: '#000',
    fontWeight: '600',
    lineHeight: 45,
    marginBottom: 36
  },
  formContainer: {
    marginTop: 36
  },
  inputTitle: {
    fontSize: 15,
    color: '#9496A0'
  },
  textInputBox: {
    flexDirection: 'row',
    height: 53,
    borderBottomWidth: .3,
    borderBottomColor:'#DADBDC',
    alignItems: 'flex-end'
  },
  textInput: {
    flex:1,
  },
  button: {
    height: 60,
    marginTop: 30
  },
  voiceCode: {
    marginLeft: 12,
    height: 30
  }
})
