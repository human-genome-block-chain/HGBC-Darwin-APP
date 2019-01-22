import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import moment from 'moment'

import platformDiff from 'util/platformDiff'

export default class Addres extends Component{
  _status (status) {
    switch (status) {
      case 1:
        return {
          text: '处理中',
          color: '#666'
        }
      case 2:
        return {
          text: '已完成',
          color: '#40B1FF'
        }
      case 3:
        return {
          text: '提现失败',
          color: '#F37979'
        }
      default:
        return {
          text: '',
          color: '#666'
        }
    }
  }

  render () {
    const { id, status, amount, createtime } = this.props.data

    const { text, color } = this._status(status)

    return (
      <TouchableOpacity
        style={ [ styles.container, this.props.style ] }
        activeOpacity={ .8 }
        onPress={ (e) => this.props.navigation.navigate('DealDetailsdls', { data: this.props.data }) }
      >
        <View style={ styles.disi }>
          <Text style={ styles.title }>单号：{ id }</Text>
          <Text style={ [styles.titlelk, { color: color }] }>{ text }</Text>
        </View>
        <View style={ styles.line }/>
        <Text style={ styles.addres }>下单时间：{ moment(createtime).format("YYYY-MM-DD HH:mm:ss") }</Text>
        <Text style={ [styles.addres, styles.paddingTop] }>数量:{ amount }碱基</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  title: {
    fontSize: 16,
    color: '#666'
  },
  titlelk :{
    fontSize: 16,
    color: '#444',
  },
  disi: {
   flexDirection: 'row',
   justifyContent: 'space-between'
  },
  line: {
    height: platformDiff.isAndroid ? .3 : 1,
    backgroundColor: '#EFEFEF',
    marginTop: 15,
    marginBottom: 15
  },
  addres: {
    fontSize: 16,
    color: '#444'
  },
  paddingTop: {
    paddingTop: 8
  }
})