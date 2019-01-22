import React, { Component } from 'react'
import { View, Linking, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { GradientButton, TextButton } from 'components/index'

import { setToastMsg } from 'actions/index'

class Footers extends Component{
  static defaultProps = {
    isWgs: false,
    next: () => {}
  }

  static propTypes = {
    isWgs: PropTypes.bool,
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
    Linking.openURL('https://item.jd.com/27693892128.html')
  }

  render () {
    const { isWgs, navigation } = this.props

    return (
      isWgs ? <View style={ styles.buttonBox }>
        <GradientButton
          style={ styles.button }
          title="马上绑定"
          triggerClick={ () => navigation.navigate('Scanning', { 
            callback: this.qrCodeVerification.bind(this), 
            type: 'wgs'
          }) }
        />
        <TextButton
          textStyle={ styles.conbter }
          location="center"
          triggerClick={ () => this.linking() }
        >
          JD抢购全基因组数据采集套件
        </TextButton>
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
    height: 100,
    paddingLeft: 38,
    paddingRight: 38,
    bottom: 30
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