import React, { Component } from 'react'
import {
  StyleSheet,
  StatusBar,
  BackHandler,
  AppState
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { BackgroundPicture } from 'components/index'
import platformDiff from 'util/platformDiff'
import { HomeImg } from 'images/index'
import { setUserInfo } from 'actions/index'

import Dig from './Dig/index'
import Task from './Task/index'

import { setHomeData, setTasks, setToastMsg, goBack } from 'actions/index'

import { getTaskListState, getTokenAndPower, accountData } from 'api/index'

class Home extends Component {
  constructor (props) {
    super(props)
    this.isAndroid = platformDiff.isAndroid
    this.timer = null

    this._onAppState = this._onAppState.bind(this)
  }

  componentDidMount () {
    this.timer = setTimeout(() => SplashScreen.hide(), 2000)
    this._accountData()
    this._integration()
    
    BackHandler.addEventListener("hardwareBackPress", this._onBackPress)
    AppState.addEventListener('change', this._onAppState)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
    AppState.removeEventListener('change', this._onAppState)
    BackHandler.removeEventListener("hardwareBackPress", this._onBackPress)
  }

  _onAppState (appState) {
    if (appState === 'active') this._integration()
  }

  _onBackPress = () => {
    const { nav, setToastMsg, goBack } = this.props

    if (nav.index === 0) {
      let now = new Date().getTime()

      if(now - this.lastTime < 3000) return false

      this.lastTime = now
      setToastMsg('再点击一次退出应用')
      return true
    }

    goBack()

    return true
  }

  async _accountData () {
    try {
      const result = await accountData()

      this.props.setUserInfo(result.data)
    } catch (e) {}
  }

  async _integration () {
    try {
      const [taskListState, tokenAndPower] = await Promise.all([
        this._getTaskListState(),
        this._getTokenAndPower()
      ])

      this.props.setTasks({ ...taskListState.data })
      this.props.setHomeData({ ...tokenAndPower.data })
    } catch (e) {}
  }

  async _getTaskListState () {
    const retult = await getTaskListState()

    return retult
  }

  async _getTokenAndPower () {
    const retult = await getTokenAndPower()

    return retult
  }

  shouldComponentUpdate (nextProps,nextState) {
    if (nextProps.nav.index > 0) return false

    return true
  }

  componentDidUpdate () {
    
    const routerName = this.props.nav.routerName

    let routerArr = ['Mine', 'Assets', 'Feedback', 'JoinUs', 'Know', 'Settings', 'Message', 'Scanning', 'Incentive', 'Trading', 'TradingThan', 'VerificaCode', 'ToReset', 'ForgetPwd', 'TradingPwd', 'TradingthanPwd', 'Withdrawal', 'WalletAddres', 'AddressThe', 'DealDetailsdls', 'TheOrderDetails']

    if (routerArr.some(item => item === routerName)) {
      StatusBar.setBarStyle('dark-content')
      this.isAndroid && StatusBar.setBackgroundColor('#fff')
      this.isAndroid && StatusBar.setTranslucent(false)
    } else {
      StatusBar.setBarStyle('light-content')
      this.isAndroid && StatusBar.setBackgroundColor('#09071F')
      this.isAndroid && StatusBar.setTranslucent(false)
    }
  }

  render () {
    return (
      <BackgroundPicture
        source={ HomeImg.Bg }
        style={ [styles.container, !this.isAndroid? styles.iphonex: null] }
      >
        <StatusBar
          backgroundColor="#09071F"
          translucent={ false }
          barStyle="light-content"
        />
        <Dig
          navigation = { this.props.navigation }
          style={ styles.topContent }
        />
        <Task
          style={ styles.bottomContent }
          navigation = { this.props.navigation }
        />
      </BackgroundPicture>
    )
  }
}

export default connect(store => ({ nav: store.nav }), dispatch => ({
  setHomeData: data => dispatch(setHomeData(data)),
  setTasks: tasks => dispatch(setTasks(tasks)),
  setToastMsg: text => dispatch(setToastMsg(text)),
  goBack: () => dispatch(goBack()),
  setUserInfo: data => dispatch(setUserInfo(data))
}))(Home)

const styles = StyleSheet.create({
  iphonex: {
    ...ifIphoneX({
      paddingTop: 44
    },{
      paddingTop: 20
    })
  },
  container: {
    flex: 1
  },
  topContent: {
    height: 380
  },
  bottomContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 24
  }
})