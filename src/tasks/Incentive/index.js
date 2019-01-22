import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'

export default class Incentive extends Component{
  
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#F5F6F7', 
      borderBottomWidth: 0,
      height: 44,
      elevation: 0
    }
  })

  constructor (props) {
    super(props)
    this.flexArr = [1, 1, 1, 1]
    this.state = {
      tableHead: ['基因组计划', '参与人数', '人均奖励', '总额度'],
      plans: [
        ['百人计划', '100', '100,000', '一千万'],
        ['千人计划', '1000', '30,000', '三千万'],
        ['万人计划', '10,000', '6,000', '六千万'],
        ['十万人计划', '100,000', '1,000', '一亿'],
        ['百万人计划', '1,000,000', '100', '一亿']
      ]
    }
  }

  render () {
    const { tableHead, plans } = this.state

    return (
      <ScrollView 
        style={ styles.container }
        showsVerticalScrollIndicator={ false }
      >
        <View style={ styles.tableBox }>
          <Table borderStyle={ { borderWidth: 0 } }>
            <Row
              data={ tableHead }
              style={ styles.head }
              textStyle={ styles.headerText }
              flexArr={ this.flexArr }
            />
            <Rows
              data={ plans }
              style={ styles.tableRows }
              textStyle={ styles.text }
              flexArr={ this.flexArr }
            />
          </Table>
        </View>
        <Text style={ styles.attention }>注：此奖励计划适用于通过HGBC官方渠道购买全基因组数据采集套件从而拥有全基因组数据的人(奖励单位为碱基）</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 33,
    paddingBottom: 54,
    backgroundColor: '#F5F6F7',
    paddingLeft: 20,
    paddingRight: 20
  },
  titleBox: {
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600'
  },
  instructions: {
    fontSize: 13,
    color: '#5D6063',
    marginTop: 4,
    marginBottom: 8
  },
  tableBox: {
    flex: 1,
    paddingTop: 3,
    // backgroundColor: '#fff',
    // borderRadius: 12,
    paddingBottom: 12
  },
  table: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  listView: {
    flex: 1
  },
  head: {
    height: 53,
  },
  tableRows: {
    height: 76,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 15,
    color: '#191919',
    textAlign: 'center',
    fontWeight: '600'
  },
  text: {
    textAlign: 'center',
    marginBottom: 14,
    fontSize: 13,
    color: '#474B5C'
  },
  attention: {
    fontSize: 13,
    color: '#9B9B9B',
    paddingLeft: 11,
    paddingRight: 11,
    lineHeight: 24,
    marginTop: 22
  }
})