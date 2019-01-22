import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'

import {
  AppropriateInput,
  GradientButton,
  KeyboardSpacer ,
  TextButton
  } from 'components/index'

import { isPassword } from 'util/validation'

import { setToastMsg } from 'actions/index'

import { resetTradePass } from 'api/index'

class ToReset extends Component {
  constructor () {
    super()
    this.state = {
      oldTradePass: '',
      newTradePass: ''
    }
    this.timer = null
  }

  changeText (type, val) {
    this.setState({ [type]: val })
  }

  validation () {
    const { oldTradePass, newTradePass } = this.state

    try {

      if (!oldTradePass.trim()) throw '请输入旧密码'

      if (!newTradePass.trim()) throw '请输入新密码'

      if (oldTradePass.trim().length < 8) throw '密码长度必须大于8位'

      if (newTradePass.trim().length < 8) throw '密码长度必须大于8位'

      if (!isPassword(oldTradePass)) throw '密码只能包含数字字母下划线'

      if (!isPassword(newTradePass)) throw '密码只能包含数字字母下划线'

      if (!newTradePass.trim()) throw '请再次输入密码'

      if (newTradePass != newTradePass) throw '两次密码输入不一致'

    } catch (err) {
      this.props.setToastMsg(err)

      return false
    }

    this._submit()
  }

  async _submit () {

    try {
      await resetTradePass(this.state)

      this.props.setToastMsg('修改成功')

      this.timer = setTimeout (() => {
        this.props.navigation.navigate('Mine')
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
        <ScrollView style={ styles.container } showsVerticalScrollIndicator={ false }>
          <Text style={ styles.title }>设置交易密码</Text>
          <Text style={ styles.titleTxte }>密码至少包括8位字符，建议同时包括字母和数字</Text>
          <View style={ styles.formContainer }>
            {/* <Text style={ styles.inputTitle }>旧密码</Text> */}
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={ styles.textInput }
                placeholder={ '请输入旧密码' }
                onChangeText={ val => this.changeText('oldTradePass', val) }
                returnKeyType="next"
                maxLength={ 18 }
                secureTextEntry={ true }
                placeholderTextColor="#4A4A4A"
              />
            </View>
          </View>
          <View style={ styles.formContainer }>
            {/* <Text style={ styles.inputTitle }>新密码</Text> */}
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={ styles.textInput }
                placeholder={ '请输入新密码' }
                onChangeText={ val => this.changeText('newTradePass', val) }
                returnKeyType="next"
                maxLength={ 18 }
                secureTextEntry={ true }
                placeholderTextColor="#4A4A4A"
              />
            </View>
          </View>
          <View style={ styles.formContainer }>
            {/* <Text style={ styles.inputTitle }>确认密码</Text> */}
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={ styles.textInput }
                placeholder={ '请再次输入密码' }
                onChangeText={ val => this.changeText('newTradePass', val) }
                returnKeyType="send"
                maxLength={ 18 }
                secureTextEntry={ true }
                placeholderTextColor="#4A4A4A"
              />
            </View>
          </View>
          <View style={ styles.buttonBox }>
            <GradientButton
              style={ styles.button }
              title="完成"
              triggerClick={ () => this.validation() }
            ></GradientButton>
          </View>
          <TextButton
            style={ styles.forgotPasswordBox }
            textStyle={ styles.forgotPasswordText }
            location="center"
            triggerClick={ () => this.props.navigation.navigate('ForgetPwd') }
          >
            忘记密码？
          </TextButton>
        </ScrollView>
      </KeyboardSpacer>
    )
  }
}

export default connect(null, dispatch => ({
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(ToReset)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 24
  },
  title: {
    fontSize: 26,
    color: '#000',
    fontWeight: '600',
    lineHeight: 45,
  },
  titleTxte: {
    marginBottom: 10,
    color:'#82858E'
  },
  formContainer: {
    // marginTop: 36
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
  buttonBox: {
    alignItems: 'center'
  },
  button: {
    height: 64,
    marginTop: 30,
    width: 300
  },
  forgotPasswordBox: {
    marginTop: 18,
    marginBottom: 22
  },
  forgotPasswordText: {
    color: '#667AF5'
  }
})
