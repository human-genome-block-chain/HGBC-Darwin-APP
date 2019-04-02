import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Linking
} from 'react-native'

import { TextButton } from 'components/index'

export default class Rules extends Component {
  linking () {
    Linking.openURL('https://item.jd.com/27693892128.html')
  }

  render () {
    return (
      <View style={ styles.container }>
        <Text style={ styles.instructions }>碱基（HGBC通证）规则</Text>
        <Text style={ styles.content }>1、碱基是一种基于迅雷链发行的区块链数字资产，也是一种权益证明</Text>
        <Text style={ styles.content }>2、碱基是达尔文星球生态内价值交换的唯一媒介，可用于兑换商品、应用与服务</Text>
        <Text style={ styles.content }>3、首年每24h挖矿奖励1013698个碱基，逐年衰减30%，用户每天挖矿获得碱基=每天碱基释放量/平台总算力*用户算力</Text>
        <Text style={ styles.content }>4、超过72小时不领取挖矿奖励，算力会被冻结，挖矿停止，重新领取挖矿奖励后，算力恢复</Text>
        <Text style={ styles.content }>5、用户加入达尔文星球开始，每3个月为一个挖矿周期，用户一个周期内无基因数据贡献记录，所挖矿获得碱基销毁，4个挖矿周期（1年）后未仍无基因数据贡献记录，算力清零</Text>

        <TextButton
          textStyle={ styles.conbter }
          location="center"
          triggerClick={ () => this.linking() }
        >
          没有？赏口唾液...
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 29,
    paddingRight: 23,
    marginTop: 32,
    paddingBottom: 20
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
  },
  conbter:{
    fontSize: 16,
    color:'#40B1FF',
    marginTop: 10
  }
})