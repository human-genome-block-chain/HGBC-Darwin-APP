import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { AppropriateInput, GradientButton, KeyboardSpacer, AndroidWhiteBar } from 'components/index'

import { setToastMsg, setResetData } from 'actions/index'

import { checkUserName } from 'api/index'

import { isUsername } from 'util/validation'

class resetPwd extends Component {
  constructor () {
    super()

    this.state = {
      username: ''
    }
  }

  changeText (username) {
    this.setState({
      username
    })
  }

  validation () {
    const { username } = this.state

    try {
      if (!username.trim()) throw '请输入用户名'

      if (!isUsername(username)) throw '用户名格式错误'

    } catch (err) {
      this.props.setToastMsg(err)

      return false
    }

    this._next()
  }

  async _next () {
     try {
      await checkUserName(this.state.username, false)
    } catch (err) {
      this.props.setResetData({ ...this.state })
      this.props.navigation.navigate('ResetPwdCode')

      return false
    }

    this.props.setToastMsg(err)
  }

  render () {
    return (
      <KeyboardSpacer>
        <AndroidWhiteBar />
        <View style={ styles.container }>
          <Text style={ styles.title }>重置密码</Text>
          <View>
            {/* <Text style={ styles.inputTitle }>请输入用户名</Text> */}
            <View style={ styles.textInputBox }>
              <AppropriateInput 
                style={ styles.textInput }
                placeholder={ '请输入用户名' }
                onChangeText={ val => this.changeText(val) }
                returnKeyType="next"
                maxLength={ 30 }
                placeholderTextColor="#4A4A4A"
              />
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