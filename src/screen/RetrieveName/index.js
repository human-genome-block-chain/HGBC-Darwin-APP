import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Alert
} from 'react-native'
import { connect } from 'react-redux'

import {
  AppropriateInput,
  GradientButton,
  KeyboardSpacer,
  VoiceCode
} from 'components/index'

import { setUserInfo,setToastMsg } from 'actions/index'

import { getUserNameForPhone } from 'api/index'

class RetrieveName extends Component{
   constructor (props) {
    super(props)
    this.state = {
      code: ''
    }

    this.phone = props.navigation.getParam('phone')
  }

  changeInput (type, val) {
    this.setState({ [type]: val })
  }

  async validation () {
    const phone = this.phone
    const { code } = this.state

    try {

      await getUserNameForPhone({ code, phone })

      this.logoutFn()

    } catch (err) {

      this.props.setToastMsg(err)

      return false
    }

  }

  logoutFn () {
    Alert.alert(
      '确定',
      '您的用户名已发送到您的手机上，请注意查收！',
      [
        {text: 'ok', onPress: () => this.props.navigation.navigate('Login')}
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
     <SafeAreaView style={ styles.container }>
        <KeyboardSpacer>
          <View style={ styles.constout }>
            <Text style={ styles.fonts }>请输入手机号{ this.phone }收到的短信验证码</Text>
          </View>
          <View style={ styles.textInputBox }>
            <AppropriateInput
                style={ styles.textInput }
                placeholder={'请输入验证码'}
                keyboardType="numeric"
                maxLength={ 6 }
                returnKeyType="next"
                onChangeText={ val => this.changeInput('code', val) }
              />
              <View style={styles.voiceCode}>
                <VoiceCode
                  phone={ this.phone }
                  type={'verify'}
                />
              </View>
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
export default connect(state => ({ ...state.phone, ...state.userInfo }), dispatch => ({
  setUserInfo: data => dispatch(setUserInfo(data)),
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(RetrieveName)
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
  },
  voiceCode: {
    marginLeft: 12,
    height: 30
  }
})
