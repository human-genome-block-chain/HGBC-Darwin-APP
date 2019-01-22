import React, { Component } from 'react'

import {
  View,
  ViewPropTypes,
  StyleSheet,
  Text
} from 'react-native'

import { JumpList } from 'components/index'

export default class Operation extends Component {
  static propTypes = {
    style: ViewPropTypes.style
  }

  jumpFn (address) {
    this.props.navigation.navigate(address)
  }

  render () {
    return (
      <View>
        <View style={ styles.listBox }>
          <JumpList
            title="数据资产"
            triggerClick={ () => this.jumpFn('Assets') }
            rightText='我的健康数据'
          />
        </View>
        <View style={ [styles.container, this.props.style] }>
        
          <JumpList 
            title="问题反馈"
            triggerClick={ () => this.jumpFn('Feedback') }
          />
          <JumpList 
            title="加入社区"
            triggerClick={ () => this.jumpFn('JoinUs') }
          />
          <JumpList 
            title="认识星球"
            triggerClick={ () => this.jumpFn('Know') }
          />
          <JumpList 
            title="账户设置"
            triggerClick={ () => this.jumpFn('Settings') }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 25
  },
  listBox: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingLeft: 25
  }
})