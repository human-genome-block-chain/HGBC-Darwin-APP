import React, { Component } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { AppropriateInput, GradientButton, KeyboardSpacer } from 'components/index'
import { setToastMsg } from 'actions/index'
import { sendFeedback } from 'api/index' 

class Feedback extends Component {
  constructor () {
    super()

    this.state = {
      isDisabled: true,
      num: 0,
      advise: ''
    }

    this.timer = null
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  async sendFeedback () {
    try {
      await sendFeedback(this.state.advise)

      this.props.setToastMsg('反馈成功')
      
      this.timer = setTimeout (() => {
        this.props.navigation.goBack()
      }, 1000)
    } catch (e) {}
  }

  changeText (val) {
    this.setState({
      isDisabled: !val.trim(),
      num: val.trim().length,
      advise: val
    })
  }

  render () {
    return (
      
        <View style={ styles.container }>
          <KeyboardSpacer>
          <Text style={ styles.title }>请写下您的问题</Text>
          <View style={ styles.textInputBox }>
            <AppropriateInput
              style={ styles.textInput }
              multiline={ true }
              placeholder={ '请输入文字' }
              onChangeText={ val => this.changeText(val) }
              returnKeyType="go"
              maxLength={ 150 }
            />
            <Text style={ styles.remaining }>{ this.state.num }/150</Text>
          </View>
          <View style={ styles.buttonBox }>
            {
              this.state.isDisabled ?
              <View style={ styles.disabledButton }>
                <Text style={ styles.disableText }>提交</Text>
              </View>:
              <GradientButton
                style={ styles.button }
                title="提交"
                textStyle={ styles.text }
                triggerClick={ () => this.sendFeedback() }
              />
            }
          </View>
          </KeyboardSpacer>
        </View>
      
    )
  }
}

export default connect(null, dispatch => ({
  setToastMsg: text => dispatch(setToastMsg(text))
}))(Feedback)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC'
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    marginLeft: 30,
    marginBottom: 13,
    marginTop: 35
  },
  textInputBox: {
    height: 292,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    padding: 30,
    position: 'relative'
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff'
  },
  remaining: {
    color: '#4A4A4A',
    fontSize: 13,
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  buttonBox: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 41,
  },
  button: {
    width: 316,
    height: 66,
    justifyContent: 'center',
  },
  disabledButton: {
    width: 300,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#C0C0C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6
  },
  disableText: {
    color: '#fff',
    fontSize: 15
  }
})