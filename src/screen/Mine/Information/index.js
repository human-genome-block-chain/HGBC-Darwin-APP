import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { MineImg } from 'images/index'
import { getUserInfo } from 'api/index'

import Column from './Column/index'


class Information extends Component {
  constructor () {
    super()

    this.state = {
      nickname: '',
      token_count: 0,
      user_type: 1
    }
  }

  componentDidMount () {
    this._getUserInfo()
  }

  async _getUserInfo () {
    try {
      const result = await getUserInfo()
    
      let nickname = result.data.nickname

      if (nickname.length > 10) result.data.nickname = nickname.slice(0, 10) + '...'

      this.setState({ ...result.data })
    } catch (e) {}
  }

  render () {
    return (
      <View style={ styles.container }>
        <View style={ styles.headPortraitBox }>
          <View style={ styles.photoBox }>
            <Image
              style={ styles.photo }
              source={ MineImg.DefaultPhoto }
              resizeMode="cover"
            ></Image>
          </View>
          <View style={ styles.userInfo }>
            <Text style={ styles.usernameText }>
              { this.state.nickname }
            </Text>
            <Text style={ styles.userType }>
              { this.state.user_type === 2 ? '星球居民' : '星球居民' }
            </Text>
          </View>
        </View>
        <View style={ styles.infoShowBox }>
          <Column
            text={ this.props.token.toFixed(2) }
            isDisable={ false }
            disabledSource={ MineImg.Money }
            disabledTextColor="#40B1FF"
            triggerClick={ () => this.props.navigation.navigate('Integral') }
          ></Column>
          <Column
            text="提现"
            iconStyles={ styles.longImage }
            isDisable={ true }
            disabledSource={ MineImg.WalletDisabled }
            canSource={ MineImg.Wallet }
            disabledTextColor="#AAB4BD"
            canTextColor="#333"
            triggerClick={ () => this.props.withdrawal() }
          ></Column>
          <Column
            text="充值"
            isDisable={ false }
            disabledSource={ MineImg.TopUpDisabled }
            canSource={ MineImg.TopUp }
            disabledTextColor="#AAB4BD"
            canTextColor="#333"
          ></Column>
        </View>
      </View>
    )
  }
}

export default connect(state => ({
  token: state.home.token_count
}))(Information)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 213,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 18
  },
  headPortraitBox: {
    flexDirection: 'row',
  },
  photoBox: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden'
  },
  photo: {
    width: 100,
    height: 100
  },
  userInfo: {
    marginTop: 16,
    marginLeft: 16
  },
  usernameText: {
    color: '#222',
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 8
  },
  userType: {
    color: '#333',
    fontSize: 19,
    fontWeight: '400'
  },
  infoShowBox: {
    flexDirection: 'row',
    marginTop: 38,
  },
  longImage: {
    width: 20,
  }
})