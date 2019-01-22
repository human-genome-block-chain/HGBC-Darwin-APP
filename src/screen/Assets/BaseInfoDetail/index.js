import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native'

import { JumpList } from 'components/index'

import { getBaseInfoAssets } from 'api/index'

export default class BaseInfoDetail extends Component {
  constructor () {
    super()

    this.state = {
      list: {}
    }
  }

  componentDidMount () {
    this._getBaseInfoAssets()
  }

  async _getBaseInfoAssets () {
    try {
      const result = await getBaseInfoAssets()

      this.setState({
        list: result.data
      })
    } catch (e) {}
  }

  render () {
    const { list } = this.state
    return (
      <ScrollView style={ styles.main } showsVerticalScrollIndicator={ false }>
        <View style={ styles.JumpListBox }>
          <JumpList 
            style={ styles.content }
            title="性别"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.sex }</Text>
          </JumpList>
          <JumpList 
            style={ styles.content }
            title="出生日期"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.birthday }</Text>
          </JumpList>
        </View>

        <View style={ styles.JumpListBox }>
          <JumpList 
            style={ styles.content }
            title="出生地"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.race }</Text>
          </JumpList>
          <JumpList 
            style={ styles.content }
            title="民族"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.nation }</Text>
          </JumpList>
           <JumpList 
            style={ styles.content }
            title="常住地"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.residence }</Text>
          </JumpList>
        </View>

        <View style={ styles.JumpListBox }>
          <JumpList 
            style={ styles.content }
            title="血型"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.blood }</Text>
          </JumpList>
          <JumpList 
            style={ styles.content }
            title="过敏原"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.allergy }</Text>
          </JumpList>
        </View>

        <View style={ styles.JumpListBox }>
          <JumpList 
            style={ styles.content }
            title="吸烟史"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.smoke }</Text>
          </JumpList>
          <JumpList 
            style={ styles.content }
            title="饮酒频率"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.drink }</Text>
          </JumpList>
           <JumpList 
            style={ styles.content }
            title="每日睡眠"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.sleep }</Text>
          </JumpList>
        </View>

        <View style={ styles.JumpListBox }>
          <JumpList 
            style={ styles.content }
            title="家族常见病"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.familydisease }</Text>
          </JumpList>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F9FAFC'
  },
  JumpListBox: {
    backgroundColor: '#fff',
    paddingLeft: 25,
    marginTop: 20
  },
  content: {
    flexDirection: 'row'
  },
  rightText: {
    flex: 1,
    lineHeight: 44,
    textAlign: 'right',
    paddingRight: 25
  }
})