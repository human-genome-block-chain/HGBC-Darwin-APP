import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native'

import { AndroidWhiteBar } from 'components/index'

import Progress from './Progress/index'

import { getSampleStatus } from 'api/index'

export default class WESIncluded extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isData: false,
      data: {}
    }
  }

  componentDidMount () {
    this._getSampleStatus()
  }

  async _getSampleStatus () {
    try {
      const result = await getSampleStatus({samtype: 'WES'})

      this.setState({ 
        isData: result.data === '' ? false: true,
        data: result.data
      })
    } catch (e) {}
  }

  _getState (state) {
    switch (state) {
      case 0:
        return 'unfinished'
      case 1:
        return 'ongoing'
      case 2:
        return 'complete'
      default:
        return 'unfinished'
    }
  }

  render () {
    return (
      this.state.isData ?
      <ScrollView 
        style={ styles.container }
        showsVerticalScrollIndicator={ false }
      >
        <AndroidWhiteBar />
        <Text style={ styles.title }>基因组数据</Text>
        <View style={ styles.main }>
          <Progress 
            progress={ this._getState(this.state.data.bind.state) }
            title="绑定数据编码及生态奖励发放"
            info="奖励包括碱基奖励和算力奖励"
            time={this.state.data.bind.time}
          />
          <Progress 
            progress={ this._getState(this.state.data.back.state) }
            title="取样"
            info="从购买基因组数据采集套件开始到HGBC实验室收到唾液样本的过程称之为取样"
            time={this.state.data.back.time}
          />
          <Progress 
            progress={ this._getState(this.state.data.sequencing.state) }
            title="测序"
            info="唾液样本经过提取DNA、测序仪测序等基因信息数据化的过程称之为测序"
            time={this.state.data.sequencing.time}
          />
          <Progress 
            progress={ this._getState(this.state.data.analyze.state) }
            title="预分析"
            info="对从测序仪下线的基因数据进行分析，获得基因突变数据的过程称之为预分析"
            time={this.state.data.analyze.time}
          />
          <Progress 
            progress={ this._getState(this.state.data.onchain.state) }
            title="上链"
            info="将所有基因信息相关的数据分布式加密存储，并将数据指纹存储在链上的过程称之为数据上链"
            time={this.state.data.onchain.time}
            isLine={ false }
          />
        </View>
      </ScrollView>:
      <View style={ styles.noDataBox }>
        <Text style={ styles.noData }>^_^ 您还没有任何健康数据资产</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    marginTop: 39
  },
  main: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginTop: 14,
    padding: 30
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