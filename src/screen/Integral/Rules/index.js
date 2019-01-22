import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class Rules extends Component {
  render () {
    return (
      <View style={ styles.container }>
        <Text style={ styles.instructions }>碱基（HGBC通证）规则</Text>
        <Text style={ styles.content }>1、碱基是一种基于迅雷链发行的区块链数字资产，也是一种权益证明</Text>
        <Text style={ styles.content }>2、碱基是达尔文星球生态内价值交换的唯一媒介，可用于兑换商品、应用与服务</Text>
        <Text style={ styles.content }>3、全网每24h挖矿奖励1013698个碱基，逐年衰减30%</Text>
        <Text style={ styles.content }>4、超过72小时不领取挖矿奖励，算力会被冻结，挖矿停止，重新领取挖矿奖励后，算力恢复</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 29,
    paddingRight: 23,
    marginTop: 32
  },
  instructions: {
    fontSize: 20,
    color: '#333',
    marginBottom: 18
  },
  content: {
    fontSize: 14,
    color: '#505860',
    lineHeight: 24,
    marginTop: 17
  }
})