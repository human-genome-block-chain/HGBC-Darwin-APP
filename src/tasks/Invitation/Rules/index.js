import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class Rules extends Component {
  render () {
    return (
      this.props.type === 1 ?
      <View style={ styles.container }>
        <Text style={ styles.title }>邀请好友任务规则</Text>
        <Text style={ styles.content }>1、邀请人邀请10个好友以内，每邀请一个好友奖励邀请人1算力</Text>
        <Text style={ styles.content }>2、邀请人邀请超过10个好友，每多邀请一个好友奖励邀请人10 碱基（邀请人数不限）</Text>
        <Text style={ styles.annotations }>注：HGBC 团队拥有对本推广规则的解释权。如果有虚假邀请行为，一经发现，账户冻结。</Text>
      </View>:
      <View style={ styles.container }>
        <Text style={ styles.title }>高级推广任务规则</Text>
        <Text style={ styles.content }>1、邀请人邀请的好友绑定了全基因组数据，奖励10算力</Text>
        <Text style={ styles.content }>2、邀请人邀请的好友绑定了全外显子组数据，奖励3算力</Text>
        <Text style={ styles.content }>3、高级推广最多邀请300名好友</Text>
        <Text style={ styles.annotations }>注：HGBC 团队拥有对本推广规则的解释权。如果有虚假邀请行为，一经发现，账户冻结。</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    // marginTop: 10,
    marginBottom: 120
  },
  title: {
    fontSize: 20,
    color: '#323232',
    marginTop: 23,
    fontWeight: '600'
  },
  content: {
    fontSize: 12,
    color: '#4A4A4A',
    marginTop: 14,
    lineHeight: 20
  },
  annotations: {
    fontSize: 12,
    color: '#9B9B9B',
    marginTop: 14
  }
})