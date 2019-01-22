import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet
} from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'

export default class Ranking extends Component{
  constructor (props) {
    super(props)
    this.flexArr = [1, 3, 1, 2]
    this.state = {
      tableHead: ['名次', '账户', '算力', '24h 收益'],
    }
  }

  render () {
    const { kings } = this.props

    return (
      <View style={ styles.container } >
        <View style={ styles.titleBox }>
          <Text style={ styles.title }>挖矿算力排行</Text>
          <Text style={ styles.instructions }>2h 统计一次</Text>
        </View>
        <View style={ styles.tableBox }>
          <Table borderStyle={ { borderWidth: 0 } }>
            <Row
              data={ this.state.tableHead }
              style={ styles.head }
              textStyle={ styles.headerText }
              flexArr={ this.flexArr }
            />
            <Rows
              data={ kings }
              style={ styles.tableRows }
              textStyle={ styles.text }
              flexArr={ this.flexArr }
            />
          </Table>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 33,
    paddingBottom: 54
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
    backgroundColor: '#fff',
    borderRadius: 12,
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
    height: 70
  },
  tableRows: {
    
  },
  headerText: {
    fontSize: 17,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: 'blue'
  },
  text: {
    textAlign: 'center',
    marginBottom: 14
  }
})