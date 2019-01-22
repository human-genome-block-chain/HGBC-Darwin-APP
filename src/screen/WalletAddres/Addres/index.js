import React, { Component } from 'react'
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import platformDiff from 'util/platformDiff'
import { WithdraWal } from 'images/index.js'

import Options from './Options/index'

export default class Addres extends Component{
  constructor (props) {
    super(props)

    this.isGoBack = !!props.navigation.state.params.isGoBack
  }

  choose () {
    const { navigation, data } = this.props

    if (this.isGoBack) {
      navigation.state.params.callback(data)
      navigation.goBack()
    }
  }

  render () {
    const { walletname, walletaddress } = this.props.data

    return (
      <TouchableOpacity
        style={ [ styles.container, this.props.style ] }
        activeOpacity={ this.isGoBack ? .8 : 1 }
        onPress={ (e) => this.choose() }
      > 
        <Text style={ styles.title }>{ walletname }</Text>
        <View style={ styles.line }/>
        <Text style={ styles.addres }>{ walletaddress }</Text>
        {
          this.props.isEdit ? 
          <View>
            <View style={ styles.lines }/>
            <View style={ styles.delete }>
              <Options
                title="编辑"
                source={ WithdraWal.EditAddress }
                triggerClick={ () => this.props.navigation.navigate('AddressThe', { 
                  callback: () => this.props.upData(), 
                  type: '修改钱包地址',
                  isEdit: true,
                  data: this.props.data
                }) }
              />
              <Options
                style={ styles.margin }
                title="删除"
                source={ WithdraWal.DeleteAddres}
                triggerClick={ () => {
                  Alert.alert(
                    '删除地址',
                    '确认删除地址吗？',
                    [
                      {text: '确定', onPress: () => this.props.deleteCallback()},
                      {text: '取消', style: 'cancel'},
                    ],
                    { cancelable: false }
                  )
                } }
              />
            </View>
          </View> : null
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 14
  },
  title: {
    fontSize: 18,
    color: '#444',
    fontWeight: '600'
  },
  line: {
    height: platformDiff.isAndroid ? .3 : 1,
    backgroundColor: '#EFEFEF',
    marginTop: 14,
    marginBottom: 16
  },
  lines :{
    height: platformDiff.isAndroid ? .3 : 1,
    backgroundColor: '#EFEFEF',
    marginTop: 18,
    marginBottom: 16
  },
  addres: {
    fontSize: 14,
    color: '#9496A0',
    lineHeight: 24
  },
  delete :{
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 8,
    justifyContent: 'flex-end'
  },
  margin :{
    marginLeft: 20
  }
})