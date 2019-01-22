import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { BackgroundPicture } from 'components/index'
import { IntegralImg } from 'images/index'

class Operation extends Component {
  render () {
    return (
      <View style={ styles.container }>
        <BackgroundPicture
          style={ styles.backgroundBox}
          source={ IntegralImg.Operation }
        >
          <TouchableOpacity
            onPress={ () => this.props.navigation.navigate('PaymentDetails', { title: '收支明细', type: 1 }) }
            style={ styles.button }
            activeOpacity={ .9 }
          >
            <Image 
              style={ styles.detailImage }
              source={ IntegralImg.Detail }
              resizeMode="cover"
            />
            <Text style={ styles.buttonText }>
              收支明细
            </Text>
          </TouchableOpacity>
          <View style={ styles.assetsBox }>
            <Text style={ styles.assetsTitle }>总数字资产</Text>
            <View  style={ styles.assetsNumberBox }>
              <Text style={ styles.assetsNumber }>{ this.props.token_count.toFixed(4) }</Text>
              <Text style={ styles.assetsHgbc }>碱基</Text>
            </View>
          </View>
            <TouchableOpacity
              onPress={ () => this.props.withdrawal() }
              style={ styles.buttonBottom }
              activeOpacity={ .9 }
            >
              <Image
                style={ styles.walletImage }
                source={ IntegralImg.Wallet }
                resizeMode="cover"
              />
              <Text style={ [styles.buttonText, styles.buttonTextBottom] }>提现到链克口袋</Text>
            </TouchableOpacity>
          
          <View style={ styles.buttonBottom } />
        </BackgroundPicture>
      </View>
    )
  }
}

export default connect(state => ({ ...state.home }))(Operation)

const styles = StyleSheet.create({
  container: {
    height: 218,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundBox: {
    width: 343,
    height: 218,
    paddingTop: 20,
    paddingLeft: 38,
    paddingRight: 38,
    paddingBottom: 30,
    justifyContent:'space-around'
  },
  button: {
    width: 86,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 4
  },
  detailImage: {
    width: 14,
    height: 15
  },
  assetsBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  assetsTitle: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  assetsNumberBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  assetsNumber: {
    fontSize: 24,
    color: '#fff'
  },
  assetsHgbc: {
    fontSize: 21,
    color: '#fff',
    marginLeft: 8
  },
  buttonBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextBottom: {
    fontSize: 16
  },
  walletImage: {
    width: 15,
    height: 14
  }
})