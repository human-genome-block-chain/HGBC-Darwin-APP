import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import IMEI from 'react-native-imei'

import { getStorage } from 'storage/index'
import platformDiff from 'util/platformDiff'
import { setUserInfo, setUpdataStatus, toLogin, toMain } from 'actions/index'

import { update } from 'api/index'

class AuthLoading extends Component{

  componentWillMount () {
    this._isLogin()
  }

  async _checkUpdate () {
    try {
      const result = await update({
        version: this.props.version,
        deviceType: platformDiff.isAndroid ? 1 : 2
      })

      const data = result.data

      this.props.setUpdataStatus({
        newState: data.state,
        newInformation: data.information,
        newVersion: data.version,
        newVersionName: data.version_name,
        newUrl: data.url
      })
    } catch (e) {}
  }

  async _isLogin () {
    const { navigation, setUserInfo } = this.props
    let imei = ''

    try {
      imei = platformDiff.isAndroid ? IMEI.getImei() || 'android' : 'ios'
    } catch (error) {
      imei = 'android'
    }

    try {
      const token = await getStorage('token')

      setUserInfo({ imei, token })

      this._checkUpdate()
      this.props.toMain()

    } catch (e) {
      setUserInfo({ imei })

      this._checkUpdate()
      this.props.toLogin()
    }
  }

  render = () => null
}

const mapDispatchToProps = dispatch => ({
  setUserInfo: data => dispatch(setUserInfo(data)),
  setUpdataStatus: data => dispatch(setUpdataStatus(data)),
  toMain: () => dispatch(toMain()),
  toLogin: () => dispatch(toLogin())
})

export default connect(store => ({
  ...store.userInfo
}), mapDispatchToProps)(AuthLoading)
