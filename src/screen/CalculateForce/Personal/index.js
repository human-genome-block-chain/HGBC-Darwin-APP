import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class Personal extends Component{
  render () {
    const { power, powerAll, myKing } = this.props

    return (
      <View style={ styles.container }>
        <View style={ styles.value }>
          <Text style={ [styles.blueColor, styles.bigText] }>{ power }</Text>
          <Text style={ styles.grayColor }>个人算力</Text>
        </View>
        <View style={ styles.global }>
          <View style={ styles.column }>
            <Text style={ styles.blueColor }>{ powerAll }</Text>
            <Text style={ styles.grayColor }>全网算力</Text>
          </View>
          <View style={ styles.line }></View>
          <View style={ styles.column }>
            <Text style={ styles.blueColor }>{ myKing.index }</Text>
            <Text style={ styles.grayColor }>我的算力排名</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingLeft: 37,
    paddingRight: 37
  },
  value: {
    height: 111,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: .3,
    borderBottomColor: '#EEF0F5'
  },
  blueColor: {
    color: '#40B1FF',
    fontSize: 20,
    lineHeight: 28
  },
  bigText: {
    fontSize: 40,
    lineHeight: 56
  },
  grayColor: {
    color: '#5D6063',
    fontSize: 13
  },
  global: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  column: {
    flex: 1,
    alignItems: 'center'
  },
  line: {
    width: 1,
    height: 30,
    backgroundColor: '#EEF0F5'
  }
})