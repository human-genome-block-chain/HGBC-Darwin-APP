import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  BackHandler
} from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { NavigationActions } from 'react-navigation'

import {
  AppropriateInput,
  BackgroundPicture,
  GradientButton,
  TextButton,
  KeyboardSpacer
} from 'components/index'

import PopUp from './PopUp/index'

import platformDiff from 'util/platformDiff'

import { toMain, setUserInfo, setToastMsg } from 'actions/index'
import { login } from 'api/index'

import { setStorage } from 'storage/index'

class Login extends Component {
  constructor (props) {
    super(props)

    this.isAndroid = platformDiff.isAndroid
    this.state = {
      username: '',
      password: '',
      visible: false
    }

    this.lastTime = 0
    this.timer = null
  }

  componentDidMount() {
    this.timer = setTimeout(() => SplashScreen.hide(), 2000)
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
    BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid)
  }

  close () {
    this.setState({ visible: false })
  }

  open () {
    this.setState({ visible: true})
  }

  changeInput (type, val) {
    this.setState({ [type]: val })
  }

  _onBackAndroid=()=>{
    const { dispatch, nav, setToastMsg, back } = this.props

    if (nav.index === 0) {
      let now = new Date().getTime()

      if(now - this.lastTime < 3000) {
        return false
      }

      this.lastTime = now
      setToastMsg('再点击一次退出应用')
      return true
    }

    back()

    return true
  }

  validation () {
    const { username, password } = this.state

    try {
      if (!username.trim()) throw '请输入用户名'

      if (!password.trim()) throw '请输入密码'

      if (password.trim().length < 8) throw '密码长度不正确'

    } catch (err) {
      this.props.setToastMsg(err)
      return false
    }

    this._submitFunc()
  }

  async _submitFunc () {

    try {
      const result = await login(this.state)
      this.props.setUserInfo(result.data)

      setStorage('token', result.data.token)
      .then(() => {
        this.props.toMain()
      })
    } catch (e) {}
  }

  render () {
    const { navigation } = this.props

    return (
      <KeyboardSpacer>
        <BackgroundPicture style={ styles.backgroundBox }>
            <StatusBar
              backgroundColor="rgba(0,0,0,0)"
              translucent={true}
              barStyle="light-content"
            />
            <SafeAreaView style={ styles.container }>
              <View style={ styles.content }>
                <View style={ styles.loginBox }>
                  <Text style={ styles.title }>
                    登陆星球
                  </Text>
                  <View style={ styles.textInputBox}>
                    <AppropriateInput
                      style={ styles.textInput }
                      placeholder={ '用户名' }
                      onChangeText={ val => this.changeInput('username', val) }
                      returnKeyType="next"
                      maxLength={ 30 }
                    />
                  </View>
                  <View style={ styles.textInputBox}>
                    <AppropriateInput
                      style={ styles.textInput }
                      placeholder={ '密码' }
                      secureTextEntry={ true }
                      onChangeText={ val => this.changeInput('password', val) }
                      returnKeyType="send"
                      maxLength={ 18 }
                      triggerSubmit={ this.validation.bind(this) }
                    />
                  </View>
                  <TextButton
                    style={ styles.forgotPasswordBox }
                    textStyle={ styles.forgotPasswordText }
                    location="right"
                    triggerClick={ () => this.open() }
                  >
                    忘记用户名或密码？
                  </TextButton>
                  <GradientButton
                    title="进入星球"
                    triggerClick={ this.validation.bind(this) }
                  />
                </View>
                <View style={ styles.registeredBox }>
                  <TextButton
                    style={ styles.textButtonBox }
                    textStyle={ styles.textButton }
                    location="center"
                    triggerClick={ () => navigation.navigate('Registered') }
                  >
                    立即注册
                  </TextButton>
                </View>
              </View>
              <PopUp
                visible={ this.state.visible }
                close={ () => this.close() }
                navigation={ navigation }
              />
            </SafeAreaView>
        </BackgroundPicture>
      </KeyboardSpacer>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  toMain: () => dispatch(toMain()),
  setUserInfo: data => dispatch(setUserInfo(data)),
  setToastMsg: text => dispatch(setToastMsg(text)),
  back: () => dispatch(NavigationActions.back())
})

export default connect(store => ({ nav: store.nav }), mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  backgroundBox: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    height: 414
  },
  poshd:{
    flex: 1
  },
  podhdYudn: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.2)',
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonBut :{
    flex: 1
  },
  buttonButText: {
    fontSize: 20
  },
  loginBox: {
    width: 320,
    height: 340,
    borderRadius: 18,
    paddingTop: 35,
    paddingLeft: 30,
    paddingRight: 39,
    backgroundColor: '#fff'
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: '#333'
  },
  textInputBox: {
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: .5,
    borderBottomColor:'#DADBDC',
    alignItems: 'flex-end'
  },
  textInput: {
    flex:1,
  },
  button: {
    height: 44,
    marginTop: 40,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF'
  },
  forgotPasswordBox: {
    marginTop: 18,
    marginBottom: 22
  },
  forgotPasswordText: {
    color: '#667AF5'
  },
  registeredBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 42
  },
  doubt: {
    fontSize: 14,
    color: '#fff'
  },
  textButtonBox: {
    flex: 1,
    height: 32
  },
  textButton: {
    fontSize: 17,
    color: '#40B1FF',
    fontWeight: '600',
    textAlign: 'center',
    padding: 6
  }
})
