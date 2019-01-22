import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { AndroidWhiteBar, GradientButton, AppropriateInput, KeyboardSpacer } from 'components/index'

import { setTasks, setPower, setToastMsg } from 'actions/index'

import { isInvitationCode } from 'util/validation'

import { CommonImg, TaskImg } from 'images/index'

import { bindingInvitation } from 'api/index'

class Activate extends Component {
  constructor () {
    super()

    this.state = {
      investCode: ''
    }
  }

  changeInvestCode (investCode) {
    this.setState({ investCode })
  }

  validation () {
    const investCode = this.state.investCode
    try {
      if (!investCode.trim()) throw '请输入邀请码'

      if (!isInvitationCode(investCode)) throw '邀请码不正确'

    } catch (err) {
      this.props.setToastMsg(err)
      return false
    }

    this._send()
  }

  async _send () {
    try {
      await bindingInvitation(this.state.investCode)

      this.props.setPower(2)
      this.props.setTasks({ boundInvitationCode: { is_finish: 0 } })
    } catch (e) {}
  }

  render() {
    return (
      <KeyboardSpacer>
        <View style={ styles.container }>
          <AndroidWhiteBar />
          {
            this.props.is_finish > 0 ?
            <View style={ styles.fill }>
              <Text style={ styles.fillperson }>填入我的推荐人邀请码</Text>
              <View style={ styles.codebox }>
                <AppropriateInput
                  textStyle={ styles.codes }
                  placeholder={ '邀请码' }
                  maxLength={ 6 }
                  onChangeText={ val => this.changeInvestCode(val) }
                  returnKeyType="send"
                  triggerSubmit={ () => this.validation() }
                />
              </View>
              <GradientButton
                style={ styles.cancelButton }
                title="激活"
                source={ CommonImg.TeskButton }
                triggerClick={ () => this.validation() }
              />
            </View>:
            <View style={ styles.fill }>
              <Text style={ styles.codeTitle }>激活邀请码</Text>
              <Image
                source={ TaskImg.SuccessSmall }
                resizeMode="cover"
              />
              <Text style={ styles.successBind }>您已激活邀请码</Text>
            </View>
          }
          <View style={ styles.rule }>
            <Text style={ styles.coderule }>激活邀请码规则</Text>
            <Text style={ styles.one }>1、填写我的推荐人邀请码，我增加2算力，推荐人增加1算力</Text>
            <Text style={ styles.two }>2、填写自己的邀请码无效</Text>
          </View>
        </View>
      </KeyboardSpacer>
    )
  }
}

export default connect(state => ({ ...state.tasks.boundInvitationCode }), dispatch => ({
  setPower: num => dispatch(setPower(num)),
  setTasks: data => dispatch(setTasks(data)),
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(Activate)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    paddingLeft: 20,
    paddingRight: 20
  },
  fill: {
    backgroundColor: '#fff',
    marginTop: 17,
    borderRadius: 16,
    marginBottom: 25,
    alignItems: 'center',
    paddingBottom: 42
  },
  fillperson: {
    height: 25,
    fontSize: 18,
    color: '#74818B',
    lineHeight: 25,
    textAlign: 'center',
    marginTop: 35
  },
  codebox: {
    width: 160,
    marginTop: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#4F5254',
    marginBottom: 26
  },
  codes: {
    height: 68,
    fontSize: 34,
    color: '#232323',
    textAlign: 'center'
  },
  cancelButton: {
    width: 100,
    height: 46
  },
  rule: {
    width: 335,
    height: 173,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 16
  },
  coderule: {
    height: 28,
    fontSize: 20,
    fontFamily: 'PingFangSC-Medium',
    color: '#323232',
    lineHeight: 28,
    marginLeft: 31,
    marginTop: 26
  },
  one: {
    width: 275,
    height: 36,
    marginLeft: 30,
    fontSize: 13,
    marginTop: 23,
    color: '#4A4A4A'
  },
  two: {
    marginTop: 14,
    marginLeft: 30,
    fontSize: 13,
    lineHeight: 18,
    color: '#4A4A4A'
  },
  codeTitle: {
    fontSize: 20,
    color: '#191919',
    marginBottom: 24,
    marginTop: 29
  },
  successBind: {
    fontSize: 17,
    color: '#40B1FF',
    marginTop: 20,
    fontWeight: '600'
  }
})
