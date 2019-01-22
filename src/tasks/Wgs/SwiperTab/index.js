import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import Swiper from 'react-native-swiper'

import { TaskImg } from 'images/index'

import { BackgroundPicture } from 'components/index'

export default class SwiperTab extends Component{

  render () {
    return (
      <Swiper
        height={100}
        loop={false}    
        dot={<View style={ styles.dot }/>}
        activeDot={<View style={ styles.activeDot }/>}
      >
        <View style={ styles.slideBox }>
          <BackgroundPicture
            style={styles.slide}
            source={TaskImg.ScanComplete} 
          >
            <Text style={ styles.slideText }>扫描完成绑定</Text>
          </BackgroundPicture>
        </View>
        <View style={ styles.slideBox }>
        <BackgroundPicture
          style={styles.slide}
          source={TaskImg.SalivaCollection} 
        >
          <Text style={ styles.slideText }>唾液采集器收集唾液</Text>
        </BackgroundPicture>
        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#D6D6D6',
    marginLeft: 3,
    marginRight: 3
  },
  activeDot: {
    width: 34,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#31A4F4'
  },
  slideBox: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  slide: {
    width: 337,
    height: 353
  },
  slideText :{
    color:'#FFF',
    fontSize: 20,
    marginLeft: 34,
    marginTop: 34
  }
})