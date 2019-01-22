import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import { setToastMsg } from 'actions/index'
import { Linking } from 'react-native'

import { GradientButton, TaskSuccessButton } from 'components/index'

import { TaskImg } from 'images/index'

import { getSampleInfo, getLinkTokenAuth, dataSignState } from 'api/index'

class RegistrationRight extends Component {
  constructor (props) {
    super(props)

    this.state= {
      onchain: '',
      signState: 3,
      url: '',
      error_code: ''
    }

    this.timer = null

    this.scode = props.navigation.getParam('scode')
    this.samtype = props.navigation.getParam('samtype')
  }

  componentDidMount() {
    this._getSampleInfo()
  }

  async _getSampleInfo () {
    try {
      const result = await getSampleInfo({scode: this.scode, samtype: this.samtype})
      this.setState({
        onchain: result.data.onchain
      })
    } catch (e) {}
  }

  async _dataSignState() {
    try {
      if (this.state.signState !== 3) {
        clearInterval(this.timer)
      } else {
        const result = await dataSignState({scode: this.scode, samtype: this.samtype})
        this.setState({
          signState: result.data
        })
      }
    } catch (err) {
      this.props.setToastMsg(err)
    }
  }

  async _goMadeBy () {
    try {
      const result = await getLinkTokenAuth({scode: this.scode, samtype: this.samtype})

      Linking.canOpenURL(result.data).then(supported => {
        if (!supported) {
          this.props.setToastMsg('请先安装链克口袋app')
        } else {
          this.timer = setInterval(() => {
            this._dataSignState()
          }, 3000)
          return Linking.openURL(result.data)
        }
      })

    } catch (e) {}
  }

  render () {
    return (
      <ScrollView style={ styles.main } showsVerticalScrollIndicator={ false }>
        { this.state.onchain === '' && this.state.signState === 3 ?
          <View>
            <Text style={ styles.title }>什么是上链确权？</Text>
            <Text style={ styles.text }>数据上链确权是指将用户在达尔文星球内的生命健康数据使用用户的链克口袋进行签名并以加密的形式存储于迅雷文件系统（TCFS）中。对于已确权的数据，只有用户签名授权后,第三方才可通过智能合约对授权数据进行访问，以保障用户对自己数据的所有权和控制权。</Text>
            <Text style={ styles.title }>上链确权注意事项？</Text>
            <Text style={ styles.message }>1. 确权开始前，请确保已安装链克口袋，创建好钱包账户</Text>
            <Text style={ styles.message }>2. 所有类型健康数据的确权均需使用同一钱包授权</Text>
            <Text style={ styles.message }>3. 确权完成后，确权授权信息不可撤销，更改，替换</Text>
            <Text style={ styles.message }>4. 达尔文星球不会保存钱包秘钥，请保存好授权钱包</Text>
            <View style={ styles.gradientBox }>
              <GradientButton
                style={ styles.gradientButton }
                title="开始"
                triggerClick={ ()=> this._goMadeBy() }
              /> 
            </View>
          </View> : this.state.signState === 1 ||  this.state.onchain !== '' ?

          <View style={ styles.successBox }>
            <Image
              style={ styles.successImage }
              source={ TaskImg.Success }
              resizeMode="cover"
            />
            <Text style={ styles.successText }>上链确权成功</Text>
            <TaskSuccessButton title="完成"/>
          </View> :

          <View style={ styles.errBox }>
            <Image
              style={ styles.errImage }
              source={ TaskImg.Err }
              resizeMode="cover"
            />
            <Text style={ styles.errTitle }>上链确权未成功</Text>
            <Text style={ styles.errText }>确权未成功的可能是授权取消或者其他原因导</Text>
            <TaskSuccessButton title="知道了"/>
          </View>
        }
      </ScrollView>
    )
  }
}

export default connect(null, dispatch => ({
  setToastMsg: msg => dispatch(setToastMsg(msg))
}))(RegistrationRight)

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 30,
    paddingTop: 30,
    paddingRight: 30
  },
  title: {
    color: '#40B1FF',
    fontSize: 18,
    marginBottom: 10
  },
  text: {
    color: '#4A4A4A',
    fontSize: 13,
    lineHeight: 23,
    marginBottom: 20,
    textAlign: 'justify'
  },
  message: {
    color: '#4A4A4A',
    fontSize: 13,
    lineHeight: 28
  },
  gradientBox: {
    alignItems: 'center',
    marginTop: 40
  },
  gradientButton: {
    width: 300,
    height: 60
  },
  successBox: {
    alignItems: 'center',
    marginTop: 60
  },
  successImage: {
    marginBottom: 60
  },
  successText: {
    fontSize: 18,
    marginBottom: 50
  },
  errBox: {
    alignItems: 'center',
    marginTop: 60
  },
  errImage: {
    marginBottom: 60
  },
  errTitle: {
    fontSize: 18,
    marginBottom: 20
  },
  errText: {
    fontSize: 11,
    marginBottom: 20
  }
})