import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { 
  AppropriateInput,
  GradientButton,
  TextButton,
  Statement,
  TopBanner,
  KeyboardSpacer
} from 'components/index'

import { isUsername, isPassword } from 'util/validation'

import { setToastMsg } from 'actions/index'

import { checkUserName } from 'api/index'

class Registered extends Component {
  constructor () {
    super()
    
    this.state = {
      username: '',
      password: '',
      repeatPwd: ''
    }
  }

  changeInput (type, val) {
    this.setState({[type]: val})
  }

  validation () {
    const { username, password, repeatPwd } = this.state

    try {
      if (!username.trim()) throw '请输入用户名'

      if (!isUsername(username)) throw '用户名只能包含数字和字母'

      if (!password.trim()) throw '请输入密码'

      if (password.trim().length < 8) throw '密码长度必须大于8位'

      if (!isPassword(password)) throw '密码只能包含数字字母下划线'

      if (!repeatPwd.trim()) throw '请再次输入密码'

      if (password != repeatPwd) throw '两次密码输入不一致'

    } catch (err) {
      this.props.setToastMsg(err)

      return false
    }

    this._next()
  }

  async _next () {
    try {
      await checkUserName(this.state.username)
    } catch (err) {
      this.props.setToastMsg(err)

      return false
    }

    this.props.navigation.navigate('Verification', { prove: this.state })
  }

  render () {
    const { navigation } = this.props

    return (
      <View style={ styles.content }>
        <KeyboardSpacer>
          <TopBanner>
            <Text style={ styles.plate }>注册</Text>
            <Text style={ styles.title }>首次注册，+18个碱基</Text>
            <Text style={ styles.text }>邀请好友越多，获得的碱基奖励越多</Text>
          </TopBanner>
          <View style={ styles.container }>
            <View style={ styles.textInputBox}>
              <AppropriateInput
                style={ styles.textInput }
                placeholder={ '请输入用户名（包括字母和数字）' }
                maxLength={ 30 }
                onChangeText={ val => this.changeInput('username', val) }
              />
            </View>
            <View style={ styles.textInputBox}>
              <AppropriateInput
                style={ styles.textInput }
                placeholder={ '请输入8~18位密码' }
                secureTextEntry={ true }
                maxLength={ 18 }
                onChangeText={ val => this.changeInput('password', val) }
              />
            </View>
            <View style={ styles.textInputBox }>
              <AppropriateInput
                style={styles.textInput}
                placeholder={ '请再次确认密码' }
                secureTextEntry={ true }
                maxLength={ 18 }
                onChangeText={ val => this.changeInput('repeatPwd', val) }
                returnKeyType="send"
                triggerSubmit={ this.validation.bind(this) }
              />
            </View>
            <GradientButton
              style={ styles.next }
              title="下一步"
              triggerClick={ this.validation.bind(this) }
            ></GradientButton>
            <TextButton
              location="center"
              textStyle={ styles.loginColor }
              triggerClick={ () => navigation.navigate('Login') }
            >已有帐号去登录</TextButton>
          </View>
        </KeyboardSpacer>
        <View style={ styles.agreementBox }>
          <Statement
            triggerClick={ () => navigation.navigate('UserAgreement')}
            agreementStyles={ styles.agreementText }
          >
            注册/登录代表同意<Text style={ styles.link }>《用户协议》</Text>
          </Statement>
          <Statement
            triggerClick={ () => navigation.navigate('PrivacyAgreement')}
            agreementStyles={ styles.agreementText }
          >
            和<Text style={ styles.link }>《隐私协议》</Text>
          </Statement>
        </View>
      </View>
    )
  }
}

export default connect(null, dispatch => ({
  setToastMsg: text => dispatch(setToastMsg(text))
}))(Registered)

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingLeft: 31,
    paddingRight: 30,
    backgroundColor: '#fff'
  },
  textInputBox: {
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: .5,
    borderBottomColor:'#DADBDC',
    alignItems: 'flex-end'
  },
  textInput: {
    flex:1
  },
  next: {
    marginTop: 36,
    marginBottom: 30,
    height: 66
  },
  agreementBox: {
    // position: 'absolute',
    // bottom: 32,
    // left: 0,
    // right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  agreementText: {
    color: '#8D8C8C'
  },
  loginColor: {
    color: '#525252',
    fontSize: 17
  },
  plate: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 28
  },
  title: {
    fontSize: 22,
    color:'#fff',
    marginBottom: 9,
    fontWeight: '600'
  },
  text: {
    fontSize: 15,
    color:'#fff'
  },
  link: {
    color: '#40B1FF'
  }
})