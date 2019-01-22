import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native'

import { TextButton, JumpList } from 'components/index'

import { getSampleInfo } from 'api/index'

export default class WGSInfoDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TextButton
        style={ styles.routerBreaks }
        textStyle={ styles.routerBreakText }
        activeOpacity={ .8 }
        location="center"
        triggerClick={ () => navigation.navigate('WGSIncluded') }
      >查看收录进展</TextButton>
    )
  })

  constructor () {
    super()

    this.state = {
      list: {}
    }
  }

  componentDidMount () {
    this._getSampleInfo()
  }

  async _getSampleInfo () {
    try {
      const result = await getSampleInfo({samtype: 'WGS'})

      this.setState({
        list: result.data
      })
    } catch (e) {}
  }

  render () {
    const {list} = this.state

    return (
      <ScrollView style={ styles.main } showsVerticalScrollIndicator={ false }>
        <View style={ styles.JumpListBox }>
          <JumpList 
            style={ styles.content }
            title="数据编号"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.scode }</Text>
          </JumpList>
          <JumpList 
            style={ styles.content }
            title="数据大小"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.datasize }</Text>
          </JumpList>
        </View>

        <View style={ styles.JumpListBox }>
          <JumpList 
            style={ styles.content }
            title="数据产出平台"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.sequenator }</Text>
          </JumpList>
          <JumpList 
            style={ styles.content }
            title="覆盖基因组信息"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.coverage }</Text>
          </JumpList>
        </View>

        <View style={ styles.JumpListBox }>
          <JumpList 
            style={ styles.content }
            title="科研认可度"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.degree }</Text>
          </JumpList>
        </View>

        <View style={ styles.JumpListBox }>
          <JumpList 
            style={ styles.content }
            title="上链确权"
            isArrow={ false }
          >
            <Text style={ styles.rightText }>{ list.onchain === '' ? '未确权' : '已确权' }</Text>
          </JumpList>
          { list.onchain !== '' ?
            <View style={ styles.bottomTextBox }>
              <Text style={ styles.bottomText }>数据签名</Text>
              <Text style={ styles.bottomText }>{ list.onchain }</Text>
            </View> :

            <View></View>
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  headerRight: {
    width: 20,
    flex: 1
  },
  routerBreaks: {
    width: 100,
    height: 44
  },
  routerBreakText: {
    lineHeight: 44,
    fontSize: 14,
    color: '#000'
  },
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
  },
  bottomTextBox: {
    backgroundColor: '#fff',
    marginTop: 15
  },
  bottomText: {
    fontSize: 12,
    color: '#9F9EB8',
    marginBottom: 10,
    marginRight: 20
  }
})