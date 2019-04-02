import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import {
  GradientButton,
  TextButton,
  AndroidWhiteBar,
  HeaderLeft,
  DashLine
} from 'components/index'

import Steps from './Steps/index'

import platformDiff from 'util/platformDiff'
import { TaskImg } from 'images/index'

export default class Myscene extends Component{
  render () {
    const { simpleCount, scode, navigation } = this.props

    const isWgs = simpleCount <= 0
    return (
      <SafeAreaView style={ styles.container }>
        <ScrollView 
          style={ styles.mainBox }
          showsVerticalScrollIndicator={ false }
        >
          <View style={ styles.mainBox }>
              <Text
                style={ styles.hander }
                location="center" 
              >
                基因是人体的基因组成单位，基因数据蕴藏着非常大的价值，对基因数据的解读是探索自我、健康生活的必要途径。
              </Text>
              <View style={ styles.contomter}>
                  <Text style={ styles.conterde }>基因组数据获取路径</Text>
                  <View style={ styles.stepsBox }>
                    <Steps 
                      content="使用唾液采集器采集唾液"
                      steps="1"
                    />
                    <Steps 
                      content="从唾液中提取DNA"
                      steps="2"
                    />
                    <Steps 
                      content="DNA测序仪测序"
                      steps="3"
                    />
                    <Steps 
                      content="产出基因组数据"
                      steps="4"
                      isLine={ false }
                    />
                  </View>
              </View>
              <View style={ styles.graphicBox }>
                <Text style={ styles.conterde }>基因组数据应用场景</Text>
                <Text style={ styles.colorder }>遗传体质分析</Text>
                <Image
                  style={ styles.image }
                  source={ TaskImg.Tupian }
                  resizeMode="cover"
                />
                <Text style={ styles.titiles }>什么样的运动才是真正适合你的</Text>
                <Text style={styles.constatus}>不同的人的身体，拥有不同的运动表现，比如说肌肉疲劳程度、腰椎间盘保护能力、力量运动表现等，根据分析结果，能寻找到最适合自身的运动方式</Text>
                <Image
                  style={ styles.image }
                  source={ TaskImg.FourTupian}
                  resizeMode="cover"
                />
                <Text style={ styles.titiles }>为什么一直运动你还是瘦不下去</Text>
                <Text style={styles.constatus}>管住嘴、迈开腿成为了人尽皆知的减肥箴言，但依然有许多人一旦停止节食就爆肥，也有人怎么运动都瘦不下来。原因都藏在基因里。</Text>
              </View>
              <View style={ styles.graphicBox }>
                <Text style={ styles.colorder }>疾病风险</Text>
                <Text style={ styles.titiles }>人之所以脆弱</Text>
                <Text style={ styles.titiles }>是因为不知道风险是什么？</Text>
                <Text style={styles.constatus}>超过70%的疾病因遗传而来，</Text>
                <Text style={styles.constatus}>提早知道其发病风险，</Text>
                <Text style={styles.constatus}>能够在日常生活和遗传中进行规避，</Text>
                <Text style={styles.constatus}>降低风险发生的可能性，获得更幸福的人生。</Text>
                <Image
                  style={ styles.imageder }
                  source={ TaskImg.TupianTwo }
                  resizeMode="cover"
                />
              </View>
              <View style={ styles.graphicBox }>
                <Text style={ styles.colorder }>精准用药</Text>
                <Text style={ styles.titiles }>适合吃什么药、多少量</Text>
                <Text style={ styles.titiles }>你真的了解你的身体吗？</Text>
                <Image
                  style={ styles.image }
                  source={ TaskImg.ThreeTupian }
                  resizeMode="cover"
                />
                <Text style={styles.constatus}>2005年，千手观音惊艳了亿万观众，而千手观音团队成员多是因药物使用不当致使耳聋。我国每年新增3.5万先天性聋儿，3-5万迟发性和药物性耳聋患者。通过基因检测，能够得知适宜个体的药物种类和用量，避免药物副作用。</Text>
              </View>
            </View>
        </ScrollView>
          
      </SafeAreaView>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  mainBox: {
    flex: 1,
    backgroundColor: '#F5F6F7'
  },
  hander: {
    fontSize: 15,
    color:'#5D616E',
    paddingTop: 20,
    paddingLeft: 28,
    paddingRight: 28,
    paddingBottom: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    lineHeight: 28,
    marginTop: platformDiff.isAndroid ? .3 : 1
  },
  contomter: {
    paddingTop:26,
    paddingBottom: 30,
    marginTop:10,
    backgroundColor: '#fff',
    paddingLeft: 25
  },
  graphicBox: {
    backgroundColor: '#fff',
    padding: 25,
    marginTop:10
  },
  conterde: {
    fontSize: 22,
    color:'#333',
    fontWeight:'900'
  },
  stepsBox: {
    paddingLeft: 9,
    paddingTop: 28
  },
  padding_left: {
    paddingLeft: 25
  },
  text_top: {
    marginBottom: 35
  },
  circular: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#40B1FF',
    borderWidth:1,
    borderColor:'#2D2D2D',
    borderStyle:'solid',
  },
  craderl: {
    fontSize: 14,
    color:'#fff',
    fontWeight: '900',
    alignItems: 'center',
    marginLeft: 4,
  },
  textcon: {
    color:'#5D616E',
    fontSize: 16,
    marginLeft: 40,
    marginTop: -15
  },
  comunde: {
    marginTop: 10,
    backgroundColor:'#fff',
  },
  colorder: {
    color:'#40B1FF',
    fontSize: 18,
    paddingTop: 16,
    paddingBottom: 16
  },
  titiles: {
    color:'#141414',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22
  },
  constatus: {
    color:'#5D6063',
    fontSize: 14,
    lineHeight: 24,
    paddingTop: 10
  },
  navagvs: {
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    paddingTop: 25
  },
  dashine: {
    position: 'absolute',
    top:8,
    left: 34,
    right: 0,
  },
  dashines: {
    position: 'absolute',
    top:72,
    left: 34,
    right: 0
  },
  dashinesd: {
    position: 'absolute',
    top:128,
    left: 34,
    right: 0
  },
  image: {
    width: 347,
    borderRadius: 10,
    marginLeft: -14
  },
  imageder: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 120,
    height: 262
  }
})