import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import {
  GradientButton,
  TextButton,
  HeaderLeft,
  AndroidWhiteBar
} from 'components/index'

import Addres from './Addres/index'
import { WithdraWal } from 'images/index.js'
import platformDiff from 'util/platformDiff'

import { etWalletAddress, deleteWalletAddress } from 'api/index'


export default class WalletAddres extends Component {
  constructor (props) {
    super(props)
    this.state = {
      total: [],
      commonlyWallet: {},
      remainWallet: [],
      isEmpty: true,
      isEdit: false,
      isEmptys: false,
      title: '设置'
    }
  }

  componentDidMount() {
    this._etWalletAddress()
  }

  async _etWalletAddress () {
    try {
      const result = await etWalletAddress()

      const afterProcessing = this._findMost([...result.data])

      this.setState({
         ...afterProcessing,
         isEmpty: result.data.length,
         isEmptys: !! result.data.length,
         total: [...result.data]
      })
    } catch (e) {}
  }

  _findMost (list) {
    let result = list.sort((item, item2) => item.useCount - item2.useCount < 0)

    return {
      commonlyWallet: result.shift(),
      remainWallet: result
    }
  }

  _addresItems () {
    return this.state.remainWallet.map((item, index) => (
      <Addres
        key={ index }
        data={ item }
        navigation={ this.props.navigation }
        style={ styles.addresList }
        isEdit={ this.state.isEdit }
        upData={ () => this.upData() }
        deleteCallback={ () => this.deleteItem(item) }
      />
    ))
  }

  async deleteItem (data) {
    try {
      await deleteWalletAddress(data.id)

      const newTotal = this.state.total.filter(item => item.id !== data.id)
      const result = this._findMost([...newTotal])

      this.setState({
        ...result,
        isEmpty: newTotal.length,
        isEmptys: !! newTotal.length,
        total: [...newTotal]
      })
    } catch (e) {}
  }

  upData () {
    this._etWalletAddress()
  }

  setUp () {
    const isEdit =  !this.state.isEdit

    this.setState({ isEdit, title: isEdit ? '完成' : '设置' })
  }

  render() {
    const { isEmpty, isEmptys, commonlyWallet, isEdit, title } = this.state

    return (
      <SafeAreaView style={ styles.container }>
        {
          isEmptys ?
          <View style={ styles.container }>
            <View style={ styles.routerBox }>
              <HeaderLeft
                buttonStyle={ styles.routerBack }
                triggerBack={ () => this.props.navigation.goBack() }
              />
              <Text style={ styles.routerTitle } >钱包地址</Text>
              <TextButton
                style={ styles.routerBreak } 
                textStyle={ styles.routerBreakText }
                triggerClick={ () => this.setUp() }
              >{ title }</TextButton> 
            </View>
            <AndroidWhiteBar />
            <ScrollView
              style={ styles.main }
              showsVerticalScrollIndicator={ false }
            >
              {
                isEmptys ?
                <View>
                  <View>
                    <Text style={ styles.changyong }>常用地址</Text>
                    <Addres
                      data={ commonlyWallet }
                      navigation={ this.props.navigation }
                      isEdit={ isEdit }
                      upData={ () => this.upData() }
                      deleteCallback={ () => this.deleteItem(commonlyWallet) }
                    />
                  </View>
                  {
                    isEmpty > 1 ? 
                    <View>
                      <Text style={ styles.changyongs }>其他地址</Text>
                      { this._addresItems() }
                    </View> : null
                  }
                </View> :
                <View style={ styles.imgBOx }>
                  <Image 
                    style={ styles.noDataBox }
                    source={ WithdraWal.NoAddress }
                  />
                  <Text style={ styles.noData }>暂无提现钱包地址～</Text>
                </View>
              }
            </ScrollView>
            <View style={ styles.buttonBox }>
              <GradientButton
                style={ styles.next }
                title="新增钱包地址"
                triggerClick={ () => this.props.navigation.navigate('AddressThe', { 
                  callback: () => this.upData(), 
                  type: '新增钱包地址'
                }) }
              ></GradientButton>
            </View>
          </View> : 
          <View style={ styles.container }>
            <View style={ styles.routerBox }>
              <HeaderLeft
                buttonStyle={ styles.routerBack }
                triggerBack={ () => this.props.navigation.goBack() }
              />
              <Text style={ styles.routerTitle } >钱包地址</Text>
              <TextButton
                style={ styles.routerBreak } 
                textStyle={ styles.routerBreakText }
                triggerClick={ () => {} }
              > </TextButton> 
            </View>
            <View style={ styles.imgBOx }>
              <Image 
                source={ WithdraWal.NoAddress }
              />
              <Text style={ styles.noData }>暂无提现钱包地址～</Text>

              <View style={ styles.buttonBox }>
                <GradientButton
                  style={ styles.next }
                  title="新增钱包地址"
                  triggerClick={ () => this.props.navigation.navigate('AddressThe', { 
                    callback: () => this.upData(), 
                    type: '新增钱包地址'
                  }) }
                ></GradientButton>
              </View>
            </View>
          </View>
         
        }
        
      </SafeAreaView> 
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerRight: {
    width: 20,
    flex: 1
  },
  main: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: '#F9FAFC'
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    paddingLeft: 6
  },
  routerBreaks: {
    width: 70,
    height: 44
  },
  routerBreakText: {
    lineHeight:44,
    fontSize: 14
  },
  buttonBox: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  next: {
    height: 66,
    width: 300
  },
  changyong :{
    fontSize: 26,
    color:'#000',
    fontWeight:'600',
    paddingLeft: 8
  },
  changyongs :{
    fontSize: 26,
    color:'#000',
    fontWeight:'600',
    marginTop:16,
    paddingLeft: 8
  },
  addresList: {
    marginBottom: 16
  },
  routerBox: {
    height: 44,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...ifIphoneX({
      marginTop: 44,
    },{
      marginTop: platformDiff.isAndroid ? 0 : 20
    })
  },
  routerBack: {
    width: 56,
    position: 'absolute',
    top: 0,
    left: 0,
    height: 44,
    zIndex: 9999
  },
  routerTitle: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 44,
    color: '#333',
    fontSize: 17,
    fontWeight: '400'
  },
  routerBreak: {
    width: 50,
    position: 'absolute',
    right: 0,
    top: 0,
    height: 44,
    zIndex: 999
  },
  routerBreakText: {
    lineHeight: 44,
    textAlign: 'right',
    color: '#40B1FF',
    fontWeight: '600'
  },
  imgBOx: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noData: {
    color: '#8B98A1',
    fontSize: 17,
    marginTop: 23,
    marginBottom: 45
  }
})