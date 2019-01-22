import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class Rules extends Component{
  render () {
    return (
      <View style={ styles.container }>
        <Text style={ styles.rules }>提现规则</Text>
        <Text style={ styles.text }>1. 账户内至少预留3000碱基用于数据应用兑换</Text>
        <Text style={ styles.text }>2. 单次最小提现量为500碱基</Text>
        <Text style={ styles.text }>3. 单日累计最大提现量为3000碱基</Text>
        <Text style={ styles.text }>4. 单次提现统一收取10碱基最为手续费</Text>
        <Text style={ styles.text }>5. 提现规则的最终解释权归HGBC治理委员会所有</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container :{
    paddingTop: 22
  },
  rules :{
    fontSize: 14,
    color:'#555',
    paddingTop: 22,
    paddingBottom: 6,
    fontWeight: '600'
  },
  text :{
    fontSize: 13,
    color:'#666',
    lineHeight: 26,
    marginTop: 8
  }
})