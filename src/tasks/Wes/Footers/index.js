import React, { Component } from 'react'
import { View, Linking, StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setToastMsg } from 'actions/index'

class Footers extends Component{
  static defaultProps = {
    isWes: false,
    next: () => {}
  }

  static propTypes = {
    isWes: PropTypes.bool,
    next: PropTypes.func
  }

  qrCodeVerification (qrCode, err) {

    const { next, setToastMsg } = this.props

    if (!err) {
      next(qrCode, err)
    } else {
      setToastMsg('请扫描有效的二维码')
    }
  }

  linking () {
    Linking.openURL('https://item.jd.com/35607385380.html')
  }

  render () {
    const { isWes, navigation } = this.props

    return (
      isWes ? <View style={ styles.buttonBox }>
        <View style={ styles.main }>
          <TouchableOpacity 
            style={ styles.buttonJD }
            activeOpacity={ .8 }
            onPress={ () => this.linking() }
          >
            <Text style={ styles.titleJd }>京东购买</Text>
            <Text style={ styles.textJD }>采集套件限量抢购中</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ styles.buttonBD }
            activeOpacity={ .8 }
            onPress={ () => navigation.navigate('Scanning', { 
              callback: this.qrCodeVerification.bind(this), 
              type: 'wes'
            }) }
          >
            <Text style={ styles.titleBD }>扫码绑定</Text>
            <Text style={ styles.textBD }>唾液采集器</Text>
          </TouchableOpacity>
        </View>
      </View> : null
    )
  }
}

export default connect(null, dispatch => ({
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(Footers)

const styles = StyleSheet.create({
  buttonBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60,
    bottom: 30
  },
  main: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonJD: {
    width: 185,
    height: 60,
    alignItems: 'center',
    paddingTop: 10
  },
  buttonBD: {
    width: 190,
    height: 60,
    backgroundColor: '#31A6F3',
    alignItems: 'center',
    paddingTop: 10
  },
  titleJd: {
    fontSize: 18,
    color: '#31A6F3',
    marginBottom: 5
  },
  textJD: {
    fontSize: 13,
    color: '#31A6F3'
  },
  titleBD: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5
  },
  textBD: {
    fontSize: 13,
    color: '#fff'
  },
  button: {
    height: 60,
    marginBottom: 12
  },
  conter:{
    fontSize: 13,
    marginTop: 6
  },
  conbter:{
    fontSize: 16,
    color:'#40B1FF'
  }
})