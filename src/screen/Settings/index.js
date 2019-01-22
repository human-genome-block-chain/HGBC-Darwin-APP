import React, { Component } from 'react'
import {
  View,
  Text,
  Alert,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'

import { JumpList } from 'components/index'
import { removeStorage } from 'storage/index'
import { logout, setUserInfo } from 'actions/index'
import { getSettings } from 'api/index'

class Settings extends Component {
  constructor () {
    super()

    this.state = {
      login_name: '',
      phone: '',
      uid: ''
    }
  }

  componentDidMount () {
    this._getSettings()
  }

  logoutFn () {
    Alert.alert(
      '退出登录',
      '确认退出登录吗？',
      [
        {text: '确定', onPress: () => this._logout()},
        {text: '取消', style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  async _logout () {
    try {
      await removeStorage('token')

      this.props.setUserInfo({ phone: '',token: '',uid: '' })
      this.props.logout()
    } catch (e) {}
  }

  async _getSettings () {
    try {
      const result = await getSettings()

      this.setState({ ...result.data })
    } catch (e) {}
  }

  render () {
    const { navigation, isSetTradePass, isBandWallet } = this.props

    return (
      <View style={ styles.container }>
        <View style={ styles.jumpListBox }>
          <JumpList
            style={ styles.content }
            title="当前帐号"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ this.state.login_name }</Text>
          </JumpList>
          <JumpList
            style={ styles.content }
            title="绑定手机"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ this.state.phone }</Text>
          </JumpList>
          <JumpList
            title="交易密码"
            triggerClick={ () => navigation.navigate(isSetTradePass ? 'ToReset' : 'Trading', { back: 'Settings' }) }
            rightText={ isSetTradePass ? '已设置' : '未设置' }
          />
          <JumpList
            title="链克口袋地址"
            triggerClick={ () => navigation.navigate('WalletAddres', { callback: () => {}, isGoBack: false }) }
            // rightText={ isBandWallet ? '' : '无' }
          />
          <JumpList
            style={ styles.content }
            title="星球数字身份ID"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ this.state.uid }</Text>
          </JumpList>
          <JumpList
            style={ styles.content }
            title="版本"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>1.4.2</Text>
          </JumpList>

        </View>
        <View style={ styles.jumpListBox }>
          <JumpList
            title="退出登录"
            isArrow={ false }
            triggerClick={ () => this.logoutFn() }
          />
        </View>
      </View>
    )
  }
}

export default connect(state => ({
  isBandWallet: state.userInfo.is_bandWallet > 0,
  isSetTradePass: state.userInfo.is_setTradePass > 0
}), dispatch => ({
  logout: () => dispatch(logout()),
  setUserInfo: data => dispatch(setUserInfo(data))
}))(Settings)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC'
  },
  content: {
    flexDirection: 'row'
  },
  jumpListBox: {
    backgroundColor: '#fff',
    paddingLeft: 25,
    marginTop: 10
  },
  rightText: {
    flex: 1,
    lineHeight: 44,
    textAlign: 'right',
    paddingRight: 25
  }
})
