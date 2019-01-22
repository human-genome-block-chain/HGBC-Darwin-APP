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

import { setToastMsg, setTradePwd } from 'actions/index'

class TradingThan extends Component {
    constructor () {
    super()
    
    this.state = {
      tradePass: ''
    }
  }
  

  changeInput (type, val) {
    this.setState({[type]: val})
  }

  validation () {
    const { newPassword, setToastMsg } = this.props
    const tradePass = this.state.tradePass
    
    try {

      if (!tradePass.trim()) throw '请再次输入密码'

      if (newPassword != tradePass) throw '两次密码输入不一致'

    } catch (err) {
      setToastMsg(err)

      return false
    }

    this._next()
  }

  _next () {

    this.props.setTradePwd({tradePass: this.state.tradePass})

    this.props.navigation.navigate('VerificaCode', { prove: this.state })
  }
  

  render () {
    return (
      <SafeAreaView style={ styles.container }>
        <KeyboardSpacer>
          <View style={ styles.constout }>
            <Text style={ styles.fonts }>确认你的交易密码（2/3）</Text>
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
              title="下一步"
              triggerClick={ this.validation.bind(this) }
            ></GradientButton>
          </View>
        </KeyboardSpacer>
      </SafeAreaView>
    )
  }
}

export default connect(state => ({
  newPassword: state.tradePwd.password
}), dispatch => ({
  setTradePwd: data => dispatch(setTradePwd(data)),
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(TradingThan)

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