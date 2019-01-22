import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native'

import { addMessageRecord } from 'api/index'

export default class MessageDetail extends Component {
  constructor (props) {
    super(props)
    
    this.nid = props.navigation.getParam('nid', 0)
    this.title = props.navigation.getParam('title', '')
    this.content = props.navigation.getParam('content', '')

    this.callback = props.navigation.getParam('callback', () => {})
  }

  componentDidMount () {
    this.callback()
    this._addMessageRecord()
  }

  async _addMessageRecord () {
    try {
      await addMessageRecord(this.nid)
    } catch (e) {}
  }

  render () {
    return (
      <ScrollView style={ styles.box } showsVerticalScrollIndicator={ false }>
       <View style={ styles.titleBox }>
        <Text style={ styles.title }>{ this.title }</Text>
       </View>
       <View style={ styles.contentBox }>
        <Text style={ styles.content }>{ this.content }</Text>
       </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  titleBox: {
    padding: 10,
    marginBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 20,
    color: '#323232'
  },
  contentBox: {
    padding: 10
  },
  content: {
    fontSize: 15,
    color: '#4A4A4A'
  },
})