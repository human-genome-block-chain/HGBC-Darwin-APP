import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'

import { AndroidWhiteBar } from 'components/index'
import { MineImg } from 'images/index'

export default class JoinUs extends Component {
  render () {
    return (
      <ScrollView 
        style={ styles.container }
        showsVerticalScrollIndicator={ false }  
      >
        <AndroidWhiteBar />
        <View style={ styles.packaging }>
          <Text style={ styles.title }>微信群加入方式</Text>
          <Text style={ styles.secretary }>添加HGBC基因小秘书微信（微信号：hgbc001）</Text>
          <View style={ styles.imageBox }>
            <Image
              style={ styles.image }
              source={ MineImg.QRCode }
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={ styles.packaging }>
          <Text style={ styles.title }>电报群加入方式</Text>
          <Text style={ styles.introduce }>通过下面电报群链接入群</Text>
          <Text style={ styles.link }>https://t.me/hgbc_cn</Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFC',
    paddingLeft: 20,
    paddingRight: 20
  },
  packaging: {
    borderRadius: 16,
    backgroundColor: '#fff',
    marginTop: 21,
    padding: 30
  },
  title: {
    fontSize: 22,
    color: '#323232'
  },
  secretary: {
    color: '#40B1FF',
    fontSize: 15,
    marginTop: 10
  },
  introduce: {
    color: '#4A4A4A',
    fontSize: 13,
    marginTop: 17,
    marginBottom: 6
  },
  link: {
    color: '#40B1FF',
    fontSize: 13,
  },
  imageBox: {
    alignItems: 'center',
    marginTop: 28
  },
  image: {
    width: 150,
    height: 150
  }
})