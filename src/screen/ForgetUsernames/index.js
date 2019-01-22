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

import { setTradePwd,setToastMsg } from 'actions/index'

import { checkExistsPhone } from 'api/index'

class ForgetUsernames extends Component{
   constructor (props) {
    super(props)
    this.state = {
      phone: ''
    }
  }
  changeInput (type, val) {
    this.setState({[type]: val})
  }
  validation () {
    const phone= this.state.phone

    try {

      if (!phone.trim()) throw '请输入正确手机号'

      if (phone.trim().length > 12) throw '手机号长度必须等于11位'

    } catch (err) {
      this.props.setToastMsg(err)

      return false
    }

    this._submit ()
  }

  async _submit () {

    try {

      await checkExistsPhone(this.state.phone)

      this.props.navigation.navigate('RetrieveName', { phone: this.state.phone })

    } catch (err) {
      this.props.setTradePwd({ ...this.state.phone })
      this.props.setToastMsg(err)
      return false
    }
  }

  render () {
    return (
     <SafeAreaView style={ styles.container }>
        <KeyboardSpacer>
          <View style={ styles.constout }>
            <Text style={ styles.fonts }>请输入手机号码</Text>
          </View>
          <View style={ styles.textInputBox }>
            <AppropriateInput
              style={ styles.textInput }
              placeholder={ '请输入用户名绑定的手机号' }
              onChangeText={ val => this.changeInput('phone', val) }
              keyboardType="numeric"
              returnKeyType="next"
              maxLength={ 11 }
              placeholderTextColor="#4A4A4A"
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
export default connect(state => ({ ...state.userInfo }), dispatch => ({
  setTradePwd: data => dispatch(setTradePwd(data)),
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(ForgetUsernames)
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
