import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native'

import { AndroidWhiteBar } from 'components/index'

import Progress from './Progress/index'

export default class DealDetailsdls extends Component {
  _getState (state) {
    switch (state) {
      case 0:
        return 'unfinished'
      case 1:
        return 'ongoing'
      case 2:
        return 'complete'
      case 3: 
        return 'error'
      default:
        return 'unfinished'
    }
  }

  render () {
    const { walletaddress, id, status, tradeid } = this.props.navigation.getParam('data', {})

    return (
      <ScrollView 
        style={ styles.container }
        showsVerticalScrollIndicator={ false }
      >
        <AndroidWhiteBar />
        <View style={ styles.main }>
          <Progress
            progress={ this._getState(2) }
            title="发起提现申请"
          >
            <Text style={ styles.addressTitle }>单号：{ id }</Text>
            <Text style={ [styles.addressTitle, styles.noMargin] }>提现地址：</Text>
            <Text style={ styles.address }>{ walletaddress }</Text>
          </Progress>
          <Progress
            progress={ this._getState(status >= 2 ? 2 : 1) }
            title="提现等待中"
            size={ status === 3 ? 50 : 90 }
          >
            <Text>预计两小时内到账</Text>
          </Progress>
          {
            status === 3 ?
            <Progress
              progress={ this._getState(3) }
              title="提现失败，请重新再申请"
              size={ 50 }
            />: null
          }
          <Progress
            progress={ this._getState(status === 2 ? 2: 0) }
            title="提现到账"
            isLine={ false }
          >
            <Text style={ [styles.addressTitle, styles.noMargin] }>交易id：</Text>
            <Text style={ styles.address }>{ tradeid }</Text>
          </Progress>
        </View>
      </ScrollView>
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
  },


  addressTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22
  },
  address: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22
  },
  noMargin: {
    marginBottom: 0
  }
})