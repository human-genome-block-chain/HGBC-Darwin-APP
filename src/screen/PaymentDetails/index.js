import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform
} from 'react-native'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'

import { RenderRow } from 'components/index'

import { getTokenLog, getPowerLog } from 'api/index'

export default class PaymentDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', '收支详情')
  })

  constructor(props) {
    super(props)

    this.state = {
      dataList: [],
      refreshState: RefreshState.Idle
    }

    this.lastId = 0
  }

  async _getData (isRefresh) {
    this.type = this.props.navigation.getParam('type', 1)

    const getData = this.type === 1 ? getTokenLog : getPowerLog

    let result = []

    try {
      result = await getData({
        id: isRefresh ? 0 : this.lastId,
        isAll: false
      })

      dataList = isRefresh ? [...result.data] : [...this.state.dataList, ...result.data]
      this.lastId = result.data.length > 0 ? [...result.data].pop().id : 0

    } catch (e) {}

    this.setState({
      dataList: dataList,
      refreshState: result.data.length < 1 ? RefreshState.NoMoreData : RefreshState.Idle,
      isEmpty: !!dataList.length
    })
  }

  componentDidMount() {
    this.onFooterRefresh()
  }

  async onHeaderRefresh () {
    this.setState({ refreshState: RefreshState.HeaderRefreshing })
    this._getData(true)
  }


  async onFooterRefresh () {
    this.setState({ refreshState: RefreshState.FooterRefreshing })
    this._getData(false)
  }

  keyExtractor (item, index) {
    return index.toString()
  }

  renderCell (rowData) {
    return <RenderRow key={ rowData.item.id } rowData={ rowData.item } />
  }

  render () {
    return (
    <SafeAreaView style={ styles.container}>
        {
          this.state.isEmpty ? 
          <RefreshListView
            data={this.state.dataList}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCell}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh.bind(this)}
            onFooterRefresh={this.onFooterRefresh.bind(this)}
            footerRefreshingText='玩命加载中...'
            footerFailureText='网络失败，请稍后再试'
            footerNoMoreDataText='-- 我是有底线的 --'
          /> : 
          <View style={ styles.noDataBox }>
            <Text style={ styles.noData }>^_^ 暂时没有任何数据</Text>
          </View>
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC'
  },
  list: {
    paddingTop: 10
  },
  noDataBox: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    alignItems: 'center'
  },
  noData: {
    color: '#474B5C',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40
  }
})
