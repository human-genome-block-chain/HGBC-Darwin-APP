import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Linking
} from 'react-native'

import { TextButton } from 'components/index'

export default class TimeDetail extends Component {
  linking () {
    Linking.openURL('https://item.jd.com/27693892128.html')
  }

  render () {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>HGBC以打造个人基因组数据运营商为愿景，为了生态的良好发展，用户加入达尔文星球开始，每3个月为一个挖矿周期，用户一个周期内无基因数据贡献记录，所挖矿获得碱基将被销毁，算力保留。4个挖矿周期（1年）后未仍无基因数据贡献记录，算力清零。</Text>
        <TextButton
          textStyle={ styles.conbter }
          location="center"
          triggerClick={ () => this.linking() }
        >
          赏口唾液，测个基因，探索自己，贡献生态
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  text: {
    fontSize: 16,
    color: '#010505'
  },
  conbter:{
    fontSize: 16,
    color:'#40B1FF',
    marginTop: 30
  }
})