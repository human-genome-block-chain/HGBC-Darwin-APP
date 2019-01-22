import React, { Component } from "react"
import {
  Image,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native'

import { AndroidWhiteBar } from 'components/index'

import Addres from './Addres/index'

import { getOrders } from 'api/index'
import { WithdraWal } from 'images/index'

export default class TheOrderDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      remainWallet: [],
      isEmptys:true
    }
  }
   
  componentDidMount() {
    this._etWalletAddress()
  }

  async _etWalletAddress () {
    try {
      const result = await getOrders()

      this.setState({ remainWallet: [...result.data], isEmptys: !!result.data.length })
    } catch (e) {}
  }

  _addresItems () {
    return this.state.remainWallet.map((item, index) => (
      <Addres
        key={ index }
        data={ item }
        navigation={ this.props.navigation }
        style={ styles.addresList }
      />
    ))
  }

  render() {
    return (
       <SafeAreaView style={ styles.container }>
        <AndroidWhiteBar />
        {
          this.state.isEmptys ?
          <ScrollView
            style={ styles.main }
            showsVerticalScrollIndicator={ false }
          > 
            
            { this._addresItems() }
            <View style={ styles.spacing }/>
          
          </ScrollView>:
          <View style={ styles.imgBOx }>
            <Image 
              style={ styles.noDataBox }
              source={ WithdraWal.NoOrders }
            />
            <Text style={ styles.noData }>没有订单～</Text>
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
  main: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    paddingLeft: 16,
    paddingRight: 16
  },
  spacing: {
    height: 16
  },
  addresList: {
    marginTop: 15
  },
  imgBOx: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noDataBox: {
    // flex: 1
  },
  noData: {
    color: '#8B98A1',
    fontSize: 17,
    marginTop: 23,
    marginBottom: 45
  }
})