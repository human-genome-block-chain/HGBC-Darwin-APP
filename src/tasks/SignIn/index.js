import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native'

import { AndroidWhiteBar } from 'components/index'

import { TaskImg } from 'images/index'

export default class SignIn extends Component{
  render () {
    return (
      <ScrollView 
        style={ styles.container }
        showsVerticalScrollIndicator={ false }
      >
        <AndroidWhiteBar />
        <View style={ [styles.main, styles.alignConter] }>
          <Text style={ styles.SignInTitle }>每日签到</Text>
          <Image
            style={ styles.image }
            source={ TaskImg.Success }
            resizeMode="cover"
          />
          <Text style={ styles.reward }>每日签到奖励 1算力</Text>
        </View>
        <View style={ styles.main }>
          <Text style={ styles.title }>规则如下</Text>
          <Text style={ styles.rules }>1、为了感谢你对达尔文星球的支持，每日签到奖励1个算力</Text>
          <Text style={ styles.rules }>2、此任务会不定期关闭开放</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    padding: 20
  },
  main: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 31,
    paddingRight: 24,
    paddingTop: 26,
    paddingBottom: 30
  },
  alignConter: {
    alignItems: 'center'
  },
  SignInTitle: {
    fontSize: 20,
    color: '#191919'
  },
  reward: {
    fontSize: 17,
    color: '#40B1FF',
    fontWeight: '600'
  },
  image: {
    marginTop: 24,
    marginBottom: 13
  },
  title: {
    fontSize: 20,
    color: '#323232',
    fontWeight: '600'
  },
  rules: {
    fontSize: 13,
    color: '#4A4A4A',
    lineHeight: 18,
    marginTop: 17
  }
})