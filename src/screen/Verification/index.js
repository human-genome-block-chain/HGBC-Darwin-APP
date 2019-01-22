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
  TopBanner,
  VoiceCode,
  KeyboardSpacer,
  VerificationCode
} from 'components/index.js'

import { isPhone, isCode, isInvitationCode } from 'util/validation'

import { registered } from 'api/index'

import { toLogin, setToastMsg } from 'actions/index'

class Invitation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      code: '',
      invitation: ''
    }

    this.prove = props.navigation.getParam('prove', {})
    this.timer = null
  }

  changeInput (type, val) {
    this.setState({ [type]: val })
  }

  validation () {
    const { phone, code, invitation } = this.state

    try {
      if (!phone.trim()) throw '请输入手机号'

      if (!isPhone(phone)) throw '手机号不正确'

      if (!code.trim()) throw '请输入验证码'

      if (!isCode(code)) throw '验证码不正确'

      if (invitation && !isInvitationCode(invitation)) throw '邀请码不正确'

    } catch (err) {
      this.props.setToastMsg(err)

      return false
    }

    this._submit()
  }

  async _submit () {
    try {
      await registered({ ...this.state, ...this.prove })

      this.props.setToastMsg('注册成功，即将返回登录')

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
        <View style={ styles.content }>
          <TopBanner>
            <Text style={ styles.plate }>绑定手机号</Text>
            <Text style={ styles.title }>填写邀请码，+2算力奖励</Text>
            <Text style={ styles.text }>一个手机号只能被一个账户绑定且不能解绑</Text>
          </TopBanner>
          <View style={ styles.container }>
            <View style={ styles.textInputBox}>
              <AppropriateInput
                style={styles.textInput}
                placeholder={'请输入邀请码（选填，填写+2算力）'}
                maxLength={ 6 }
                onChangeText={ val => this.changeInput('invitation', val) }
              />
            </View>
            <View style={ styles.textInputBox}>
              <AppropriateInput
                style={styles.textInput}
                placeholder={ '请输入手机号' }
                keyboardType="numeric"
                maxLength={ 11 }
                onChangeText={ val => this.changeInput('phone', val) }
              />
            </View>
            <View style={ styles.textInputBox}>
              <AppropriateInput
                style={styles.textInput}
                placeholder={'请输入验证码'}
                keyboardType="numeric"
                maxLength={ 6 }
                returnKeyType="send"
                onChangeText={ val => this.changeInput('code', val) }
                triggerSubmit={ () => this.validation() }
              />
              <VerificationCode
                phone={ this.state.phone }
              />
            </View>
            <View style={ styles.voiceCode }>
              <Text style={ styles.voiceCodeText }>您也可以尝试</Text>
              <VoiceCode
                phone={ this.state.phone }
                type={'voice'}
              />
            </View>
            <GradientButton
              style={ styles.next }
              title="完成"
              triggerClick={ () => this.validation() }
            ></GradientButton>
          </View>
        </View>
      </KeyboardSpacer>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  toLogin: () => dispatch(toLogin()),
  setToastMsg: text => dispatch(setToastMsg(text))
})

export default connect(null, mapDispatchToProps)(Invitation)

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    paddingLeft: 31,
    paddingRight: 30,
    backgroundColor: '#fff'
  },
  textInputBox: {
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: .3,
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
  textButtonBox: {

  },
  agreement: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0
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
  voiceCode: {
    marginTop: 20,
    flexDirection: 'row',
  },
  voiceCodeText: {
    fontSize: 13,
    color: '#8D8C8C',
    textAlign: 'right'
  }
})
