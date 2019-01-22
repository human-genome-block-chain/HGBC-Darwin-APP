import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { getMessageNotification, addMessageRecord } from 'api/index'

import { RightArrow } from 'components/index'
import HeaderRight from './HeaderRight/index'

import moment from 'moment'

export default class Message extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <HeaderRight 
        triggerClick={ () => navigation.state.params.navigatePress() }
      />
    )
  })

  constructor (props) {
    super(props)
    this.state = {
      messageList: []
    }
  }

  componentDidMount () {
    this._getMessageNotification()

    this.props.navigation.setParams({
        title: 'read',
        navigatePress: this._addMessageRecord.bind(this)
    })
  }

  async _getMessageNotification () {
    try {
      const result = await getMessageNotification()

      this.setState({
        messageList: result.data
      })
    } catch (e) {}
  }

  async _addMessageRecord () {
    try {

      await addMessageRecord(0)

      const messageList = this._localSelection()

      this.setState({
        messageList
      })
      
    } catch (e) {}
  }

  _localSelection () {
    return this.state.messageList.filter( item => {
      item.readtime = moment((new Date()).getTime()).format("YYYY-MM-DD HH:mm:ss")

      return true
    })
  }

  // 定义一个回调函数
  refreshList ({ nid }) {
    const messageList = this.state.messageList.filter( item => {
      if (item.nid === nid) {
        item.readtime = moment((new Date()).getTime()).format("YYYY-MM-DD HH:mm:ss")
      }

      return true
    })

    this.setState({
      messageList
    })
  }

  _myList () {
    return this.state.messageList.map(item => (
      <View key={ item.nid } >
        <Text style={ styles.time }>{ moment(item.createtime).format("YYYY-MM-DD HH:mm:ss") }</Text>
        <TouchableOpacity
          activeOpacity={ .9 }
          style={ styles.box }
          onPress={ () => this.props.navigation.navigate('MessageDetail', { nid: item.nid, title: item.title, content: item.content, callback: this.refreshList.bind(this, item) }) }>
          <Text style={ item.readtime === undefined ? styles.title : styles.titleRead }>{ item.title }</Text>
          <Text style={ item.readtime === undefined ? styles.content : styles.contentRead }>{ item.content.substr(0, 10) }......</Text>
          <RightArrow style={ styles.arrow }></RightArrow> 
        </TouchableOpacity>
      </View>
    ))
  }

  render () {
    return (
      <View style={ styles.noDataBox }>
        {
          this.state.messageList.length === 0

          ? <Text style={ styles.noData }>^_^ 暂时没有系统消息</Text>

          : <ScrollView showsVerticalScrollIndicator={ false }>{ this._myList() }</ScrollView>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  noDataBox: {
    flex: 1,
    backgroundColor: '#F9FAFC'
  },
  noData: {
    color: '#474B5C',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40
  },
  time: {
    textAlign: 'center',
    fontSize: 13,
    color: '#6E707A',
    marginTop: 25
  },
  box: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20
  },
  title: {
    fontSize: 18,
    color: '#222222',
    marginBottom: 10
  },
  titleRead: {
    fontSize: 18,
    color: '#777777',
    marginBottom: 10
  },
  content: {
    fontSize: 14,
    color: '#474B5C'
  },
  contentRead: {
    fontSize: 14,
    color: '#777777'
  },
  arrow: {
    position: 'absolute',
    right: 25,
    bottom: 30
  }
})