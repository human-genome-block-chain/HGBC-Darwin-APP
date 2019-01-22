import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { AppropriateInput, GradientButton, KeyboardSpacer } from 'components/index'

import { isPassword } from 'util/validation'

import { setToastMsg } from 'actions/index'

import { resetUserPass } from 'api/index'

class resetPwd extends Component {
  constructor () {
    super()
    this.state = {
      password: '',
      repeatPwd: ''
    }
    this.timer = null
  }

  changeText (type, val) {
    this.setState({ [type]: val })
  }

  validation () {
    const { password, repeatPwd } = this.state

    try {
      if (!password.trim()) throw '请输入密码'

      if (password.trim().length < 8) throw '密码长度必须大于8位'

      if (!isPassword(password)) throw '密码只能包含数字字母下划线'

      if (!repeatPwd.trim()) throw '请再次输入密码'

      if (password != repeatPwd) throw '两次密码输入不一致'

    } catch (err) {
      this.props.setToastMsg(err)

      return false
    }

    this._submit()
  }

  async _submit () {

    try {
      await resetUserPass({
        ...this.state,
        ...this.props.before
      })

      this.props.setToastMsg('修改成功，请重新登录')

      this.timer = setTimeout (() => {
        this.props.navigation.navigate('Login')
      }, 1000)
    } catch (err) {
      this.props.setToastMsg(err)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    return (
      <KeyboardSpacer>
        <View style={ styles.container }>
          <Text style={ styles.title }>重置密码</Text>
          <View>
            <Text style={ styles.inputTitle }>新密码</Text>
            <View style={ styles.textInputBox }>
              <AppropriateInput 
                style={ styles.textInput }
                placeholder={ '请输入新密码' }
                onChangeText={ val => this.changeText('password', val) }
                returnKeyType="next"
                maxLength={ 18 }
                secureTextEntry={ true }
                placeholderTextColor="#4A4A4A"
              />
            </View>
          </View>
          <View style={ styles.formContainer }>
            <Text style={ styles.inputTitle }>确认密码</Text>
            <View style={ styles.textInputBox }>
              <AppropriateInput 
                style={ styles.textInput }
                placeholder={ '请再次输入密码' }
                onChangeText={ val => this.changeText('repeatPwd', val) }
                returnKeyType="send"
                maxLength={ 18 }
                secureTextEntry={ true }
                placeholderTextColor="#4A4A4A"
              />
            </View>
          </View>
          <GradientButton 
            style={ styles.button }
            title="完成"
            triggerClick={ () => this.validation() }
          />
        </View>
      </KeyboardSpacer>
    )
  }
}

export default connect(state => ({ 
  before: state.resetPwd
}), dispatch => ({
  setToastMsg: text => dispatch(setToastMsg(text))
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
  }
})