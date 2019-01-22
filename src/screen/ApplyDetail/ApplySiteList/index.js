import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  StyleSheet,
  View
} from 'react-native'

import { getAppletInfo} from 'api/index' 

export default class ApplySiteList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      locs: []
    }

    this.appid = props.navigation.getParam('appid', 0)
  }

  componentDidMount () {
    this._getLocs()
  }

  async _getLocs () {
    try {
      const result = await getAppletInfo(this.appid)

      this.setState({
        locs: result.data.locs
      })
    } catch (e) {}
  }

  _mySiteList () {
    return this.state.locs.map((item, index) => (
      <Text style={ styles.list } key={ index }  data={ item }>{ item };</Text>
    ))
  }

 render () {
   return (
     <ScrollView style={ styles.content } showsVerticalScrollIndicator={ false }>
      <View style={ styles.listBox }>
        { this._mySiteList() }
      </View>
     </ScrollView>
   )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15
  },
  listBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 30
  },
  list: {
    fontSize: 16,
    color: '#666'
 }
})
