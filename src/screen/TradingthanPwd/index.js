import React, { Component } from 'react'

import {
  View,
  StyleSheet,
  SafeAreaView,
  Text
} from 'react-native'
import { connect } from 'react-redux'

import {
  AppropriateInput,
  GradientButton,
  KeyboardSpacer
} from 'components/index'

import { forgetTradePass } from 'api/index'

import { setToastMsg } from 'actions/index'

class TradingthanPwd extends Component {
    constructor (props) {
    super(props)
    
    this.state = {
      tradePass: ''
    }

    this.goBackPath = props.navigation.getParam('back', 'Mine')
  }
  

  changeInput (type, val) {
    this.setState({[type]: val})
  }

  validation () {
    const { password, setToastMsg } = this.props
    const tradePass = this.state.tradePass

    try {

      if (!tradePass.trim()) throw '请再次输入密码'

      if (password != tradePass) throw '两次密码输入不一致'

    } catch (err) {
      setToastMsg(err)

      return false
    }

    this._submit()
  }


  async _submit () {
    const { navigation, setToastMsg, code } = this.props
    
    try {
      const rulse = await forgetTradePass({
        ...this.state,
        code
      })
      
      this.props.setToastMsg('修改成功')
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
            <Text style={ styles.fonts }>确认你的交易密码（3/3）</Text>
            <Text style={ styles.fontsd }>密码至少包括8位字符，建议同时包括字母和数字</Text>
          </View>
          <View style={ styles.textInputBox }>
            <AppropriateInput
                style={ styles.textInput }
                placeholder={ '输入密码' }
                secureTextEntry={ true }
                maxLength={ 18 }
                returnKeyType="send"
                onChangeText={ val => this.changeInput('tradePass', val) }
                triggerSubmit={ this.validation.bind(this) }
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

export default connect(state => ({ ...state.tradePwd }), dispatch => ({
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(TradingthanPwd)

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
    fontSize: 26,
    fontWeight: '600',
  },
  fontsd:{
    fontSize: 14,
    marginTop: 15,
    color:'#82858E'
  }
})