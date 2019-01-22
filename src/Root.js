import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { View,NativeModules,Alert } from 'react-native'
import { reduxifyNavigator } from 'react-navigation-redux-helpers'
import Orientation from 'react-native-orientation'
import 'react-native-program-stylesheet'
import { setToastMsg } from 'actions/index'
import { GToast, Loading, Update } from 'components/index'

import store from 'store/index'

import RootNavigator from 'router/index'
import *as wechat from 'react-native-wechat'

const Navigation = reduxifyNavigator(RootNavigator, 'root')

const mapStateToProps = (state) => ({
  state: state.nav
})

const AppNavigator = connect(mapStateToProps)(Navigation)

global.store = store

export default class Root extends Component {
  componentDidMount() {
    wechat.registerApp('wx6fea43e963ad81f0')
    Orientation.lockToPortrait()
  }

  render () {
    return (
      <Provider store={ store } >
        <View style={ { flex: 1 } }>
          <AppNavigator />
          <Loading />
          <GToast />
          <Update />
        </View>
      </Provider>
    )
  }
}
